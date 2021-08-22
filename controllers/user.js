var express = require('express')
var router = express.Router()
var usermodel = require('../models/userModel')
var experimentModel = require('../models/experimentModel')

router.post('/listauser', async (req, res) =>{
    usermodel.listauser((result)=>{
        if(!result){
            res.json({ error: 'User data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/listallusers', async (req, res) =>{
    usermodel.listallusers((result)=>{
        if(!result){
            res.json({ error: 'User data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/addexperiment', async (req, res) =>{
    usermodel.addexperiments(req.body.experiment_id, (result)=>{
        console.log(result);
        if(!result){
            res.json({ error: 'User data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/listuserexperiments', async (req, res) =>{
    usermodel.listauser((result)=>{
        if(!result){
            res.json({ error: 'User data empty', error_description: "" })
            return
        }
        result.puchasedexperiments.map(exp=>{
            experimentModel.listexperimentbyid(exp._id,(result)=>{
                if(!result){
                    res.json({ error: 'User data empty', error_description: "" })
                    return
                }
                res.json({result})
            })
        })
    })
})

module.exports = router