import express from "express";
import Joi from "joi";
import AuthorModel from "../models/author.js"
import asyncHandler from "express-async-handler"
import { validateCreateAuthors, validateUpdatAuthors } from "../functions/valid-authors.js"
import {verifyTokenAdmin } from "../middleware/verifyToken.js";


export const getAllAuthor=asyncHandler(
    async (req, res) => {
        const usersList = await AuthorModel.find().skip(2)
        res.status(200).json(usersList);
    }
)
export const getAuthorById=asyncHandler(async (req, res) => {
    const user = await AuthorModel.findById(req.params.id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
})
export const addAuthor=asyncHandler(
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
);

export const updateAuthor=asyncHandler (async (req, res) => {
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
});

export const deleteAuthor=asyncHandler(
    async (req, res) => {
        const usersList = await AuthorModel.findById(req.params.id);
        if (usersList) {
            await AuthorModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "user has been deleted" });
        } else {
            res.status(404).json({ message: "user not found" });
        }

    }
)