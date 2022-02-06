
createqueryValidation = () =>{

    return (req, res, next) => {
  
      if(!req.body.user){
        res.status(400)
        res.json({error: "invalid details!", error_description: "user is required!"})
        return
      }
      if(!req.body.text){
        res.status(400)
        res.json({error: "invalid details!", error_description: "text is required!"})
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
  
createqueryreplyValidation = () =>{

    return (req, res, next) => {
  
      if(!req.body.user){
        res.status(400)
        res.json({error: "invalid details!", error_description: "user is required!"})
        return
      }
      if(!req.body.text){
        res.status(400)
        res.json({error: "invalid details!", error_description: "text is required!"})
        return
      }
      if(!req.body.reply){
        res.status(400)
        res.json({error: "invalid details!", error_description: "reply is required!"})
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

  deletequeryValidation = () =>{
    return (req, res, next) =>{
      if (!req.params.queryname) {
        res.status(400)
        res.json({ error: 'invalid_details!', error_description: "query name is required!" })
        return
    }
    else if(typeof (req.params["queryname"]) !== "string"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "query name must be a string!"})
      return
    }
  
    next()
    }
  }
  
  
  module.exports ={
    createqueryValidation,
    createqueryreplyValidation,
    deletequeryValidation,
  }