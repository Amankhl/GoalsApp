import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Please add a name value']
    },
    email:{
        type: String,
        required: [true, 'Please add an email value'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please add a password value']
    }
},{timestamps: true})

export const User = mongoose.model("User", userSchema)
