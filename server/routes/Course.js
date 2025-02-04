// Import the required modules
const express = require("express")
const router = express.Router()

// import middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
const { createCourse, getAllCourses, getCourseDetails } = require("../controllers/Course");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Category");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/SubSection");
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");


// Routings:- 

// course routes
// course can only be created by instructor
router.post('/createCourse',auth,isInstructor,createCourse);
// to get all registered courses
router.get('/getAllCourses',getAllCourses);
// get details of specific course
router.post('/getCourseDetails',getCourseDetails)



// category routes

router.post('/createCategory',auth,isAdmin,createCategory);
router.get('/showAllCategories',showAllCategories);
router.post('/getCategoryPageDetails',categoryPageDetails);


// section routes
router.post('/addSection',auth,isInstructor,createSection);
router.post('/updateSection',auth,isInstructor,updateSection);
router.delete('/deleteSection',auth,isInstructor,deleteSection);

// subsections routing
router.post('/addSubSection',auth,isInstructor,createSubSection);
router.post('/updateSubSection',auth,isInstructor,updateSubSection);
router.delete('/deleteSubSection',auth,isInstructor,deleteSubSection);


// routing for rating and review
router.post('/createRating',auth,isStudent,createRating);
router.get('/getAverageRating',getAverageRating);
router.get('/getReviews',getAllRating);


module.exports=router;