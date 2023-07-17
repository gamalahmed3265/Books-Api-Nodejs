import BooksModel from "./models/book.js"
import AuthorModel from "./models/author.js"
import {books,authors} from "./data.js"
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

const deleteBooks=async()=>{
    try{
        await BooksModel.deleteMany();
        console.log("Books delet");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
const importAuthor=async()=>{
    try{
        await AuthorModel.insertMany(authors);
        console.log("Author Imported");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

const deleteAuthor=async()=>{
    try{
        await AuthorModel.deleteMany();
        console.log("Author deleted");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

if(process.argv[2] ==="-import-book"){
    importBooks();
}else if(process.argv[2] ==="-delete-book"){
    deleteBooks();
}
else if(process.argv[2] ==="-import-author"){
    importAuthor();
}else if(process.argv[2] ==="-delete-author"){
    deleteAuthor();
}