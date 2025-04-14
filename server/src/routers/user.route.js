import {Router} from "express"
import { login, signup,logout } from "../controllers/user.controller.js"
import verifyJwt from "../middlewares/auth.middleware.js"
const router=Router()


router.route("/signup").post(signup)

router.route("/login").post(login)

router.route("/logout").get(verifyJwt,logout)

export default router
