import jwt from "jsonwebtoken"

const options ={
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    sameSite:"strict",
    

}

const genrateToken=(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })

    res.cookie("jwt",token,options)

    return token
}

export {
    genrateToken
}