const express = require('express');
const controller = require('../../controllers/userControllers/tutorController')
const tutorAuth = require('../../controllers/authentication/tutorAuth');
const adminAuth = require('../../controllers/authentication/adminAuth')
const generalAuth = require('../../controllers/authentication/generalAuth')

var router = express.Router();

router.post('/signup',controller.signUpTutor)
router.post('/login',controller.loginTutor)

router.get('/',generalAuth,controller.getTutorsByName)
router.post('/subject/register',tutorAuth,controller.registerSubject)


/* route to get all tutor . admin access only
 */ 
 router.get('/',adminAuth,controller.getAllTutors)

 //routes for getting tutor by id
 router.get('/:id',adminAuth,controller.getTutorById)

 //routes to deactivate tutor - admin access only
 router.put('/:id/deactivate',adminAuth,controller.deactivateTutor)

module.exports = router