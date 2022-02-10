var express = require('express')
var router = express.Router()
var classModel = require('../models/classModel')
var classValidator = require('../validator/classValidator')
var ensureToken = require('../utils/jwttoken')

router.post('/createclass',ensureToken, classValidator.createclassValidation(), (req, res) =>{
    let data ={}
        data.board = req.body.board
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


router.post('/listclassbyclassId', async (req, res) =>{
    classModel.listclassbyclassid(req.body.boardId,req.body.classId,(result)=>{
        if(!result){
            res.json({ error: 'class data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listactiveclass/:boardId', async (req, res) =>{
    classModel.listactiveclass(req.params.boardId,(result)=>{
        if(!result){
            res.json({ error: 'class data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/switchclass', async (req, res) =>{
    classModel.listactiveclass(req.body.boardId,async (result)=>{
        console.log(req.body.boardId,result)
        if(!result){
            res.json({ error: 'class data empty', error_description: "" })
            return
        }
        let data ={}
        data.board = result.board._id.toString()
        data.classname = result.classname
        data.isActive = false
        data.createdDate = result.createdDate
        console.log(data,"dsdsdsdsd",result._id);
        var update1 = await classModel.updateisactive(result._id, data)
        res.json({update1})
        return
        classModel.listclassbyclassid(req.body.classId,data.boardId,(result1)=>{
            console.log(req.body.classId,result1)
            if(!result){
                res.json({ error: 'class data empty 1', error_description: "" })
                return
            }
            let data1 ={}
            data1.board = result1.board
            data1.classname = result1.classname
            data1.isActive = true
            data1.createdDate = result1.createdDate
            var update2 = classModel.updateisactive(result1._id, data1)
            res.json({result:result1})
        })
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
router.delete('/deleteclass/:classname', ensureToken, classValidator.deleteclassValidation(), async (req, res) =>{
    classModel.deleteclass(req.params.classname,(result)=>{
        if(!result){
            res.json({ error: 'Deleting class is failed', error_description: "" })
            return
        }
            res.json({ message: 'class deleted successful!'})
    })
})

module.exports = router