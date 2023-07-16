import mongoose from "mongoose";


const AthSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },

    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },

    image: {
        type: String,
        default: "defaults-avater.png"
    },
},
    { 
        timestamps: true
    }
);

const AuthModel = mongoose.model("AthSchema", AthSchema);

export default AuthModel