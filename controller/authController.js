import express from "express";
import User from "../models/user.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"

import {validateLoginUser,validateRegistereUser } from "../functions/valid-user.js"

export const registereUser=asyncHandler(
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

        user =new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });

        const reults = await user.save();

        const token=user.generateToken()
        const {password, ...other }=reults._doc;

        res.status(200).json({...other,token});
    }
);

export const loginUser=asyncHandler(
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
        
        const token=user.generateToken()
        const {password, ...other }=user._doc;

        res.status(200).json({...other,token});
    }
);