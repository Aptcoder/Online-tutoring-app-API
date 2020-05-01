const express = require('express');
const controller = require('../controllers/subjectController')
const adminAuth = require('../controllers/authentication/adminAuth')

var router = express.Router();

router.post('/create',adminAuth,controller.createSubject)

module.exports = router