import { Router } from 'express'
import commentController from "../controllers/comment.mjs"
import { authorize } from "../middlewares/auth.mjs";
import validate from '../middlewares/validate.mjs';
import { commentSchema } from '../validation/comment.mjs';
const router = Router()



router.get('/:postId', authorize(), commentController.getAll);


router.post('/:postId', authorize(), validate(commentSchema), commentController.create)



router.delete('/:id', authorize(), commentController.remove)


router.put('/:id', authorize(), validate(commentSchema), commentController.update)




export default router;

