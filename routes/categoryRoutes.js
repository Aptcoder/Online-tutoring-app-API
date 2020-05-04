const express = require('express');
const generalAuth = require('../controllers/authentication/generalAuth')
const studentAuth = require('../controllers/authentication/studentAuth')
const controller = require('../controllers/categoryController');
const adminAuth = require('../controllers/authentication/adminAuth')
const subjController = require('../controllers/subjectController')

var router = express.Router();

router.get('/:category/subjects',generalAuth,controller.getSubjectsInCategory)


router.get('/:category/subject/:subject/tutors',studentAuth,subjController.getTutorsTakingSub)
//route to get subject from category by id
router.get('/:category/subject/:id',generalAuth,subjController.getSubInCatById)
router.put('/:category/subject/:id',adminAuth,subjController.updateSubject)
router.delete('/:category/subject/:id',adminAuth,subjController.deleteSubject)

//route to get all categories
router.get('/',generalAuth,controller.getCategories)
router.put('/:category',adminAuth,controller.updateCategory)
router.delete('/:category',adminAuth,controller.deleteCategory)

module.exports = router