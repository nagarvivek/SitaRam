import { Router } from "express"
import { loginUser, logoutUser, registerUser,refreshAccessToken } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import  verify  from "jsonwebtoken"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

// we can single if we want a single file  upload.single() but we want multiple multiple files
// so we use upload.array() but here all fields musat be same like text then on text
// but we are taking image for avatar and text fore username... so we 
// use upload.fields() 

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),registerUser)

router.route("/login").post(loginUser)

//secured Routes

router.route("/logout").post(verifyJWT, logoutUser)
router.route("refresh-token").post(refreshAccessToken)



export default router;