var express = require('express')
var router = express.Router()
var classModel = require('../models/classModel')

router.post('/createclass', async (req, res) =>{
    if (!req.body.boardId) {
        res.json({ error: 'invalid_details', error_description: "Board Id is required." })
        return
    }
    if (!req.body.classname) {
        res.json({ error: 'invalid_details', error_description: "class name is required." })
        return
    }
    if (!req.body.isActive) {
        res.json({ error: 'invalid_details', error_description: "isActive field is required." })
        return
    }

    let data ={}
        data.boardId = req.body.boardId
        data.classname = req.body.classname
        data.isActive = req.body.isActive
        data.createdDate = new Date().getTime()

        classModel.createclass(data,(error,result)=>{
        if(!result){
            res.json({ error: 'Adding class is failed', error_description: error })
            return
        }
            res.json({ message: 'class created successful'})
    })

})

router.post('/listallclass', async (req, res) =>{
    classModel.listclassbyboard(req.params.boardId,(result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'class data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/listclassbyboard', async (req, res) =>{
    classModel.listclass((result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'class data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})
router.post('/deleteclass', async (req, res) =>{
    if (!req.body.classname) {
        res.json({ error: 'invalid_details', error_description: "class name is required." })
        return
    }
    classModel.createclass(classname,(error,result)=>{
        if(!result){
            res.json({ error: 'Deleting class is failed', error_description: error })
            return
        }
            res.json({ message: 'class deleted successful!'})
    })
})

module.exports = router