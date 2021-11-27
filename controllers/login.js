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
        dat.userclassid = req.body.userclassid
        dat.userboardid = req.body.userboardid
        dat.issubscriptionactive = req.body.issubscriptionactive
        dat.purchaseditems = req.body.purchaseditems

        console.log("Function for confirmation of phone number with otp!");

    var result = await usermodel.signUp(data,dat)
        if(!result){
            res.json({ error: 'signup failed!', error_description: error })
            return
        }
            res.json({ message: 'signup successful!'})

})

router.get('/register/getotp/:phonenumber', validatelogin.getotpValidation(), async (req, res) =>{
    res.json({ message: 'Function for sending otp proccesssing!', status: true})
})

router.get('/getotp/:phonenumber', validatelogin.getotpValidation(), async (req, res) =>{
    var result = await usermodel.findUser(req.params.phonenumber)
        if(!result){
            res.json({ error: 'User not registered!', error_description: "User not found!" })
            return
        }

        res.json({ message: 'Function for sending otp proccesssing!'})
})

router.post('/register/checkotp', validatelogin.checkotpValidation(), async (req, res) =>{
    if(req.body.otp !== 1234){
     res.json({ error: 'invalid otp', error_description: "Otp mismatch!" })
     return
    }
 
    res.json({ message: 'login successful!', status: true})
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