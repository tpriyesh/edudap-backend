createexperimentValidation = ()=>{
    return (req, res, next) => {
        if (!req.body.experimentname) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "experiment name is required!" })
            return
        }
        else if(typeof (req.body["experimentname"]) !== "string"){
            res.status(400)
            res.json({error: "invalid details!", error_description: "experiment name must be string!"})
            return
          }

        if (!req.body.description) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "description is required." })
            return
        }
        else if(typeof (req.body["description"]) !== "string"){
            res.status(400)
            res.json({error: "invalid details!", error_description: "description must be string!"})
            return
          }

    next()
}
}
deleteexperimentValidation = ()=>{
    return (req, res, next) => {
        if (!req.params.experimentname) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "experimentname is required." })
            return
        }
    else if(typeof (req.params["experimentname"]) !== "string"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "experimentname must be string!"})
        return
      }

    next()
}
}
module.exports = {
    createexperimentValidation,
    deleteexperimentValidation
}