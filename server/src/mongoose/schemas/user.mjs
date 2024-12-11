import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        match: /^[A-Za-z0-9._]+$/,
      },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar : {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
        }
    ],
    forgotPasswordToken: {
        type: String,
        default: null,
    },
    forgotPasswordTokenExpires: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date        
    }
})

const User = mongoose.model("User", userSchema);

export default User;