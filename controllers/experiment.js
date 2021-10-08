
var express = require('express')
var router = express.Router()
var experimentModel = require('../models/experimentModel')

router.post('/createexperiment', async (req, res) =>{
    if (!req.body.experimentname) {
        res.json({ error: 'invalid_details', error_description: "experiment name is required." })
        return
    }
    if (!req.body.classId) {
        res.json({ error: 'invalid_details', error_description: "classId is required." })
        return
    }

    let data ={}
        data.classId = req.body.classId
        data.boardId = req.body.boardId
        data.subjectId = req.body.subjectId
        data.experimentname = req.body.experimentname
        data.isFree = req.body.isFree
        data.description = req.body.description
        data.createdDate = new Date().getTime()
        data.lastupdateddate = new Date().getTime()

        experimentModel.createexperiment(data,(error,result)=>{
        if(!result){
            res.json({ error: 'Adding experiment is failed', error_description: error })
            return
        }
            res.json({ message: 'experiment created successful'})
    })

})

router.post('/listallexperiment', async (req, res) =>{
    experimentModel.listexperiment((result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'experiment data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/listallexperimentbyclass', async (req, res) =>{
    experimentModel.listexperiment(req.params.classId,(result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'experiment data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/listallfreeexperiments', async (req, res) =>{
    experimentModel.listexperiment(req.body.classId,req.body.isFree,(result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'experiment data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/deleteexperiment', async (req, res) =>{
    if (!req.body.experimentname) {
        res.json({ error: 'invalid_details', error_description: "experiment name is required." })
        return
    }
    experimentModel.createexperiment(experimentname,(error,result)=>{
        if(!result){
            res.json({ error: 'Deleting experiment is failed', error_description: error })
            return
        }
            res.json({ message: 'experiment deleted successful!'})
    })
})

module.exports = router