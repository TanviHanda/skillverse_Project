import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as profileController from '../controllers/profile.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', profileController.getProfile);
router.put('/', profileController.updateProfile);

export default router;