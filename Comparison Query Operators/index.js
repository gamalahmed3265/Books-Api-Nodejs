import express from "express";
import booksRout from "./routers/books.js";
import authorsRout from "./routers/authors.js";
import authRout from "./routers/auth.js";
import usersRout from "./routers/users.js";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { connectDB } from "./config/db.js";

dotenv.config()

//connect to database
connectDB()

//init app
const app = express()

app.use(express.json())
// app.use(logger)

app.use("/api/books",booksRout);
app.use("/api/author",authorsRout);
app.use("/api/auth",authRout);
app.use("/api/users",usersRout);

// Error Handler Middleware

app.use(notFound)
app.use(errorHandler)

//listen app
const PORT=process.env.PORT|| 3080;
app.listen(PORT, () => {
    console.log(`server is Runing ${PORT}`);
})