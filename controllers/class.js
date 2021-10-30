var express = require('express')
var router = express.Router()
var classModel = require('../models/classModel')
var classValidator = require('../validator/classValidator')

router.post('/createclass', classValidator.createclassValidation(), (req, res) =>{
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

router.get('/listclassbyboard/:boardId', async (req, res) =>{
    classModel.listclassbyboard(req.params.boardId,(result)=>{
        if(!result){
            res.json({ error: 'class data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listallclass', async (req, res) =>{
    classModel.listclass((result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'class data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})
router.delete('/deleteclass/:classname',classValidator.deleteclassValidation(), async (req, res) =>{
    classModel.deleteclass(req.params.classname,(result)=>{
        if(!result){
            res.json({ error: 'Deleting class is failed', error_description: "" })
            return
        }
            res.json({ message: 'class deleted successful!'})
    })
})

module.exports = router