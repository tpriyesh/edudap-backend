
teachersignupValidation = () =>{

  return (req, res, next) => {

    if(!req.body.teachername){
      res.status(400)
      res.json({error: "invalid details!", error_description: "teacher name is required!"})
      return
    }
    else if(typeof (req.body["teachername"]) !== "string"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "teacher name must be string!"})
      return
    }

    if(!req.body.board){
      res.status(400)
      res.json({error: "invalid details!", error_description: "board is required!"})
      return
    }

    if(!req.body.class){
      res.status(400)
      res.json({error: "invalid details!", error_description: "class is required!"})
      return            
    }

    if(!req.body.subject){
        res.status(400)
        res.json({error: "invalid details!", error_description: "subject is required!"})
        return
      }
    next()
  }
}

deleteteacherValidation = () =>{
  return (req, res, next) =>{
    if (!req.params.teachername) {
      res.status(400)
      res.json({ error: 'invalid_details!', error_description: "teacher name is required!" })
      return
  }
  else if(typeof (req.params["teachername"]) !== "string"){
    res.status(400)
    res.json({error: "invalid details!", error_description: "teacher name must be a string!"})
    return
  }

  next()
  }
}

module.exports ={
  teachersignupValidation,
  deleteteacherValidation,
}