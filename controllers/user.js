var express = require('express')
var router = express.Router()
var usermodel = require('../models/userModel')
var experimentModel = require('../models/experimentModel')

router.get('/listauser/:userid', async (req, res) =>{
    var result = await usermodel.listauser(req.params.userid)
        if(result.length == 0){
            res.status(400)
            res.json({ error: 'No data!', error_description: "User data not available!" })
            return
        }
        res.json(result)

})

router.get('/listallusers', async (req, res) =>{
    var result = await usermodel.listallusers()
        if(result.length == 0){
            res.status(400)
            res.json({ error: 'No data!', error_description: "User data not available!" })
            return
        }
        res.json(result)
})

router.post('/addexperiment', async (req, res) =>{
            await usermodel.addexperiments(req.body.userid, req.body.experimentid,(result)=>{
                if(!result){
                    res.json({ error: 'Purchased experiment not added !', error_description: "Purchased experiments not added!" })
                    return
                }
                res.json(result)
            })
        })

router.get('/listuserexperiments/:userid', (req, res) =>{
   usermodel.listauser(req.params.userid,async (result)=>{
    if(result.length == 0){
    res.status(400)
    res.json({ error: 'No data!', error_description: "User data not available!" })
    return
    }
    if(!result[0].purchaseditems){
    res.status(400)
    res.json({ error: 'No purchased experiments!', error_description: "User has not purchased any experiments!" })
    return
}
var resu = []
        for(var i=0;i<result[0].purchaseditems.length;i++){
          var data=  await experimentModel.listexperimentbyid(result[0].purchaseditems[i])
          resu.push(data[0])
            }
            console.log(resu);  
    res.json(resu)
})
})

module.exports = router