import bcrypt from "bcrypt";
import User from "../models/user.model.js"; 
import { genrateToken } from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
        const token=genrateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
          message: "User created successfully",
          user: newUser,
          token:token
      });

    }
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        genrateToken(user._id, res);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const getUser=async(req,res)=>{
  const user= await User.findById(req.user._id)

  return res.status(200).json({message:"current user",user})
}

const logout=async(req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0});
    return res.status(200).json({message:"logout succesfully"})
  } catch (error) {
    return res.status(500).json({message:"somthing went wrong"})
  }
}

export { signup,
    login,
    logout,
    getUser
}
