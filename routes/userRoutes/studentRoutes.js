const express = require('express');
const controller = require('../../controllers/userControllers/studentController')

var router = express.Router();

router.post('/signup',controller.signUpStudent)

module.exports = router