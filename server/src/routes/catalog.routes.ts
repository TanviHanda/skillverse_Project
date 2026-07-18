import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as catalogController from '../controllers/catalog.controller.js';

const router = Router();

router.use(authenticate);

router.get('/projects', catalogController.getProjects);
router.get('/resources', catalogController.getResources);

export default router;