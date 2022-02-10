var emailValidator = require("email-validator")

signupValidation = () =>{

  return (req, res, next) => {

    if(!req.body.username){
      res.status(400)
      res.json({error: "invalid details!", error_description: "user name is required!"})
      return
    }
    else if(typeof (req.body["username"]) !== "string"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "user name must be string!"})
      return
    }

    if(!req.body.email){
      res.status(400)
      res.json({error: "invalid details!", error_description: "email is required!"})
      return
    }
    else if(typeof (req.body["email"]) !== "string"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "email must be string!"})
      return
    }
    else if(!emailValidator.validate(req.body.email)){
      res.status(400)
      res.json({error: "invalid details!", error_description: "Invalid email!"})
      return
    }

    if(!req.body.phonenumber){
      res.status(400)
      res.json({error: "invalid details!", error_description: "phone number is required!"})
      return            
    }
    else if(typeof (req.body["phonenumber"]) !== "number"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "phone number must be a number!"})
      return
    }

    if(!req.body.userclass){
      res.status(400)
      res.json({error: "invalid details!", error_description: "class is required!"})
      return
    }

    if(!req.body.userboard){
      res.status(400)
      res.json({error: "invalid details!", error_description: "board is required!"})
      return
    }
    next()
  }
}

getotpValidation = () =>{
  return (req, res, next) =>{
    req.params.phonenumber = parseInt(req.params.phonenumber)
    if (!req.params.phonenumber) {
      res.status(400)
      res.json({ error: 'invalid_details!', error_description: "Phone number is required!" })
      return
  }
  else if(typeof (req.params["phonenumber"]) !== "number"){
    res.status(400)
    res.json({error: "invalid details!", error_description: "phone number must be a number!"})
    return
  }

  next()
  }
}

checkotpValidation = () =>{
  return (req, res, next) =>{
    if (!req.body.otp) {
      res.status(400)
      res.json({ error: 'invalid_details!', error_description: "otp required!" })
      return
  }
  else if(typeof (req.body["otp"]) !== "number"){
    res.status(400)
    res.json({error: "invalid details!", error_description: "otp must be a number!"})
    return
  }
  next()
  }
}

module.exports ={
  signupValidation,
  checkotpValidation,
  getotpValidation 
}