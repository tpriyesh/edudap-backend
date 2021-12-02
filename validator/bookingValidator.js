createbookingValidation = ()=>{
    return (req, res, next) => {
        if (!req.body.student) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "student is required." })
            return
        }
        if (!req.body.teacher) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "teacher is required." })
            return
        }

        if (!req.body.date) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "booking date is required." })
            return
        }
        else if(typeof (req.body["date"]) !== "string"){
            res.status(400)
            res.json({error: "invalid details!", error_description: "booking date must be string!"})
            return
          }

          if (!req.body.time) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "time is required." })
            return
        }
        else if(typeof (req.body["time"]) !== "string"){
            res.status(400)
            res.json({error: "invalid details!", error_description: "time must be string!"})
            return
          }

    next()
}
}
module.exports = {
    createbookingValidation
}