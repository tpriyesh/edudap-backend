var express = require('express')
var router = express.Router()
var subjectModel = require('../models/subjectModel')
var subjectValidation = require('../validator/subjectValidator')

router.post('/createsubject', subjectValidation.createsubjectValidation(), async (req, res) =>{

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

router.get('/listsubjectbyclass/:classId', async (req, res) =>{
    subjectModel.listsubjectbyclass(req.params.classId,(result)=>{
        if(!result){
            res.json({ error: 'subject data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listallsubject', async (req, res) =>{
    subjectModel.listsubject((result)=>{
        if(!result){
            res.json({ error: 'subject data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})
router.delete('/deletesubject/:subjectname',subjectValidation.deletesubjectValidation(), async(req, res) =>{
    subjectModel.deletesubject(req.params.subjectname,(result)=>{
        if(!result){
            res.json({ error: 'Deleting subject is failed', error_description: "subject not found!" })
            return
        }
            res.json({ message: 'subject deleted successful!'})
    })
})

module.exports = router