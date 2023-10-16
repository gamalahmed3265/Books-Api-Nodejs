import express from "express";
import {verifyTokenAndAuthorization,verifyTokenAdmin } from "../middleware/verifyToken.js";

import {getAllUser,getUserById,updateUser,deleteUser} from "../controller/usersController.js"
const router = express.Router();


/*
* @desc get user
* @route /api/users/
* @metheod GET
* @access private
*/ 
router.get("/" ,verifyTokenAdmin,getAllUser);

/*
* @desc get user by id
* @route /api/users/:id
* @metheod PUT
* @access private
*/ 

router.get("/:id",verifyTokenAndAuthorization, getUserById);

/*
* @desc Update user
* @route /api/users/:id
* @metheod PUT
* @access private
*/ 
router.put("/:id",verifyTokenAndAuthorization,updateUser)

/*
* @desc delete user
* @route /api/users/:id
* @metheod delete
* @access private
*/ 
router.delete("/:id", verifyTokenAndAuthorization,deleteUser)


export default router;