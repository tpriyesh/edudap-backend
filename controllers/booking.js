var express = require('express')
var router = express.Router()
var bookingModel = require('../models/bookingModel')
var bookingValidation = require('../validator/bookingValidator')
var ensureToken = require('../utils/jwttoken')

router.post('/createbooking',ensureToken, bookingValidation.createbookingValidation(), async (req, res) =>{

    let data ={}
        data.student = req.body.student
        data.teacher = req.body.teacher
        data.time = req.body.time
        data.date = req.body.date
        data.createdDate = new Date().getTime()

        bookingModel.createbooking(data,(error,result)=>{
        if(!result){
            res.json({ error: 'Adding booking is failed', error_description: error })
            return
        }
            res.json({ message: 'booking created successful'})
    })

})

router.get('/listbookingbyclass/:classId', ensureToken, async (req, res) =>{
    bookingModel.listbookingbyclass(req.params.classId,(result)=>{
        if(!result){
            res.json({ error: 'booking data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listallbooking', ensureToken, async (req, res) =>{
    bookingModel.listbooking((result)=>{
        if(!result){
            res.json({ error: 'booking data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})
router.delete('/deletebooking/:bookingname', ensureToken, bookingValidation.deletebookingValidation(), async(req, res) =>{
    bookingModel.deletebooking(req.params.bookingname,(result)=>{
        if(!result){
            res.json({ error: 'Deleting booking is failed', error_description: "booking not found!" })
            return
        }
            res.json({ message: 'booking deleted successful!'})
    })
})

module.exports = router