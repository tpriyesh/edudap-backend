var express = require('express')
var router = express.Router()
var boardModel = require('../models/boardModel')

router.post('/createboard', async (req, res) =>{
    if (!req.body.boardname) {
        res.json({ error: 'invalid_details', error_description: "Board name is required." })
        return
    }
    if (!req.body.isActive) {
        res.json({ error: 'invalid_details', error_description: "isActive field is required." })
        return
    }

    let data ={}
        data.boardname = req.body.boardname
        data.isActive = req.body.isActive
        data.createdDate = new Date().getTime()

        boardModel.createBoard(data,(error,result)=>{
        if(!result){
            res.json({ error: 'Adding board is failed', error_description: error })
            return
        }
            res.json({ message: 'board created successful'})
    })

})

router.post('/listallboard', async (req, res) =>{
    boardModel.listBoard((result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'Board data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/deleteboard', async (req, res) =>{
    if (!req.body.boardname) {
        res.json({ error: 'invalid_details', error_description: "board name is required." })
        return
    }
    boardModel.createBoard(boardname,(error,result)=>{
        if(!result){
            res.json({ error: 'Deleting board is failed', error_description: error })
            return
        }
            res.json({ message: 'board deleted successful!'})
    })
})

module.exports = router