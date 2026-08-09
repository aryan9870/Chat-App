import express from "express";
import { registerUser, loginUser, logoutUser, getProfile, updateProfile } from "../controllers/user.controller.js";
import { isLoggedin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isLoggedin, logoutUser);
router.get("/profile", isLoggedin, getProfile);

router.put("/profile", isLoggedin, upload.single("avatar"), updateProfile);

export default router;