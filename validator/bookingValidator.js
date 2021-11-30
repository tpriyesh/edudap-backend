createbookingValidation = ()=>{
    return (req, res, next) => {
        if (!req.body.student) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "Board is required." })
            return
        }
        if (!req.body.teacher) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "Class is required." })
            return
        }

        if (!req.body.date) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "booking name is required." })
            return
        }
        else if(typeof (req.body["date"]) !== "string"){
            res.status(400)
            res.json({error: "invalid details!", error_description: "booking date must be string!"})
            return
          }

          if (!req.body.time) {
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
deletebookingValidation = ()=>{
    return (req, res, next) => {
        if (!req.params.bookingname) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "booking name is required." })
            return
        }
    else if(typeof (req.params["bookingname"]) !== "string"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "booking name must be string!"})
        return
      }

    next()
}
}
module.exports = {
    createbookingValidation,
    deletebookingValidation
}