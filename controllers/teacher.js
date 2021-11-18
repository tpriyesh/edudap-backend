var express = require('express')
var router = express.Router()
var teachermodel = require('../models/teacherModel')
var experimentModel = require('../models/experimentModel')

router.get('/listateacher/:teacherid', async(req, res) =>{  
    var result = await teachermodel.listateacher(req.params.teacherid)
        if(result == null){
            res.status(400)
            res.json({ error: 'No data!', error_description: "teacher data not available!" })
            return
        }
        res.json(result)

})

router.get('/listallteachers', async (req, res) =>{
    var result = await teachermodel.listallteachers()
        if(result.length == 0){
            res.status(400)
            res.json({ error: 'No data!', error_description: "teacher data not available!" })
            return
        }
        res.json(result)
})

router.post('/addexperiment', async (req, res) =>{
            await teachermodel.addexperiments(req.body.teacherid, req.body.experimentid,(result)=>{
                if(!result){
                    res.json({ error: 'Purchased experiment not added !', error_description: "Purchased experiments not added!" })
                    return
                }
                res.json(result)
            })
        })

router.get('/listteacherexperiments/:teacherid', (req, res) =>{
   teachermodel.listateacher(req.params.teacherid,async (result)=>{
    if(result.length == 0){
    res.status(400)
    res.json({ error: 'No data!', error_description: "teacher data not available!" })
    return
    }
    if(!result[0].purchaseditems){
    res.status(400)
    res.json({ error: 'No purchased experiments!', error_description: "teacher has not purchased any experiments!" })
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