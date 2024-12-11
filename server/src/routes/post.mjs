import { Router } from'express'
import controller from "../controllers/post.mjs"
import validate from '../middlewares/validate.mjs';
import upload from '../middlewares/multer.mjs';
import { authorize } from "../middlewares/auth.mjs";
import createPostValidationSchema from '../validation/post.mjs';
import editPostValidationSchema from '../validation/post.mjs';
const router = Router()



router.get('/', authorize(),  controller.getAll);


router.post('/',authorize(), upload.single("img"), validate(createPostValidationSchema), controller.create)



router.delete('/:id', authorize(),  controller.remove) 


router.put('/:id',authorize(), upload.single("img"), validate(editPostValidationSchema), controller.update) 


router.put('/:id/like',authorize(), controller.like) 


export default router;