var express = require('express')
var router = express.Router()
var subjectModel = require('../models/subjectModel')

router.post('/createsubject', async (req, res) =>{
    if (!req.body.boardId) {
        res.json({ error: 'invalid_details', error_description: "Board Id is required." })
        return
    }
    if (!req.body.subjectname) {
        res.json({ error: 'invalid_details', error_description: "subject name is required." })
        return
    }
    if (!req.body.isActive) {
        res.json({ error: 'invalid_details', error_description: "isActive field is required." })
        return
    }

    let data ={}
        data.boardId = req.body.boardId
        data.classId = req.body.classId
        data.subjectname = req.body.subjectname
        data.description = req.body.description
        data.isActive = req.body.isActive
        data.createdDate = new Date().getTime()

        subjectModel.createsubject(data,(error,result)=>{
        if(!result){
            res.json({ error: 'Adding subject is failed', error_description: error })
            return
        }
            res.json({ message: 'subject created successful'})
    })

})

router.post('/listallsubject', async (req, res) =>{
    subjectModel.listsubjectbyboard(req.params.boardId,(result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'subject data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/listsubjectbyboard', async (req, res) =>{
    subjectModel.listsubject((result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'subject data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})
router.post('/deletesubject', async (req, res) =>{
    if (!req.body.subjectname) {
        res.json({ error: 'invalid_details', error_description: "subject name is required." })
        return
    }
    subjectModel.createsubject(subjectname,(error,result)=>{
        if(!result){
            res.json({ error: 'Deleting subject is failed', error_description: error })
            return
        }
            res.json({ message: 'subject deleted successful!'})
    })
})

module.exports = router