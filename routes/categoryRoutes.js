const express = require('express');
const generalAuth = require('../controllers/authentication/generalAuth')
const studentAuth = require('../controllers/authentication/studentAuth')
const controller = require('../controllers/categoryController');
const subjController = require('../controllers/subjectController')

var router = express.Router();

router.get('/:category/subjects',generalAuth,controller.getSubjectsInCategory)


router.get('/:category/subject/:subject/tutors',studentAuth,subjController.getTutorsTakingSub)

module.exports = router