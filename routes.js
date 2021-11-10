var express = require('express')
var router = express.Router()
var loginValidator = require('./validator/loginValidator')

var login =require('./controllers/login')
var user =require('./controllers/user')
var experiment =require('./controllers/experiment')
var class1 = require('./controllers/class')
var board =require('./controllers/board')
var subject =require('./controllers/subject')
var theory =require('./controllers/theory')


router.use('/login', login)
router.use('/user', user)
router.use('/class', class1)
router.use('/board', board)
router.use('/subject', subject)
router.use('/experiment', experiment)
router.use('/theory', theory)

module.exports = router

