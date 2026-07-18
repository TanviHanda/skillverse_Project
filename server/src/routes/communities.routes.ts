import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as controller from '../controllers/communities.controller.js';

const router = Router();
router.use(authenticate);

router.get('/', controller.getCommunities);
router.post('/', controller.createCommunity);
router.put('/:id', controller.updateCommunity);
router.delete('/:id', controller.deleteCommunity);
router.post('/:id/join', controller.joinCommunity);
router.delete('/:id/join', controller.leaveCommunity);
router.get('/:id', controller.getCommunity);
router.get('/:id/posts', controller.getPosts);
router.post('/:id/posts', controller.createPost);
router.put('/:id/posts/:postId', controller.updatePost);
router.delete('/:id/posts/:postId', controller.deletePost);

export default router;