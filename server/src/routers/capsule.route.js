import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import verifyJwt from "../middlewares/auth.middleware.js";
import { createCapsule ,getUserCapsule} from "../controllers/capsule.controller.js";

const router = Router()

router.route('/createCapsule')
  .post(
    verifyJwt,
    upload.array('media', 5),  // file upload middleware
    (err, req, res, next) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next(); // Continue if no error
    },
    createCapsule  // Capsule creation logic
  );

router.route("/getUserCapsule").get(verifyJwt,getUserCapsule)

export default router