import mongoose, { Schema } from "mongoose";

const goalSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text:{
        type: String,
        required: [true, 'Please add a text value']
    }
}, { timestamps: true })

export const Goal = mongoose.model("Goal", goalSchema)


// when you have created a model and db is connected both using mongoose. now this model is used in controllers to do some operartions in the database, mongoose provides methods to perform those operations mainly known as CRUD operations