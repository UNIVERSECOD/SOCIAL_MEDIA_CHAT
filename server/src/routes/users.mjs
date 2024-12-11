import { Router } from "express";
import { authorize } from "../middlewares/auth.mjs";
import { getUser, updateUser } from "../controllers/users.mjs";
import upload from "../middlewares/multer.mjs";
import validate from "../middlewares/validate.mjs";
import { updateUserSchema } from "../validation/user.mjs";

const router = Router()



router.patch("/", authorize(),upload.single("profileImg"),validate(updateUserSchema), updateUser )

router.get("/", authorize(),upload.single("profileImg"), getUser )


export default router;