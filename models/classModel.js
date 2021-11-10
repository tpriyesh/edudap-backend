var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var classSchema = new Schema({
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "board"},
    classname: { type: String },
    isActive: { type: Boolean },
    createdDate: { type: String },
})

const classModel = mongoose.model('class', classSchema);

module.exports.createclass = (data1,callback)=> {
    let usr = new classModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.listclass = async (callback)=> {
    await classModel.find({}).populate("boardId").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.listclassbyboard = async (boardId,callback)=> {
    await classModel.find({boardId:boardId}).populate("boardId").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.deleteclass = (classname,callback)=> {
    classModel.deleteOne({classname:classname},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



