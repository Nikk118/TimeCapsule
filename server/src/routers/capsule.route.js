import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import verifyJwt from "../middlewares/auth.middleware.js";
import { createCapsule ,getUserCapsule} from "../controllers/capsule.controller.js";

const router = Router()

router.route("/createCapsule").post(verifyJwt,upload.array("media",5),createCapsule);

router.route("/getUserCapsule").get(verifyJwt,getUserCapsule)

export default router