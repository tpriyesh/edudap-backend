var express = require('express')
var router = express.Router()
var boardModel = require('../models/boardModel')
var boardValidation = require('../validator/boardValidator')

router.post('/createboard', boardValidation.createboardValidation(), async (req, res) =>{
    let data ={}
        data.boardname = req.body.boardname
        data.isActive = req.body.isActive
        data.createdDate = new Date().getTime()

       var result = await boardModel.createBoard(data)
        if(!result){
            res.json({ error: 'Adding board is failed!', error_description: error })
            return
        }
            res.json({ message: 'Board created successful!'})

})

router.get('/listallboard', async (req, res) =>{
   var result = await boardModel.listBoard(result)
        if(!result){
            res.json({ error: 'no data!', error_description: "board data empty!" })
            return
        }
        res.json(result)
})

router.delete('/deleteboard/:boardname',boardValidation.deleteboardValidation(), async (req, res) =>{
    boardModel.deleteBoard(req.params.boardname,(result)=>{
        if(!result){
            res.json({ error: 'Deleting board is failed!', error_description: "board not found!" })
            return
        }
            res.json({ message: 'board deleted successful!'})
    })
})

module.exports = router