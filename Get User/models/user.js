import mongoose from "mongoose";


const UsersSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique:true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 200,
        unique:true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
    { 
        timestamps: true
    }
);

const AuthModel = mongoose.model("UsersSchema", UsersSchema);

export default AuthModel