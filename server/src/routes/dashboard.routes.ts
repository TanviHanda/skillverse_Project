import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as dashboardController from '../controllers/dashboard.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', dashboardController.getDashboard);
router.post('/activity', dashboardController.createActivity);

export default router;