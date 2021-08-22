var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String },
    email: { type: String },
    phonenumber: { type: Number },
    puchasedexperiments: { type: Array}
})

const userModel = mongoose.model('user', userSchema);

module.exports.signUp = (data1,callback)=> {
    let usr = new userModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.findUser = async(phonenumber1,callback)=> {
    await userModel.findOne({phonenumber: phonenumber1},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listUser = async(callback)=> {
    await userModel.find({},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.addexperiment = async(id,callback)=> {
    await userModel.puchasedexperiments.push(id,(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listauser = async(id,callback)=> {
    await userModel.find({_id:id},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
