import cron from "node-cron";
import Capsule from "../models/capsule.model.js";
import Media from "../models/media.js";
import {sendCapsuleEmail} from "../utils/email.utils.js"; 

export const startDeliveryCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("⏰ Cron job running...");

    const now = new Date();

    try {
      // Find capsules that are due for delivery
      const capsules = await Capsule.find({
        deliveryDateTime: { $lte: now },
        isDelivered: false,
      });

      if (capsules.length === 0) {
        console.log("No capsules to deliver.");
        return;
      }

      for (let capsule of capsules) {
        console.log("this is email",capsule.email)
        // Check if the capsule has an email and it's valid
        if (!capsule.email || !/\S+@\S+\.\S+/.test(capsule.email)) {
          console.warn(`⚠️ Skipping capsule ${capsule._id} due to missing or invalid email.`);
          continue; // Skip to the next capsule if email is invalid or missing
        }

        // Fetch media associated with the capsule
        const mediaFiles = await Media.find({ capsuleId: capsule._id });
        console.log("media",mediaFiles)
        // Send the email with the message and media attachments
        await sendCapsuleEmail(
          capsule.email,
          "🎁 Your Time Capsule Has Arrived!",
          capsule.message,
          mediaFiles.map((file) => ({
            filename: `media-${file.type}`,
            path: file.fileUrl,
          }))
        );
        
        

        // Mark capsule as delivered
        capsule.isDelivered = true;
        await capsule.save();

        console.log(`✅ Delivered capsule to ${capsule.email}`);
        console.log(`✅ Delivered capsule to ${capsule.email}`);
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};

