var express = require('express')
var router = express.Router()
var usermodel = require('../models/user')

router.post('/signup', async (req, res) =>{
    if (!req.body.username) {
        res.json({ error: 'invalid_details', error_description: "User name is required." })
        return
    }
    if (!req.body.email) {
        res.json({ error: 'invalid_details', error_description: "Email id is required." })
        return
    }
    if (!req.body.phonenumber) {
        res.json({ error: 'invalid_details', error_description: "Phone number is required." })
        return
    }
    let data ={}
        data.username = req.body.username
        data.email = req.body.email
        data.phonenumber = req.body.phonenumber
    usermodel.signUp(data,(error,result)=>{
        if(!result){
            res.json({ error: 'signup failed', error_description: error })
            return
        }
            res.json({ message: 'signup successful'})
    })

})

router.post('/getotp', async (req, res) =>{
    if (!req.body.phonenumber) {
        res.json({ error: 'invalid_details', error_description: "Phone number is required." })
        return
    }

    usermodel.findUser(req.body.phonenumber,(result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'User not registered!', error_description: "" })
            return
        }
        res.json({ message: 'Function for sending otp proccesssing!'})
    })

})

router.post('/checkotp', async (req, res) =>{
    if (!req.body.otp) {
        res.json({ error: 'invalid_details', error_description: "Otp feild is required." })
        return
    }
   if(req.body.otp !== 1234){
    res.json({ error: 'invalid otp', error_description: "Otp mismatch." })
    return
   }
   res.json({ message: 'login successful!'})
})

module.exports = router