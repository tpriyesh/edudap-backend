var express = require('express')
var router = express.Router()

var login =require('./controllers/login')

router.use('/login', login)

module.exports = router

