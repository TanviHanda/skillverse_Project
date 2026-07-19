import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const profileSchema = z.object({
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  domain: z.string().min(2).optional(),
  goal: z.enum(['JOB', 'FREELANCING', 'COLLEGE', 'STARTUP', 'INTERVIEW_PREPARATION']).optional(),
  dailyMinutes: z.number().int().positive().optional(),
  language: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user!.id },
    });
    res.json(profile);
  } catch (e) {
    console.log("[getProfile] Error:", e);
    next(e);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = profileSchema.parse(req.body);
    const profile = await prisma.profile.upsert({
      where: { userId: req.user!.id },
      create: { userId: req.user!.id, ...validatedData },
      update: validatedData,
    });
    res.json(profile);
  } catch (e) {
    console.log("[updateProfile] Error:", e);
    next(e);
  }
};