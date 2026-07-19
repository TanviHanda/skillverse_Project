import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const communitySchema = z.object({
  name: z.string().min(2),
  type: z.enum(['DISCORD', 'GITHUB', 'REDDIT', 'TWITTER', 'YOUTUBE', 'BLOG', 'DOCUMENTATION']),
  url: z.string().url(),
  description: z.string().min(10),
  whySuitable: z.string().min(10),
  domains: z.array(z.string()).min(1),
  memberCount: z.number().int().nonnegative().optional()
});

const postSchema = z.object({ title: z.string().min(3), body: z.string().min(3) });

type CommunityWithRelations = Awaited<ReturnType<typeof prisma.community.findUnique>> & {
  members: { userId: string }[];
};

export const getCommunities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const profile = userId ? await prisma.profile.findUnique({ where: { userId } }) : null;

    const communities = await prisma.community.findMany({
      where: profile ? { domains: { hasSome: [profile.domain, ...profile.interests] } } : {},
      include: { 
        _count: { select: { posts: true, members: true } }, 
        members: userId ? { where: { userId }, select: { userId: true } } : false
      },
      orderBy: { memberCount: 'desc' }
    });
    
    res.json(communities.map(c => ({ 
      ...c, 
      joined: userId ? (c.members?.length ?? 0) > 0 : false,
      recommendationReason: c.whySuitable 
    })));
  } catch (e) { console.log("[getCommunities] Error:", e); next(e); }
};

export const createCommunity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    res.status(201).json(await prisma.community.create({ 
      data: { ...communitySchema.parse(req.body), createdById: req.user.id } 
    }));
  } catch (e) { console.log("[createCommunity] Error:", e); next(e); }
};

export const updateCommunity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    const communityId = req.params.id as string;
    const found = await prisma.community.findUnique({ where: { id: communityId } });
    if (!found || found.createdById !== req.user.id) return res.status(403).json({ message: 'Only the creator can edit' });
    res.json(await prisma.community.update({ where: { id: found.id }, data: communitySchema.parse(req.body) }));
  } catch (e) { console.log("[updateCommunity] Error:", e); next(e); }
};

export const deleteCommunity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    const communityId = req.params.id as string;
    const c = await prisma.community.findUnique({ where: { id: communityId } });
    if (!c || c.createdById !== req.user.id) return res.status(403).json({ message: 'Only the creator can delete' });
    await prisma.community.delete({ where: { id: c.id } });
    res.status(204).end();
  } catch (e) { console.log("[deleteCommunity] Error:", e); next(e); }
};

export const joinCommunity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    await prisma.communityMember.upsert({
      where: { userId_communityId: { userId: req.user.id, communityId: req.params.id as string } },
      create: { userId: req.user.id, communityId: req.params.id as string }, 
      update: {}
    });
    res.status(204).end();
  } catch (e) { console.log("[joinCommunity] Error:", e); next(e); }
};

export const leaveCommunity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    await prisma.communityMember.deleteMany({ 
      where: { userId: req.user.id, communityId: req.params.id as string } 
    });
    res.status(204).end();
  } catch (e) { console.log("[leaveCommunity] Error:", e); next(e); }
};

export const getCommunity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const communityId = req.params.id as string;
    const userId = req.user?.id;

    const community = await prisma.community.findUnique({
      where: { id: communityId },
      include: {
        _count: { select: { members: true, posts: true, messages: true } },
        posts: { take: 5, orderBy: { createdAt: 'desc' }, include: { author: { select: { name: true, avatarUrl: true } } } },
        messages: { take: 8, orderBy: { createdAt: 'desc' }, include: { sender: { select: { name: true, avatarUrl: true } } } },
        members: userId ? { where: { userId } } : false
      }
    }) as CommunityWithRelations | null;

    if (!community) return res.status(404).json({ message: 'Community not found' });
    res.json({ ...community, joined: userId ? (community.members?.length ?? 0) > 0 : false });
  } catch (e) { console.log("[getCommunity] Error:", e); next(e); }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await prisma.post.findMany({
      where: { communityId: req.params.id as string },
      include: { author: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' }
    }));
  } catch (e) { console.log("[getPosts] Error:", e); next(e); }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    const data = postSchema.parse(req.body);
    res.status(201).json(await prisma.post.create({ 
      data: { ...data, communityId: req.params.id as string, authorId: req.user.id } 
    }));
  } catch (e) { console.log("[createPost] Error:", e); next(e); }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    const postId = req.params.postId as string;
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.authorId !== req.user.id) return res.status(403).json({ message: 'Only author can edit' });
    res.json(await prisma.post.update({ where: { id: post.id }, data: postSchema.parse(req.body) }));
  } catch (e) { console.log("[updatePost] Error:", e); next(e); }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    const postId = req.params.postId as string;
    const p = await prisma.post.findUnique({ where: { id: postId } });
    if (!p || p.authorId !== req.user.id) return res.status(403).json({ message: 'Only author can delete' });
    await prisma.post.delete({ where: { id: p.id } });
    res.status(204).end();
  } catch (e) { console.log("[deletePost] Error:", e); next(e); }
};