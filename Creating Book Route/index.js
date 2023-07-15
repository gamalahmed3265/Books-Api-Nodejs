import express from "express";
import booksAuth from "./routers/books.js";


const app = express()

app.use(express.json())

app.use("/api/books",booksAuth);

const PORT = 8800;
app.listen(PORT, () => {
    console.log(`server is Runing ${PORT}`);
})