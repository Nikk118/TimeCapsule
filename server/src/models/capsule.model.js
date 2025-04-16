import { mongoose,Schema } from "mongoose";

const capsuleSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    deliveryDateTime: {
      type: Date,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Capsule=mongoose.model("Capsule",capsuleSchema)
export default Capsule
