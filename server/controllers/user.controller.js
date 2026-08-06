import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password, // Password will be hashed automatically by pre("save")
  });

  // Generate JWT
  const token = generateToken(user._id);

  // Store token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
};