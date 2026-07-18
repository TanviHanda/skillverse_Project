import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as socialController from '../controllers/social.controller.js';

const router = Router();
router.use(authenticate);

router.get('/communities/:id/messages', socialController.getCommunityMessages);
router.get('/communities/:id/posts', socialController.getCommunityPosts);
router.post('/posts/:id/like', socialController.toggleLike);
router.post('/posts/:id/comments', socialController.addComment);
router.get('/notifications', socialController.getNotifications);
router.patch('/notifications/read', socialController.markNotificationsRead);

export default router;