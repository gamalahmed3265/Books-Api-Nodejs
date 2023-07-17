import BooksModel from "./models/book.js"
import {books} from "./data.js"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const importBooks=async()=>{
    try{
        await BooksModel.insertMany(books);
        console.log("Books Imported");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

const deletBooks=async()=>{
    try{
        await BooksModel.deleteMany(books);
        console.log("Books delet");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

if(process.argv[2] ==="-import"){
    importBooks();
}else if(process.argv[2] ==="-delete"){
    deletBooks();
}