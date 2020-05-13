const express = require('express');
const controller = require('../../controllers/userControllers/studentController')
const lessonController = require('../../controllers/lessonController')
const studentAuth = require('../../controllers/authentication/studentAuth');
var router = express.Router();

// route for user sign up 
// route for user sign up 
// route for user sign up 
router.post('/signup',controller.signUpStudent)
router.post('/login',controller.loginStudent)

router.post('/book',studentAuth,lessonController.studentBookLesson)


module.exports = router