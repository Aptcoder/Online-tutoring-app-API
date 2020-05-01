const express = require('express');
const controller = require('../../controllers/userControllers/tutorController')

var router = express.Router();

router.post('/signup',controller.signUpTutor)
router.post('/login',controller.loginTutor)

module.exports = router