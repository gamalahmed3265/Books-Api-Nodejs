import mongoose from "mongoose";


const BooksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 250
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AthSchema",
    },
    descriptions: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    
    cover: {
        type: String,
        required: true,
        enums: ["soft cover", "hard cover"]
    },
},
    { 
        timestamps: true
    }
);

const BooksModel = mongoose.model("BooksSchema", BooksSchema);

export default BooksModel