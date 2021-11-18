var express = require('express')
var router = express.Router()
var teachermodel = require('../models/teachersignupModel')
var validatelogin = require('../validator/teachersignupValidator')
var jwt = require("jsonwebtoken")

router.post('/teachersignup', validatelogin.signupValidation(), async (req, res) =>{
    let data ={}
        data.teachername = req.body.teachername
        data.email = req.body.email
        data.phonenumber = req.body.phonenumber

    let dat = {}
        dat.teacherclass = req.body.teacherclass
        dat.teacherboard = req.body.teacherboard
        dat.teachersubject = req.body.teachersubject
        
    var result = await teachermodel.signUp(data,dat)
    console.log(result);
        if(!result){
            res.json({ error: 'signup failed!', error_description: error })
            return
        }
            res.json({ message: 'signup successful!'})

})

router.get('/getotp/:phonenumber', validatelogin.getotpValidation(), async (req, res) =>{
    var result = await teachermodel.findteacher(req.params.phonenumber)
        if(!result){
            res.json({ error: 'teacher not registered!', error_description: "teacher not found!" })
            return
        }
        let data = {
            _id: result._id,
            teachername: result.teachername
        }
        let token = jwt.sign(data,"edu_secret_key",{expiresIn: 86400})

        res.json({ message: 'Function for sending otp proccesssing!', token: token})
})

router.post('/checkotp', validatelogin.checkotpValidation(), async (req, res) =>{
   if(req.body.otp !== 1234){
    res.json({ error: 'invalid otp', error_description: "Otp mismatch!" })
    return
   }
   res.json({ message: 'login successful!'})
})

module.exports = router