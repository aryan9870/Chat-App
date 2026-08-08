import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { io, userSocketMap } from "../server.js";

// Get all users for sidebar
export const getUsersForSidebar = async (req, res) => {

    // 1. Get logged-in user id from req.user
    const loggedInUser = req.user._id;
    // 2. Fetch all users except the logged-in user
    const users = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

    res.status(200).json({
      success: true,
      users: users,
    });
    
};

// Get conversation with selected user
export const getMessages = async (req, res) => {

    // 1. Get selected user id from req.params.id
    const selectedUserId = req.params.id;
    // 2. Get logged-in user id from req.user
    const loggedInUserId = req.user._id;
    // 3. Fetch all messages between both users
    const messages = await Message.find({
      $or: [
        { sender: loggedInUserId, receiver: selectedUserId },
        { sender: selectedUserId, receiver: loggedInUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages: messages,
    });
  
};

// Send message
export const sendMessage = async (req, res) => {

    // 1. Get receiver id from req.params.id
    const receiverId = req.params.id;
    // 2. Get sender id from req.user
    const senderId = req.user._id;
    // 3. Get content from req.body
    const content = req.body.content;
    // 4. Create new message
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content: content,
    });

    const receiverSocketId = userSocketMap[receiverId];
    const senderSocketId = userSocketMap[senderId];

    if (receiverSocketId || senderSocketId) {
      if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      if (senderSocketId) {
          io.to(senderSocketId).emit("newMessage", newMessage);
      }
    }


    res.status(201).json({
      success: true,
      message: newMessage,
    });
};