const express = require('express');
const controller = require('../../controllers/userControllers/tutorController')
const tutorAuth = require('../../controllers/authentication/tutorAuth');
const generalAuth = require('../../controllers/authentication/generalAuth')

var router = express.Router();

router.post('/signup',controller.signUpTutor)
router.post('/login',controller.loginTutor)

router.get('/',generalAuth,controller.getTutorsByName)
router.post('/subject/register',tutorAuth,controller.registerSubject)

module.exports = router