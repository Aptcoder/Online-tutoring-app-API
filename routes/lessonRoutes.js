const express = require('express');
const studentAuth = require('../controllers/authentication/studentAuth')
const controller = require('../controllers/lessonController');
const adminAuth = require('../controllers/authentication/adminAuth')

const router = express.Router()

router.post('/book',adminAuth,controller.adminBookLesson)
router.get('/',adminAuth,controller.getLessons)

router.get('/:id',adminAuth,controller.getLessonById)
router.put('/:id',adminAuth,controller.updateLesson)
router.delete('/:id',adminAuth,controller.deleteLesson)


module.exports = router