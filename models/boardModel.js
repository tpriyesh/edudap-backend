var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var boardSchema = new Schema({
    boardname: { type: String },
    isActive: { type: Boolean },
    createdDate: { type: String }
})

const boardModel = mongoose.model('board', boardSchema);

module.exports.createBoard = async(data1)=> {
    try{
        let usr = new boardModel(data1)
        var result = await usr.save()
        return result
    }catch(e){
        return []
    }
 
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

module.exports.deleteBoard = (boardname,callback)=> {
    boardModel.deleteOne({boardname:boardname},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}


