var express = require('express')
var router = express.Router()
var queryModel = require('../models/queryModel')
var queryValidation = require('../validator/queryValidator')
var ensureToken = require('../utils/jwttoken')

router.post('/createquery',ensureToken, queryValidation.createqueryValidation(), async (req, res) =>{
    let data ={}
        data.user = req.body.user
        data.text = req.body.text
        data.reply = req.body.reply
        data.board = req.body.board
        data.class = req.body.class
        data.subject = req.body.subject
        data.isActive = req.body.isActive
        data.createdDate = new Date().getTime()

       var result = await queryModel.createquery(data)
        if(!result){
            res.json({ error: 'creating query is failed!', error_description: error })
            return
        }
            res.json({ message: 'creating query successful!'})

})

router.post('/createqueryreply',ensureToken, queryValidation.createqueryreplyValidation(), async (req, res) =>{
    let data ={}
        queryid = req.body.queryid
        data.user = req.body.user
        data.text = req.body.text
        data.reply = req.body.reply
        data.board = req.body.board
        data.class = req.body.class
        data.subject = req.body.subject
        data.isActive = req.body.isActive
        data.createdDate = new Date().getTime()
       var result = await queryModel.createqueryreply(queryid, data)
        if(!result){
            res.json({ error: 'creating query reply is failed!', error_description: "" })
            return
        }
            res.json({ message: 'creating query reply successful!'})

})

router.get('/listallquery', async (req, res) =>{
   var result = await queryModel.listquery()
        if(!result){
            res.json({ error: 'no data!', error_description: "query data empty!" })
            return
        }
        res.json(result)
})


 router.get('/listquerybysubject/:subjectId', async (req, res) =>{
    var result = await queryModel.listquerysbysubject(req.params.subjectId)
         if(!result){
             res.json({ error: 'no data!', error_description: "query data empty!" })
             return
         }
         res.json(result)
 })

router.delete('/deletequery/:queryid', ensureToken, queryValidation.deletequeryValidation(), async (req, res) =>{
    queryModel.deletequery(req.params.queryid,(result)=>{
        if(!result){
            res.json({ error: 'Deleting query is failed!', error_description: "query not found!" })
            return
        }
            res.json({ message: 'query deleted successful!'})
    })
})

module.exports = router