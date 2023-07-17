import express from "express";
import Joi from "joi";
import User from "../models/user.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { validateUpdatUser, validateLoginUser,validateRegistereUser } from "../functions/valid-user.js"
const router = express.Router();


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
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt)
        // console.log(hash);

        user =new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });

        const reults = await user.save();

        const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRETKEY_KEY);
        const {password, ...other }=reults._doc;

        res.status(200).json({...other,token});
    }
))

router.post("/login", asyncHandler(
    async (req, res) => {
        const { error } = validateLoginUser(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message })
        }
        let user=await User.findOne({email: req.body.email});
        if(!user){
            res.status(400).json({message: "invalid email or password"})
        }
        const isPasswordnMatch=await bcrypt.compare(req.body.password,user.password);
        
        if(!isPasswordnMatch){
            res.status(400).json({message:"invalid email or password"})
        }
        
        const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRETKEY_KEY);
        const {password, ...other }=user._doc;

        res.status(200).json({...other,token});
    }
))


export default router;