import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const postInclude = {
  author: { select: { id: true, name: true, avatarUrl: true } },
  likes: { select: { userId: true } },
  comments: { 
    include: { author: { select: { id: true, name: true, avatarUrl: true } } }, 
    orderBy: { createdAt: 'asc' as const } 
  }
};

export const getCommunityMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const communityId = req.params.id as string; 
    const member = await prisma.communityMember.findUnique({
      where: { userId_communityId: { userId: req.user!.id, communityId } }
    });
    if (!member || member.status !== 'ACTIVE') return res.status(403).json({ message: 'Join this community to access its chat' });
    
    res.json(await prisma.chatMessage.findMany({
      where: { communityId },
      include: { sender: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: 'asc' },
      take: 100
    }));
  } catch (e) { next(e); }
};

export const getCommunityPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const communityId = req.params.id as string; 
    const posts = await prisma.post.findMany({
      where: { communityId }, 
      include: postInclude as any,
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts.map((p: any) => ({
      ...p,
      likedByMe: p.likes.some((l: any) => l.userId === req.user!.id),
      likeCount: p.likes.length
    })));
  } catch (e) { next(e); }
};

export const toggleLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id as string; 
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    const existing = await prisma.postLike.findUnique({
      where: { userId_postId: { userId: req.user!.id, postId: post.id } }
    });

    if (existing) {
      await prisma.postLike.delete({ where: { userId_postId: { userId: req.user!.id, postId: post.id } } });
      return res.status(204).end();
    }

    await prisma.postLike.create({ data: { userId: req.user!.id, postId: post.id } });
    if (post.authorId !== req.user!.id) {
      await prisma.notification.create({ 
        data: { recipientId: post.authorId, actorId: req.user!.id, type: 'POST_LIKE', text: 'liked your post' } 
      });
    }
    res.status(201).end();
  } catch (e) { next(e); }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = z.object({ body: z.string().min(1).max(1000) }).parse(req.body).body;
    const postId = req.params.id as string; // Cast to string
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    const comment = await prisma.comment.create({
      data: { postId: post.id, authorId: req.user!.id, body },
      include: { author: { select: { id: true, name: true, avatarUrl: true } } }
    });

    if (post.authorId !== req.user!.id) {
      await prisma.notification.create({ 
        data: { recipientId: post.authorId, actorId: req.user!.id, type: 'POST_COMMENT', text: 'commented on your post' } 
      });
    }
    res.json(comment);
  } catch (e) { next(e); }
};

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await prisma.notification.findMany({
      where: { recipientId: req.user!.id },
      include: { actor: { select: { name: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
      take: 30
    }));
  } catch (e) { next(e); }
};

export const markNotificationsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.notification.updateMany({
      where: { recipientId: req.user!.id, readAt: null },
      data: { readAt: new Date() }
    });
    res.status(204).end();
  } catch (e) { next(e); }
};