import mongoose from "mongoose";
import jwt from "jsonwebtoken"


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

UsersSchema.methods.generateToken=function(){
    return jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRETKEY_KEY);
}


const UsersModel = mongoose.model("UsersSchema", UsersSchema);

export default UsersModel