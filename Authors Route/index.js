import express from "express";
import booksRout from "./routers/books.js";
import authRout from "./routers/auth.js";


const app = express()

app.use(express.json())

app.use("/api/books",booksRout);
app.use("/api/auth",authRout);

const PORT = 8800;
app.listen(PORT, () => {
    console.log(`server is Runing ${PORT}`);
})