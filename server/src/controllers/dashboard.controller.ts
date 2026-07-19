import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { dashboardFor } from '../services/dashboard.service.js';

const activitySchema = z.object({
  minutes: z.number().int().positive(),
  type: z.string().optional()
});

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await dashboardFor(req.user!.id));
  } catch (e) {
    console.log("[getDashboard] Error:", e);
    next(e);
  }
};

export const createActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = activitySchema.parse(req.body);
    const activity = await prisma.activity.create({
      data: {
        userId: req.user!.id,
        ...data
      }
    });
    res.status(201).json(activity);
  } catch (e) {
    console.log("[createActivity] Error:", e);
    next(e);
  }
};