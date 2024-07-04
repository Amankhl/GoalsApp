import express from "express";
import { getMe, getUsers, loginUser, registerUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getMe);


export default router;