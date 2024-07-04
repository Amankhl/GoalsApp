import { Goal } from "../models/goal.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

// after we write authentication, we will get particular user goals
// @access Private - all these going to be private after we write authentication

// @route GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user._id});  // fetches all the document that has the user id = req.user._id                    //just using find() will fetch all of the goals
    res.status(200).json(goals);
});


// @route POST /api/goals
const createGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        throw new apiError(400, "Please add a text field");
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id
    });
    res.status(200).json({ message: "Goal created successfully", goal: goal});
});


// @route PUT /api/goals/:id
const updateGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = req.user._id;

    const goal = await Goal.findById(id);
    if (!goal || goal.user.toString() !== user.toString()) {
        throw new apiError(404, "Goal not found or unauthorized");
    }
    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Goal updated successfully", goal: updatedGoal });
});


// @route DELETE /api/goals/:id
/*
//This code is not efficient. We are calling the db many times.
const deleteGoal = asyncHandler(async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        const user = await User.findById(req.user._id);  // from req.user (middleware)
        if (!user) {
            throw new apiError(404, "User not found");
        }
        //check only the authorized user can delete
        if (goal.user.toString() !== user._id.toString()) {
            throw new apiError(401, "Unauthorized user");
        }
        await Goal.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Goal Deleted successfully", id: req.params.id });
    } catch (error) {
        throw new apiError(404, "Goal not found");
    }
});
*/
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = req.user._id;

    const goal = await Goal.findById(id);
    if (!goal || goal.user.toString() !== user.toString()) {    // user (id) is from req.user (middleware) and goal.user (id) is from database
        throw new apiError(404, "Goal not found or unauthorized");
    }

    await Goal.findByIdAndDelete(id);
    res.status(200).json({ message: "Goal Deleted successfully", id });
});



export { getGoals, createGoal, updateGoal, deleteGoal }