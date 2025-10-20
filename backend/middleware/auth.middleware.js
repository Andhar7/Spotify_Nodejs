import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Middleware to protect routes - verifies JWT token
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - invalid token",
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Middleware to require admin access
export const requireAdmin = async (req, res, next) => {
  try {
    // Get user from database (req.userId set by protectRoute)
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user email matches admin email OR user has is_admin flag
    const isAdmin = user.is_admin || user.email === process.env.ADMIN_EMAIL;

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized - you must be an admin",
      });
    }

    next();
  } catch (error) {
    console.error("Error in requireAdmin middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
