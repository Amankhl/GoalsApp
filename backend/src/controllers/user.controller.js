import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {User} from "../models/user.models.js";
import {apiError} from "../utils/apiError.js";

// Generate JWT
const generateToken = (id) => {  // whatever parameter you use will become the key for the decoded payload token e.g., if you use _id as the parameter here, the decoded payload will be { _id: '6684e3d10d44179f827dc698', iat: 1720463478, exp: 1720549878 }
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "1d"});   //ACCESS_TOKEN_SECRET  = JWT_SECRET
} // sign(payload, secretOrPrivateKey, [options, callback])  we are giving the `_id` only as the payload



// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const {name , email, password} = req.body;

    // validation
    if(!name?.trim() || !email?.trim() || !password?.trim()){
        throw new apiError(400, "Please add all fields");
    }
    if(email.includes("@") === false){
        throw new apiError(400, "Please add a valid email");
    }
    // check if user already exists
    const userExists = await User.findOne({email})  // findOne returns the first document that matches the query
    if(userExists){
        throw new apiError(400, "User already exists");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);   // no. of rounds = 10
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({name, email, password: hashedPassword});
    if(user){
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },token: generateToken(user._id)})
    }else{
        throw new apiError(400, "User not created");
    } 

})

//for testing db
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json({ message: "Fetched user(s)", users});
})

// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //validation
    if(!email?.trim() || !password?.trim()){
        throw new apiError(400, "Please add all fields");
    }
    if(email.includes("@") === false){
        throw new apiError(400, "Please add a valid email");
    }
    //check for user email and passford
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            message: "User logged in successfully", 
            user: {
                id: user._id, 
                name: user.name, 
                email: user.email
            }, token: generateToken(user._id)});
    }else{
        throw new apiError(400, "Invalid credentials");
    }
})

// @route GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
    //since we have used protect middleware, we can use req.user as the user object created by middleware can be accessed here
    const {_id, name, email} = req.user;
    res.status(200).json({id: _id, name, email});
})




export { registerUser, loginUser, getMe, getUsers }