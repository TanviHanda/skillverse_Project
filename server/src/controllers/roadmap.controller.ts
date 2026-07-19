import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

export const getRoadmap = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roadmap = await prisma.roadmap.findUnique({
      where: { userId: req.user!.id },
      include: { 
        weeks: { 
          orderBy: { position: 'asc' }, 
          include: { tasks: { orderBy: { position: 'asc' } } } 
        } 
      }
    });
    res.json(roadmap);
  } catch (e) {
    console.log("[getRoadmap] Error:", e);
    next(e);
  }
};

export const toggleTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id as string;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { 
        week: { 
          include: { 
            roadmap: true 
          } 
        } 
      }
    });

    // We use a type assertion to help TypeScript understand the 'include' result
    const taskWithRelations = task as typeof task & { 
      week: { roadmap: { userId: string } } 
    };

    if (!taskWithRelations || taskWithRelations.week.roadmap.userId !== req.user!.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        completed: !taskWithRelations.completed,
        completedAt: !taskWithRelations.completed ? new Date() : null
      }
    });

    const all = await prisma.task.findMany({
      where: { week: { roadmapId: taskWithRelations.week.roadmapId } }
    });
    
    await prisma.roadmap.update({
      where: { id: taskWithRelations.week.roadmapId },
      data: {
        progress: Math.round((all.filter(t => t.completed).length / all.length) * 100)
      }
    });

    res.json(updated);
  } catch (e) {
    console.log("[toggleTask] Error:", e);
    next(e);
  }
};