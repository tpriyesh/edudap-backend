var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var classSchema = new Schema({
    board: { type: mongoose.Schema.Types.ObjectId, ref: "board"},
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
    await classModel.find({}).populate("board").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.listclassbyboard = async (boardId,callback)=> {
    await classModel.find({board:boardId}).populate("board").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listclassbyclassid = async (boardId,classId,callback)=> {
    
    await classModel.findOne({_id:classId, board:boardId}).populate("board").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.updateisactive = async (id, data)=> {
    try{
        return classModel.updateOne({_id:id}, data).exec()
    }catch(e){
        return []
    }
}


module.exports.listactiveclass = async (boardid,callback)=> {
    await classModel.findOne({isActive:true, board:boardid}).populate("board").exec((err,data)=>{
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



