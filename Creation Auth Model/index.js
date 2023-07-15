import express from "express";
import booksRout from "./routers/books.js";
import authRout from "./routers/auth.js";
import mongoose from "mongoose";

const urlMongoose="mongodb://127.0.0.1:27017/booksStrore";
mongoose.connect(urlMongoose).then(()=>{
    console.log("Connected to MongoStoreDB");
}).catch((err)=>{
    console.log(err);
})

const app = express()

app.use(express.json())

app.use("/api/books",booksRout);
app.use("/api/auth",authRout);

const PORT = 8800;
app.listen(PORT, () => {
    console.log(`server is Runing ${PORT}`);
})