import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as roadmapController from '../controllers/roadmap.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', roadmapController.getRoadmap);
router.patch('/tasks/:id/toggle', roadmapController.toggleTask);

export default router;