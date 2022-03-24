createorderValidation = ()=>{
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

        if (!req.body.user) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "user name is required." })
            return
        }
        
        if (!req.body.status) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "status is required." })
            return
        }

        if (!req.body.paymentinfo) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "paymentinfo is required." })
            return
        }

        if (!req.body.deliveryinfo) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "deliveryinfo is required." })
            return
        }

    next()
}
}
deleteorderValidation = ()=>{
    return (req, res, next) => {
        if (!req.params.ordername) {
            res.status(400)
            res.json({ error: 'invalid_details', error_description: "order name is required." })
            return
        }
    else if(typeof (req.params["ordername"]) !== "string"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "order name must be string!"})
        return
      }

    next()
}
}
module.exports = {
    createorderValidation,
    deleteorderValidation
}