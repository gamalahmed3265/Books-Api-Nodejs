import express from "express";
import Joi from "joi";
import BooksModel from "../models/book";

const router=express.Router()


router.get("/", (req, res) => {
    res.json(BooksModel);
})
router.get("/:id", (req, res) => {

    const book = books.find((b => b.id === parseInt(req.params.id)))
    console.log(book);
    if (book) {
        res.status(200).json(book);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
})

router.post("/", (req, res) => {

    const {error} = validateCreateBook(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message})
    }
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.price,
        descriptions: req.body.descriptions,
        price: req.body.price,
        cover: req.body.cover
    }
    books.push(book);
    if (book) {
        res.status(200).json(books);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
})

router.put("/:id",(req,res)=>{
    const {error}=validateUpdateBook(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message})
    }

    const book=books.find(b=>b.id=== parseInt(req.params.id));

    if(book){
        res.status(200).json({message:"book has been update"});
    }
    else{
        res.status(404).json({message:"not found"});
    }
})
// module.exports=router;


export default router;