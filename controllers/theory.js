
var express = require('express')
var router = express.Router()
var theoryModel = require('../models/theoryModel')
var theoryValidation = require('../validator/theoryValidator')
var ensureToken = require('../utils/jwttoken')


router.post('/createtheory', ensureToken, theoryValidation.createtheoryValidation(), async (req, res) =>{
    let data ={}
        data.class = req.body.class
        data.board = req.body.board
        data.subject = req.body.subject
        data.theoryname = req.body.theoryname
        data.theorymetadata = req.body.theorymetadata
        data.isFree = req.body.isFree
        data.description = req.body.description
        data.createdDate = new Date().getTime()
        data.lastupdateddate = new Date().getTime()

        theoryModel.createtheory(data,(error,result)=>{
        if(!result){
            res.json({ error: 'Adding theory is failed', error_description: error })
            return
        }
            res.json({ message: 'theory created successful'})
    })

})

router.get('/listalltheory', ensureToken, async (req, res) =>{
    theoryModel.listtheory((result)=>{
        if(!result){
            res.json({ error: 'theory data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listalltheorybyclass/:classId', ensureToken, async (req, res) =>{
    theoryModel.listtheorybyclass(req.params.classId,(result)=>{
        if(!result){
            res.json({ error: 'theory data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listalltheorybyboard/:boardId', ensureToken, async (req, res) =>{
    theoryModel.listtheorybyclass(req.params.boardId,(result)=>{
        if(!result){
            res.json({ error: 'theory data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listalltheorybysubject/:subjectId', ensureToken, async (req, res) =>{
    theoryModel.listtheorybyclass(req.params.subjectId,(result)=>{
        if(!result){
            res.json({ error: 'theory data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listallfreetheory', ensureToken, async (req, res) =>{
    theoryModel.listfreetheory((result)=>{
        if(!result){
            res.json({ error: 'theory data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.delete('/deletetheory/:theoryname', ensureToken, async (req, res) =>{
    if (!req.body.theoryname) {
        res.json({ error: 'invalid_details', error_description: "theory name is required." })
        return
    }
    theoryModel.deletetheory(req.params.theoryname,(error,result)=>{
        if(!result){
            res.json({ error: 'Deleting theory is failed', error_description: error })
            return
        }
            res.json({ message: 'theory deleted successful!'})
    })
})

module.exports = router