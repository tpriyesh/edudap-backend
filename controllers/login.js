var express = require('express')
var router = express.Router()
var usermodel = require('../models/userModel')
var validatelogin = require('../validator/loginValidator')
var jwt = require("jsonwebtoken")

router.post('/signup', validatelogin.signupValidation(), async (req, res) =>{
    let data ={}
        data.username = req.body.username
        data.email = req.body.email
        data.phonenumber = req.body.phonenumber

    let dat = {}
        dat.userclass = req.body.userclass
        dat.userboard = req.body.userboard
        dat.issubscriptionactive = req.body.issubscriptionactive
        dat.purchaseditems = req.body.purchaseditems

        var otp = await usermodel.sendotp(data.phonenumber)
        if(otp != 1234){
            res.json({ error: 'incorrect otp!', error_description: "" })
            return
        }

    var result = await usermodel.signUp(data,dat)
        if(!result){
            res.json({ error: 'signup failed!', error_description: error })
            return
        }
            res.json({ message: 'signup successful!'})

})

router.get('/getotp/:phonenumber', validatelogin.getotpValidation(), async (req, res) =>{
    var result = await usermodel.findUser(req.params.phonenumber)
        if(!result){
            res.json({ error: 'User not registered!', error_description: "User not found!" })
            return
        }

        res.json({ message: 'Function for sending otp proccesssing!'})
})

router.post('/checkotp', validatelogin.checkotpValidation(), async (req, res) =>{
   if(req.body.otp !== 1234){
    res.json({ error: 'invalid otp', error_description: "Otp mismatch!" })
    return
   }

   var result = await usermodel.findUser(req.params.phonenumber)
   let data = {
       _id: result._id,
       username: result.username
   }
   let token = jwt.sign(data,"edu_secret_key",{expiresIn: 86400})
   res.json({ message: 'login successful!', token: token})
})

module.exports = router