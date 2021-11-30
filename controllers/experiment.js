
var express = require('express')
var router = express.Router()
var experimentModel = require('../models/experimentModel')
var experimentValidator = require('../validator/experimentValidator')
var ensureToken = require('../utils/jwttoken')

router.post('/createexperiment',ensureToken, experimentValidator.createexperimentValidation(), async (req, res) =>{
    let data ={}
        data.class = req.body.class
        data.board = req.body.board
        data.subject = req.body.subject
        data.experimentname = req.body.experimentname
        data.isFree = req.body.isFree
        data.description = req.body.description
        data.experimentvideourl = req.body.experimentvideourl
        data.experimentimage = req.body.experimentimage
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

router.get('/listallexperiment', ensureToken, async (req, res) =>{
    experimentModel.listexperiment((result)=>{
        if(!result){
            res.json({ error: 'experiment data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listallexperimentbyclass/:classId', ensureToken, async (req, res) =>{
    experimentModel.listexperimentbycalss(req.params.classId,(result)=>{
        if(!result){
            res.json({ error: 'experiment data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listallexperimentbysubject/:subjectId', ensureToken, async (req, res) =>{
    experimentModel.listexperimentbysubject(req.params.subjectId,(result)=>{
        if(!result){
            res.json({ error: 'experiment data empty!', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listallfreeexperiments', ensureToken, async (req, res) =>{
    experimentModel.listfreeexperiment(result=>{
        if(!result){
            res.json({ error: 'experiment data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.delete('/deleteexperiment/:experimentname', ensureToken, deleteexperimentValidation(), async (req, res) =>{
    experimentModel.deleteexperiment(req.params.experimentname,(result)=>{
        if(!result){
            res.json({ error: 'Deleting experiment is failed', error_description: "experiments not found!" })
            return
        }
            res.json({ message: 'experiment deleted successful!'})
    })
})

module.exports = router