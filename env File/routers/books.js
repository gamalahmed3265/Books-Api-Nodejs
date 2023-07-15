import express from "express";
import Joi from "joi";
import BooksModel from "../models/book";
import asyncHandler from "express-async-handler"
import { validateCreateBook, validateUpdateBook } from "../functions/valid.js"

const router=express.Router()


router.get("/", asyncHandler(
    async (req, res) => {
        const bookList = await BooksModel.find().populate("author",["firstName","lastName"])
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

router.post("/", asyncHandler(
    async (req, res) => {
        const { error } = validateCreateUser(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message })
        }
        const booksModel = BooksModel({
            title: req.body.title,
            author: req.body.price,
            descriptions: req.body.descriptions,
            price: req.body.price,
            cover: req.body.cover
        });
        const reults = await booksModel.save();
        res.status(200).json(reults);
    }
))

rou
router.put("/:id",asyncHandler (async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }
    const booksModel = await BooksModel.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.price,
            descriptions: req.body.descriptions,
            price: req.body.price,
            cover: req.body.cover
        }
    },{
        new:true
    });
    res.status(200).json(user);
}))

router.delete("/:id", asyncHandler(
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