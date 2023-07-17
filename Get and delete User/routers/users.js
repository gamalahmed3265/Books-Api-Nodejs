import express from "express";
import Joi from "joi";
import User from "../models/user.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validateUpdatUser, validateLoginUser,validateRegistereUser } from "../functions/valid-user.js"
import {verifyTokenAndAuthorization,verifyTokenAdmin } from "../middleware/verifyToken.js";
const router = express.Router();


/*
* @desc Update user
* @route /api/users/
* @metheod PUT
* @access private
*/ 
router.get("/" ,verifyTokenAdmin,asyncHandler(
    async (req, res) => {
        const usersList = await User.find().selct("-password")
        res.status(200).json(usersList);
    }
));

/*
* @desc get user by id
* @route /api/users/:id
* @metheod PUT
* @access private
*/ 

router.get("/:id",verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
}));

/*
* @desc Update user
* @route /api/users/:id
* @metheod PUT
* @access private
*/ 
router.put("/:id",verifyTokenAndAuthorization,asyncHandler (async (req, res) => {
    
    const { error } = validateUpdatUser(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }

    if(req.body.password){
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt);
    }
    const userUpdate = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
    },{
        new:true
    }).select("-password");

    res.status(200).json({userUpdate});
}))

/*
* @desc Update user
* @route /api/users/:id
* @metheod delete
* @access private
*/ 

router.delete("/:id", verifyTokenAdmin,asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "user has been deleted" });
        } else {
            res.status(404).json({ message: "user not found" });
        }

    }
))


export default router;