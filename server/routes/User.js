const express=require('express');
const { login, signup, sendOtp, changePassword } = require('../controllers/Auth');
const { resetPassword, resetPasswordToken } = require('../controllers/ResetPassword');
const { auth } = require('../middlewares/auth');
const router=express.Router();


// middlewares 


// routes
// Authentication routes

router.post('/login',login)
router.post('/signup',signup)
router.post('/sendotp',sendOtp)
router.post('/changepassword',auth,changePassword)


//reset password
router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password',resetPassword);

module.exports=router
