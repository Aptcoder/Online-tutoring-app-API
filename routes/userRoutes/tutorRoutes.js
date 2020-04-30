const express = require('express');
const controller = require('../../controllers/userControllers/tutorController')

var router = express.Router();

router.post('/signup',controller.signUpTutor)

module.exports = router