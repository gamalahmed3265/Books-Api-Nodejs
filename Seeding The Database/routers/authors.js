import express from "express";
import Joi from "joi";
import AuthorModel from "../models/author.js"
import asyncHandler from "express-async-handler"
import { validateCreateAuthors, validateUpdatAuthors } from "../functions/valid-authors.js"
import {verifyTokenAdmin } from "../middleware/verifyToken.js";

const router = express.Router();


router.get("/", asyncHandler(
    async (req, res) => {
        const usersList = await AuthorModel.find()
        res.status(200).json(usersList);
    }
));

router.get("/:id", asyncHandler(async (req, res) => {
    const user = await AuthorModel.findById(req.params.id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
}));

router.post("/", asyncHandler(
    async (req, res) => {
        const { error } = validateCreateAuthors(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message })
        }
        const authuser = AuthorModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        });
        const reults = await authuser.save();
        res.status(200).json(reults);
    }
))


/*
* @desc Create new book
* @route /api/author/
* @metheod put
* @access private
*/ 
router.put("/:id",verifyTokenAdmin,asyncHandler (async (req, res) => {
    const { error } = validateUpdatAuthors(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }
    const user = await AuthorModel.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        }
    })
    res.status(200).json(user);
}))

/*
* @desc delete book
* @route /api/books/
* @metheod delete
* @access private
*/ 
router.delete("/:id",verifyTokenAdmin ,asyncHandler(
    async (req, res) => {
        const usersList = await AuthorModel.findById(req.params.id);
        if (usersList) {
            await AuthorModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "user has been deleted" });
        } else {
            res.status(404).json({ message: "user not found" });
        }

    }
))


export default router;