var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String },
    email: { type: String },
    phonenumber: { type: Number }

})

var usermoreSchema = new Schema({
    userid: {type: mongoose.Schema.Types.ObjectId},
    userboardid: { type: String},
    userclassid: { type: String},
    issubscriptionactive: { type: Boolean},
    purchaseditems: {type: Array}
})

const userModel = mongoose.model('user', userSchema);
const usermoreModel = mongoose.model('usermore', usermoreSchema);

module.exports.signUp = (data1,data2,callback)=> {
    try{
        let usr = new userModel(data1)
        usr.save((error, data) =>{
        data2.userid = data._id
        let user1 = new usermoreModel(data2)
        user1.save((error, data) => { callback(error, data) })
        })
    }
 catch(e){
     return []
 }
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
