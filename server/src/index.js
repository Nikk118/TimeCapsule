import express, { urlencoded } from "express"
import { configDotenv } from "dotenv"
import connectDB from "./config/index.js"
import userRouter from "./routers/user.route.js"
import cookieParser from "cookie-parser"
import capsuleRouter from "./routers/capsule.route.js"
import path, { dirname } from "path"
import cors from "cors"
configDotenv()
const app = express()


connectDB()
.then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`server is runnnig on port: ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("error",error)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(express.static("public"))

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
  }));

app.use("/api/user",userRouter)
app.use("/api/capsule",capsuleRouter)

import { startDeliveryCron } from './cron/sendCapsules.js';




startDeliveryCron();

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../client/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../client","dist","index.html"));
    })
}

