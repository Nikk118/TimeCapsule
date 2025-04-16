import {Router} from "express"
import { login, signup,logout,getUser } from "../controllers/user.controller.js"
import verifyJwt from "../middlewares/auth.middleware.js"
const router=Router()


router.route("/signup").post(signup)

router.route("/login").post(login)

router.route("/logout").get(verifyJwt,logout)

router.route("/getUser").get(verifyJwt,getUser)

export default router
