import mongoose, { Schema } from "mongoose";

const mediaSchema = new Schema(
  {
    capsuleId: {
      type: Schema.Types.ObjectId,
      ref: "Capsule",
    },
    fileUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "audio", "video"],
      required: true,
    },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;
