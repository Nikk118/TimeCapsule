import jwt from "jsonwebtoken";

export const genrateToken = (userId, res) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, // ✅ true in production (HTTPS)
        sameSite: "none", // important for frontend-backend
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};