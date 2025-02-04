const express=require('express');
const { auth } = require('../middlewares/auth');
const { updateProfile, updateDisplayPicture, getAllUserDetails, deleteAccount } = require('../controllers/Profile');
const router=express.Router();


// routes

router.put("/updateProfile", auth, updateProfile)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get('/getUserDetails',auth,getAllUserDetails)
// delete user
router.delete("/deleteProfile", auth, deleteAccount)
module.exports=router