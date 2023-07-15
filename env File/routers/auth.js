import express from "express";
import Joi from "joi";
import AuthModel from "../models/auth.js"
import asyncHandler from "express-async-handler"
import { validateCreateUser, validateUpdatUser } from "../functions/valid.js"
const router = express.Router();


router.get("/", asyncHandler(
    async (req, res) => {
        const usersList = await AuthModel.find()
        res.status(200).json(usersList);
    }
));

router.get("/:id", asyncHandler(async (req, res) => {
    const user = await AuthModel.findById(req.params.id);
    if (user) {
        res.status(200).json(user);
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
        const authuser = AuthModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        });
        const reults = await authuser.save();
        res.status(200).json(reults);
    }
))

router.put("/:id",asyncHandler (async (req, res) => {
    const { error } = validateUpdatUser(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }
    const user = await AuthModel.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        }
    })
    res.status(200).json(user);
}))

router.delete("/:id", asyncHandler(
    async (req, res) => {
        const usersList = await AuthModel.findById(req.params.id);
        if (usersList) {
            await AuthModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "user has been deleted" });
        } else {
            res.status(404).json({ message: "user not found" });
        }

    }
))


export default router;