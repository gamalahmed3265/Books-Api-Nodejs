import express from "express";

import { registereUser,loginUser } from "../controller/authController.js";
const router = express.Router();

/*
* @desc add new user
* @route /api/auth/
* @metheod POST
* @access Public
*/ 
router.post("/registere", registereUser)

/*
* @desc add loin
* @route /api/auth/
* @metheod POST
* @access Public
*/ 
router.post("/login", loginUser)


export default router;