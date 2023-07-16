import express from "express";
import booksRout from "./routers/books.js";
import authRout from "./routers/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";

dotenv.config()

mongoose.connect(process.env.URLMONGOOSE).then(()=>{
    console.log("Connected to MongoStoreDB");
}).catch((err)=>{
    console.log(err);
})

const app = express()

app.use(express.json())
// app.use(logger)
app.use("/api/books",booksRout);
app.use("/api/auth",authRout);

const PORT=process.env.PORT|| 3080;
app.listen(PORT, () => {
    console.log(`server is Runing ${PORT}`);
})