import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const verifyJwt=async(req,res,next)=>{
    const token= req.cookies?.jwt

    if (!token) {
        return res.status(400).json({message:"unauthorized access"})
    }

    const decode=jwt.verify(token,process.env.JWT_SECRET)

    if (!decode) {
        return res.status(400).json({message:"unauthorized access"})
    }

    const user=await User.findById(decode.userId).select("-password")

    if (!user) {
        return res.status(400).json({message:"unauthorized access"})
    }

    req.user=user

    next()
}

export default verifyJwt