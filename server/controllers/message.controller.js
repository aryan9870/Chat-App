import User from "../models/user.model.js";
import Message from "../models/message.model.js";

// Get all users for sidebar
export const getUsersForSidebar = async (req, res) => {
    // TODO: Get all users except logged-in user

    res.status(200).json({
      success: true,
      users: [],
    });
    
};

// Get conversation with selected user
export const getMessages = async (req, res) => {
    // TODO:
    // 1. Get selected user id from req.params.id
    // 2. Get logged-in user id from req.user
    // 3. Fetch all messages between both users
    // 4. Return messages

    res.status(200).json({
      success: true,
      messages: [],
    });
  
};

// Send message
export const sendMessage = async (req, res) => {
    // TODO:
    // 1. Get receiver id from req.params.id
    // 2. Get sender id from req.user
    // 3. Get content from req.body
    // 4. Create new message
    // 5. Save message
    // 6. Return saved message

    res.status(201).json({
      success: true,
      message: {},
    });
};