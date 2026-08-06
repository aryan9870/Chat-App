import express from "express";
import { isLoggedin } from "../middlewares/auth.middleware.js";
import {
  sendMessage,
  getMessages,
  getUsersForSidebar,
} from "../controllers/message.controller.js";

const router = express.Router();

// Get all users for sidebar
router.get("/users", isLoggedin, getUsersForSidebar);

// Get conversation with selected user
router.get("/:id", isLoggedin, getMessages);

// Send message to selected user
router.post("/send/:id", isLoggedin, sendMessage);

export default router;