import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user!.id }
    });
    
    const projects = await prisma.projectTemplate.findMany({
      where: profile ? { domain: profile.domain } : undefined,
      orderBy: { level: 'asc' }
    });
    
    res.json(projects);
  } catch (e) {
    next(e);
  }
};

export const getResources = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user!.id }
    });
    
    const resources = await prisma.resource.findMany({
      where: profile ? { domains: { has: profile.domain } } : undefined
    });
    
    res.json(resources);
  } catch (e) {
    next(e);
  }
};