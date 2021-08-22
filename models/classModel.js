var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var classSchema = new Schema({
    BoardId: { type: String },
    classname: { type: String },
    isActive: { type: Boolean },
    createdDate: { type: String },
})

const classModel = mongoose.model('user', classSchema);

module.exports.createclass = (data1,callback)=> {
    let usr = new classModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.listclass = async (callback)=> {
    await classModel.find({},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.listclassbyboard = async (boardId,callback)=> {
    await classModel.find({boardId:boardId},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.deleteclass = async (classname,callback)=> {
    await classModel.remove({classname,classname},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



