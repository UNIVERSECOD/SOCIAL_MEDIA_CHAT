import { Router } from 'express';
import { authorize } from '../middlewares/auth.mjs';
const router = Router();
import controller from '../controllers/friendship.mjs';

router.get('/', authorize(), controller.getAllFriends);

router.patch('/add/:receiverId', authorize(), controller.sendFriendRequest);

router.patch('/:requestId/accept', authorize(), controller.acceptFriendRequest)

router.get('/requests/', authorize(), controller.getFriendRequests);

router.patch('/:requestId/reject', authorize(), controller.rejectFriendRequest)

router.delete('/remove/:userId', authorize(), controller.removeFromFriend);

router.delete('/:userId/retract', authorize(), controller.retractRequest);

export default router;
