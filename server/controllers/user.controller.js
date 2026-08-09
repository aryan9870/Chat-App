import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

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

export const loginUser = async (req, res) => {
  
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Generate JWT
  const token = generateToken(user._id);

  // Store token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "User login successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
};

// Logout
export const logoutUser = async (req, res) => {
  
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

// Get Profile
export const getProfile = async (req, res) => {
  
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
};

// Update Profile
export const updateProfile = async (req, res) => {
    // get current logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const { username, bio } = req.body;

    console.log("Body:", req.body);
    console.log("File:", req.file);

    // update username and bio
    user.username = username;
    user.bio = bio;

    console.log("before upload");
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      user.avatar = result.secure_url;
    }
    console.log("after upload");

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            bio: user.bio,
        },
    });    
    
}