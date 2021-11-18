createsubjectValidation = ()=>{
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

        if (!req.body.subjectname) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "subject name is required." })
            return
        }
        else if(typeof (req.body["subjectname"]) !== "string"){
            res.status(400)
            res.json({error: "invalid details!", error_description: "subject name must be string!"})
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
        if (!req.body.isActive) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "isActive field is required." })
            return
        }
    else if(typeof (req.body["isActive"]) !== "boolean"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "isActive must be boolean!"})
        return
      }

    next()
}
}
deletesubjectValidation = ()=>{
    return (req, res, next) => {
        if (!req.params.subjectname) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "subject name is required." })
            return
        }
    else if(typeof (req.params["subjectname"]) !== "string"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "subject name must be string!"})
        return
      }

    next()
}
}
module.exports = {
    createsubjectValidation,
    deletesubjectValidation
}