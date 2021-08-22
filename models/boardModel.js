var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var boardSchema = new Schema({
    boardname: { type: String },
    isActive: { type: Boolean },
    createdDate: { type: String }
})

const boardModel = mongoose.model('user', boardSchema);

module.exports.createBoard = (data1,callback)=> {
    let usr = new boardModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.listBoard = async (callback)=> {
    await boardModel.find({},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.deleteBoard = async (boardname,callback)=> {
    await boardModel.remove({boardname,boardname},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



