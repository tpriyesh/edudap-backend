var express = require('express')
var router = express.Router()
var usermodel = require('../models/userModel')
var validatelogin = require('../validator/loginValidator')

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
        
    var result = await usermodel.signUp(data,dat)
    console.log(result);
        if(!result){
            res.json({ error: 'signup failed!', error_description: error })
            return
        }
            res.json({ message: 'signup successful!'})

})

router.post('/getotp', validatelogin.getotpValidation(), async (req, res) =>{
    var result = await usermodel.findUser(req.body.phonenumber)
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
   res.json({ message: 'login successful!'})
})

module.exports = router