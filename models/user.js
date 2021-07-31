var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String },
    email: { type: String },
    phonenumber: { type: Number }
})

const userModel = mongoose.model('user', userSchema);

// module.exports.signUp = new Promise(data, (resolve, reject)=> {
//     let usr = new userModel(data)
//     usr.save((err,data1)=>{
//         if(!data1){
//             reject("User data not saved!",err)
//         }
//         else{
//             resolve(data1)
//         }
//     })
// })

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