import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("database conected successfully")
    } catch (error) {
        console.error("errro",error)
        process.exit(1)
    }
}

export default connectDB