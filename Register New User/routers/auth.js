import express from "express";
import Joi from "joi";
import User from "../models/user.js"
import asyncHandler from "express-async-handler"
import bcryptjs from "bcryptjs"
import { validateUpdatUser, validateLoginUser,validateRegistereUser } from "../functions/valid-user.js"
const router = express.Router();


router.get("/", asyncHandler(
    async (req, res) => {
        const usersList = await User.find()
        res.status(200).json(usersList);
    }
));

router.get("/:id", asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
}));

router.post("/registere", asyncHandler(
    async (req, res) => {
        const { error } = validateRegistereUser(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message })
        }
        let user=await User.findOne({email: req.body.email});
        if(user){
            res.status(400).json({message: "this user is aready Registere"})
        }
        const salt=await bcryptjs.genSalt(10);
        const hash=bcryptjs.hash(req.body.password,salt)
        // console.log(hash);

        user =new User({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            isAdmin: req.body.isAdmin
        });
        const reults = await user.save();
        const token=null;
        const {password, ...other }=reults._doc;

        res.status(200).json({...other,token});
    }
))

router.put("/:id",asyncHandler (async (req, res) => {
    const { error } = validateUpdatUser(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
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
        const usersList = await User.findById(req.params.id);
        if (usersList) {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "user has been deleted" });
        } else {
            res.status(404).json({ message: "user not found" });
        }

    }
))


export default router;