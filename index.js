import express from "express";
import booksRout from "./routers/books.js";
import authorsRout from "./routers/authors.js";
import authRout from "./routers/auth.js";
import usersRout from "./routers/users.js";
import uploadRout from "./routers/upload.js";
import passwordRout from "./routers/password.js";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/error.js";
import { connectDB } from "./config/db.js";
import path from "path"; 
import helmet from "helmet";
import cors from "cors";
dotenv.config()

//connect to database
connectDB()

//init app
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(logger)

//helmet
app.use(helmet())

//cors
app.use(cors())
// to read folder images and static 
// app.use(express.static(path.join(__dirname,"images")));

app.set("view engine","ejs")

app.use("/api/books",booksRout);
app.use("/api/author",authorsRout);
app.use("/api/auth",authRout);
app.use("/api/users",usersRout);
app.use("/api/upload",uploadRout);
app.use("/password",passwordRout);

// Error Handler Middleware

app.use(notFound)
app.use(errorHandler)

//listen app
const PORT=process.env.PORT|| 3080;
app.listen(PORT, () => {
    console.log(`server is Runing ${PORT}`);
})