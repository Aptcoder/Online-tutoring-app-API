const express = require('express');
const controller = require('../controllers/subjectController')
const adminAuth = require('../controllers/authentication/adminAuth')
const  generalAuth = require('../controllers/authentication/generalAuth')

var router = express.Router();

router.post('/create',adminAuth,controller.createSubject)

router.get('/',generalAuth,controller.getSubByName)

module.exports = router