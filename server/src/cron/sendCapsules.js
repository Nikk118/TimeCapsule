import cron from "node-cron";
import Capsule from "../models/capsule.model.js";
import Media from "../models/media.js";
import sendMail from "../utils/email.utils.js"; 

export const startDeliveryCron = () => {
  cron.schedule("*/60 * * * *", async () => {
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
        // Fetch media associated with the capsule
        const mediaFiles = await Media.find({ capsuleId: capsule._id });

        // Send the email with the message and media attachments
        await sendMail({
          to: capsule.email,
          subject: "🎁 Your Time Capsule Has Arrived!",
          text: capsule.message,
          attachments: mediaFiles.map((file) => ({
            filename: `media-${file.type}`,
            path: file.fileUrl,
          })),
        });

        // Mark capsule as delivered
        capsule.isDelivered = true;
        await capsule.save();

        console.log(`✅ Delivered capsule to ${capsule.email}`);
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};
