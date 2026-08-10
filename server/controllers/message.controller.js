import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { io, userSocketMap } from "../server.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Get all users for sidebar
export const getUsersForSidebar = async (req, res) => {
  const loggedInUser = req.user._id;

  const users = await User.find({
    _id: { $ne: loggedInUser },
  }).select("-password");

  const usersWithLastMessage = await Promise.all(
    users.map(async (user) => {

        const lastMessage = await Message.findOne({
            $or: [
                { sender: loggedInUser, receiver: user._id },
                { sender: user._id, receiver: loggedInUser }
            ],
        }).sort({ createdAt: -1 });


        const unreadCount = await Message.countDocuments({
            sender: user._id,
            receiver: loggedInUser,
            seen: false,
        });

        return {
            ...user.toObject(),
            lastMessage,
            unreadCount,
        };
    })
);

  usersWithLastMessage.sort(
    (a, b) =>
      new Date(b.lastMessage?.createdAt || 0) -
      new Date(a.lastMessage?.createdAt || 0)
  );

  res.status(200).json({
    success: true,
    users: usersWithLastMessage,

  });
};

// Get conversation with selected user
export const getMessages = async (req, res) => {

    // 1. Get selected user id from req.params.id
    const selectedUserId = req.params.id;
    // 2. Get logged-in user id from req.user
    const loggedInUserId = req.user._id;
    // 3. Fetch all messages between both users

    // Mark all received messages as seen
    await Message.updateMany(
        {
            sender: selectedUserId,
            receiver: loggedInUserId,
            seen: false,
        },
        {
            $set: { seen: true },
        }
    );

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

    // 1. Get receiver id
    const receiverId = req.params.id;

    // 2. Get sender id
    const senderId = req.user._id;

    // 3. Get content from req.body
    const { content } = req.body;

    // 4. Get image from multer
    const imageFile = req.file;

    // 5. If image exists, upload it to Cloudinary
    let imageUrl = "";
    if (imageFile) {
        const result = await uploadToCloudinary(imageFile.buffer);
        imageUrl = result.secure_url;
    }

    // 4. Create new message
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content: content,
      image: imageUrl,
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