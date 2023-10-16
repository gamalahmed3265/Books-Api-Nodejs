import express from "express";
import {getAllBooks,getBooktById,addNewBook,updateBook,deleteBook} from "../controller/booksController.js"
import {verifyTokenAdmin } from "../middleware/verifyToken.js";

const router=express.Router()


/*
* @desc get all book
* @route /api/books/
* @metheod GET
* @access public
*/ 
router.get("/", getAllBooks);

/*
* @desc get book by id
* @route /api/books/
* @metheod GET
* @access public
*/ 
router.get("/:id", getBooktById);


/*
* @desc Create new book
* @route /api/books/
* @metheod post
* @access private
*/ 
router.post("/",verifyTokenAdmin ,addNewBook)


/*
* @desc update book
* @route /api/books/
* @metheod put
* @access private
*/ 
router.put("/:id",verifyTokenAdmin,updateBook)


/*
* @desc delete book
* @route /api/books/
* @metheod delete
* @access private
*/ 
router.delete("/:id", verifyTokenAdmin,deleteBook)

export default router;