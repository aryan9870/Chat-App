import express from "express";
import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/user.controller.js";
import { isLoggedin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isLoggedin, logoutUser);
router.get("/profile", isLoggedin, getProfile);
export default router;