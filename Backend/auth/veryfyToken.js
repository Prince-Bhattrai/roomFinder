import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is required"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
