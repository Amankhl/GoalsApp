import express from "express";
import { getGoals, createGoal, updateGoal, deleteGoal } from "../controllers/goal.controllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.route("/").get(protect,getGoals).post(protect,createGoal);  // because the routes are same for different request, we can do this
router.route("/:id").put(protect, updateGoal).delete(protect,deleteGoal);

export default router;