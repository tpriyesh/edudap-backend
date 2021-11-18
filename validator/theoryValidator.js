createtheoryValidation = ()=>{
    return (req, res, next) => {
        if (!req.body.board) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "Board is required." })
            return
        }
        if (!req.body.class) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "Class is required." })
            return
        }

        if (!req.body.theoryname) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "theory name is required." })
            return
        }
        else if(typeof (req.body["theoryname"]) !== "string"){
            res.status(400)
            res.json({error: "invalid details!", error_description: "theory name must be string!"})
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
        if (!req.body.isFree) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "isFree field is required." })
            return
        }
    else if(typeof (req.body["isFree"]) !== "boolean"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "isFree must be boolean!"})
        return
      }

    next()
}
}
deletetheoryValidation = ()=>{
    return (req, res, next) => {
        if (!req.params.theoryname) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "theory name is required." })
            return
        }
    else if(typeof (req.params["theoryname"]) !== "string"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "theory name must be string!"})
        return
      }

    next()
}
}
module.exports = {
    createtheoryValidation,
    deletetheoryValidation
}