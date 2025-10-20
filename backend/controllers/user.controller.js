import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

// Get all users except current user
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const users = await User.findAllExceptUser(currentUserId);
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    next(error);
  }
};

// Get messages between current user and another user
export const getMessages = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const { userId } = req.params;

    const messages = await Message.findBetweenUsers(currentUserId, userId);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error in getMessages:", error);
    next(error);
  }
};
