var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var boardSchema = new Schema({
    boardname: { type: String },
    isActive: { type: Boolean },
    createdDate: { type: String }
})

const boardModel = mongoose.model('board', boardSchema);

module.exports.createBoard = (data1,callback)=> {
    let usr = new boardModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.listBoard = async ()=> {
    try{
        var boardList = await boardModel.find({}).lean().exec()
        return boardList
    }
    catch(e){
        return []
    }
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



