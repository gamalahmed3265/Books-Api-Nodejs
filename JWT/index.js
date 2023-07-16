import express from "express";
import booksRout from "./routers/books.js";
import authorsRout from "./routers/authors.js";
import authRout from "./routers/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/error.js";

dotenv.config()

//connect to database
mongoose.connect(process.env.URLMONGOOSE).then(()=>{
    console.log("Connected to MongoStoreDB");
}).catch((err)=>{
    console.log(err);
})

//init app
const app = express()

app.use(express.json())
// app.use(logger)

app.use("/api/books",booksRout);
app.use("/api/author",authorsRout);
app.use("/api/auth",authRout);

// Error Handler Middleware

app.use(notFound)
app.use(errorHandler)

//listen app
const PORT=process.env.PORT|| 3080;
app.listen(PORT, () => {
    console.log(`server is Runing ${PORT}`);
})