var express = require('express')
var router = express.Router()
var teacherModel = require('../models/teacherModel')
var teacherValidation = require('../validator/teacherValidator')
var ensureToken = require('../utils/jwttoken')

router.post('/teachersignup',ensureToken, teacherValidation.teachersignupValidation(), async (req, res) =>{
    let data ={}
        data.teachername = req.body.teachername
        data.board = req.body.board
        data.class = req.body.class
        data.subject = req.body.subject
        data.isActive = req.body.isActive
        data.createdDate = new Date().getTime()

       var result = await teacherModel.teachersignup(data)
        if(!result){
            res.json({ error: 'Teacher signup is failed!', error_description: error })
            return
        }
            res.json({ message: 'teacher signup successful!'})

})

router.get('/listallteacher', async (req, res) =>{
   var result = await teacherModel.listteacher()
        if(!result){
            res.json({ error: 'no data!', error_description: "teacher data empty!" })
            return
        }
        res.json(result)
})

router.get('/listteachersbyboard/:boardId', async (req, res) =>{
    var result = await teacherModel.listteachersbyboard(req.params.boardId)
         if(!result){
             res.json({ error: 'no data!', error_description: "teacher data empty!" })
             return
         }
         res.json(result)
 })

 router.get('/listteachersbyclass/:classId', async (req, res) =>{
    var result = await teacherModel.listteachersbyclass(req.params.classId)
         if(!result){
             res.json({ error: 'no data!', error_description: "teacher data empty!" })
             return
         }
         res.json(result)
 })

 router.get('/listteachersbysubject/:subjectId', async (req, res) =>{
    var result = await teacherModel.listteachersbysubject(req.params.subjectId)
         if(!result){
             res.json({ error: 'no data!', error_description: "teacher data empty!" })
             return
         }
         res.json(result)
 })

router.delete('/deleteteacher/:teachername', ensureToken, teacherValidation.deleteteacherValidation(), async (req, res) =>{
    teacherModel.deleteteacher(req.params.teachername,(result)=>{
        if(!result){
            res.json({ error: 'Deleting teacher is failed!', error_description: "teacher not found!" })
            return
        }
            res.json({ message: 'teacher deleted successful!'})
    })
})

module.exports = router