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

 

 //tutors can see all subjects then registered to take
 router.get('/subjects',tutorAuth,controller.getTutorSubjects)


 router.put('/subject/:subject/category/:category',tutorAuth,controller.updateRegisteredSub)
 router.delete('/subject/:id',tutorAuth,controller.deleteRegSub)
 

module.exports = router