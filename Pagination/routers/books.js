import express from "express";
import BooksModel from "../models/book.js";
import asyncHandler from "express-async-handler"
import { validateCreateBook, validateUpdateBook } from "../functions/valid-book.js"
import {verifyTokenAdmin } from "../middleware/verifyToken.js";

const router=express.Router()


/*
* @desc get all book
* @route /api/books/
* @metheod GET
* @access private
*/ 

router.get("/", asyncHandler(
    async (req, res) => {
        // Comparison Query Operators
        // $eq equal
        // $ne none equal
        // $lt less then 
        // $lte less then and equal
        // find({price :{$eq :10}})
        
        const {minPrice,maxPrice}=req.query;
        let bookList;
        if(minPrice&&maxPrice){
            bookList = await BooksModel.find({
                price:{
                    $gte:minPrice,
                    $lte:maxPrice
                }
            })
            .populate("author",["firstName","lastName"])
        }else{
            bookList = await BooksModel.find()
            .populate("author",["firstName","lastName"])
        }
        res.status(200).json(bookList);
    }
));

router.get("/:id", asyncHandler(async (req, res) => {
    const book = await BooksModel.findById(req.params.id);
    if (book) {
        res.status(200).json(book);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
}));


/*
* @desc Create new book
* @route /api/books/
* @metheod post
* @access private
*/ 
router.post("/",verifyTokenAdmin ,asyncHandler(
    async (req, res) => {
        const { error } = validateCreateBook(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message })
        }
        const booksModel = BooksModel({
            title: req.body.title,
            author: req.body.author,
            descriptions: req.body.descriptions,
            price: req.body.price,
            cover: req.body.cover
        });
        const reults = await booksModel.save();
        res.status(200).json(reults);
    }
))


/*
* @desc update book
* @route /api/books/
* @metheod put
* @access private
*/ 
router.put("/:id",verifyTokenAdmin,asyncHandler (async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }
    const booksModel = await BooksModel.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            descriptions: req.body.descriptions,
            price: req.body.price,
            cover: req.body.cover
        }
    },{
        new:true
    });
    res.status(200).json(booksModel);
}))


/*
* @desc delete book
* @route /api/books/
* @metheod delete
* @access private
*/ 
router.delete("/:id", verifyTokenAdmin,asyncHandler(
    async (req, res) => {
        const bookList = await BooksModel.findById(req.params.id);
        if (bookList) {
            await BooksModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Book has been deleted" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }

    }
))

export default router;