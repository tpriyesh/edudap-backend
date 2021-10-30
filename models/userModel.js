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

module.exports.signUp = async(data1,data2)=> {
    try{
        let usr = new userModel(data1)
        var data = await usr.save()
        data2.userid = data._id
        let user1 = new usermoreModel(data2)
        var dat = await user1.save()
        return dat
    }
 catch(e){
     return []
 }
}

module.exports.findUser = async(phonenumber1)=> {
    try{
        var data = await userModel.findOne({phonenumber: phonenumber1})
        return data
    } catch(e){
        return []
    }
}

module.exports.listallusers = async()=> {
    try{
        var data = await userModel.find({})
        return data
    }catch(e){
        return []
    }
}

module.exports.addexperiments = (id, items,callback)=>{
        usermoreModel.findByIdAndUpdate(id,{$addToSet:{purchaseditems:items}},(error,data)=>{
            if(error){
                 callback(error)
            }
            else{
                callback(data)
            }
        })
    }

module.exports.listauser = (id)=> {
    try{
        return usermoreModel.find({userid:id})
    }catch(e){
        return []
    }
}
