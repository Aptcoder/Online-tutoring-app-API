const express = require('express');
const adminAuth = require('../../controllers/authentication/adminAuth')
const tutorController = require('../../controllers/userControllers/tutorController')

var router = express.Router();


router.get('/',adminAuth,tutorController.getAllTutors)

 //routes for getting tutor by id
 router.get('/:id',adminAuth,tutorController.getTutorById)

 //routes to deactivate tutor - admin access only
 router.put('/:id/deactivate',adminAuth,tutorController.deactivateTutor)



module.exports = router