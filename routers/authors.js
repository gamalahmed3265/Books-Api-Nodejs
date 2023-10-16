import express from "express";
import {verifyTokenAdmin } from "../middleware/verifyToken.js";

import {getAllAuthor,getAuthorById,addAuthor,updateAuthor,deleteAuthor} from "../controller/authorsController.js"
const router = express.Router();

/*
* @desc get all author
* @route /api/author/
* @metheod GET
* @access private
*/ 
router.get("/", getAllAuthor);

/*
* @desc get author By id
* @route /api/author/
* @metheod GET
* @access private
*/ 
router.get("/:id", getAuthorById);


/*
* @desc Create new Author
* @route /api/author/
* @metheod POST
* @access private
*/ 
router.post("/", addAuthor)


/*
* @desc update book
* @route /api/author/
* @metheod PUT
* @access private
*/ 
router.put("/:id",verifyTokenAdmin,updateAuthor)

/*
* @desc delete book
* @route /api/books/
* @metheod delete
* @access private
*/ 
router.delete("/:id",verifyTokenAdmin ,deleteAuthor)


export default router;