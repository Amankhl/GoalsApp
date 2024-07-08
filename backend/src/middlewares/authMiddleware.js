import jwt from "jsonwebtoken";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import {apiError} from "../utils/apiError.js";


const protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            //get token from header
            token = req.headers.authorization.split(" ")[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)   // `verfiy()` will return the payload out of the token, in this case we may get { id: '6684cafd8e2e7a1ee20d6c31', iat: 1719978848, exp: 1720065248 } for example.
            // Get user from the token
            // console.log(decoded)
            req.user = await User.findById(decoded.id).select("-password")   // since token always has a payload id you stored while signing a jwt, we can use that to get the user from the database
            // console.log(req.user)
            next()
        } catch (error) {
            throw new apiError(401, "Not authorized, token failed")
        }}
    if(!token){
        throw new apiError(401, "Not authorized, no token")
    }})
export {protect}