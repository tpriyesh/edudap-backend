createclassValidation = ()=>{
    return (req, res, next) => {
        if (!req.body.board) {
            res.json({ error: 'invalid_details', error_description: "Board is required." })
            return
        }
        else if(typeof (req.body["board"]) !== "string"){
            res.status(400)
            res.json({error: "invalid details!", error_description: "board must be string!"})
            return
          }

        if (!req.body.classname) {
            res.json({ error: 'invalid_details', error_description: "class name is required." })
            return
        }
        else if(typeof (req.body["classname"]) !== "string"){
            res.status(400)
            res.json({error: "invalid details!", error_description: "class name must be string!"})
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
deleteclassValidation = ()=>{
    return (req, res, next) => {
        if (!req.params.classname) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "classname is required." })
            return
        }
    else if(typeof (req.params["classname"]) !== "string"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "classname must be string!"})
        return
      }

    next()
}
}
module.exports = {
    createclassValidation,
    deleteclassValidation
}