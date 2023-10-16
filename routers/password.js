import express from "express";
import {getForgotPasswordView,sendForgotPasswordLink,getResetPasswordView,resetThePassword} from "../controller/passwordController.js"

const router=express.Router()


/*
* @desc forget password
* @route /password/forget-password
* @metheod GET
* @access public
*/ 

// /password/forgot-password
router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);


// /password/reset-password/:userId/:token
router.route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetThePassword)



export default router;