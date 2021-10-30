
createboardValidation = ()=>{
    return (req, res, next) => {
        
    if (!req.body.boardname) {
        res.status(400)
        res.json({ error: 'invalid_details', error_description: "Board name is required." })
        return
    }
    else if(typeof (req.body["boardname"]) !== "string"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "board name must be string!"})
        return
      }
  
    if (!req.body.isActive) {
        res.status(400)
        res.json({ error: 'invalid_details', error_description: "isActive field is required." })
        return
    }

    next()
}
}

deleteboardValidation = ()=>{
    return (req, res, next) => {
    if (!req.params.boardname) {
        res.status(400)
        res.json({ error: 'invalid_details', error_description: "Board name is required." })
        return
    }
    else if(typeof (req.params["boardname"]) !== "string"){
        res.status(400)
        res.json({error: "invalid details!", error_description: "board name must be string!"})
        return
      }

    next()
}
}

module.exports = {
    createboardValidation,
    deleteboardValidation
}