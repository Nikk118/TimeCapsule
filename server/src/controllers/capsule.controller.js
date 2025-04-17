import Capsule from "../models/capsule.model.js"
import User from "../models/user.model.js";
import Media from "../models/media.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const createCapsule = async (req, res) => {
    try {
      console.log("req:",req.body)
      const { message, deliveryDateTime } = req.body;
  
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const newCapsule = await Capsule.create({
        email: user.email,
        message,
        deliveryDateTime,
      });
  
      if (!newCapsule) {
        return res.status(500).json({ 4: "Failed to create capsule" });
      }
  
      // Handle media upload if any
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await uploadOnCloudinary(file.path, "time-capsule");
  
          await Media.create({
            capsuleId: newCapsule._id,
            fileUrl: result.secure_url,
            type: file.mimetype.startsWith("video") ? "video" : "image",
          });
        }
      }
  
      return res.status(201).json({
        message: "Capsule created successfully",
        capsule: newCapsule,
      });
    } catch (error) {
      console.error("Error creating capsule:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  

const getUserCapsule = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const userCapsules = await Capsule.find({ email: user.email }).sort({createdAt:-1});
  
      return res.status(200).json({ message: "Capsules fetched", userCapsules });
    } catch (error) {
      console.error("Error fetching capsules:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

export { createCapsule,
    getUserCapsule
 };
