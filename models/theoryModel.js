var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var theorySchema = new Schema({
    board: { type: String },
    class: { type: String },
    subject: { type: String },
    theoryname: { type: String }, 
    theorymetadata:{ type: String }, 
    theoryimage:{ type: String },
    description: { type: String },
    isFree: { type: Boolean },
    createdDate: { type: String },
    lastupdateddate : { type: String}
})

const theoryModel = mongoose.model('theory', theorySchema);

module.exports.createtheory = (data1,callback)=>{
    let usr = new theoryModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.listtheory = async (callback)=> {
    await theoryModel.find({}).populate("board").populate("class").populate("subject").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.listtheorybyclass = async (classId,callback)=> {
    await theoryModel.find({class:classId}).populate("board").populate("class").populate("subject").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listtheorybyboard = async (boardId,callback)=> {
    await theoryModel.find({board:boardId}).populate("board").populate("class").populate("subject").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listtheorybysubject = async (subjectId,callback)=> {
    await theoryModel.find({subject:subjectId}).populate("board").populate("class").populate("subject").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listfreetheory = async (callback)=> {
    await theoryModel.find({isFree: "true" }).populate("board").populate("class").populate("subject").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.deletetheory = (theoryname,callback)=> {
    theoryModel.deleteOne({theoryname:theoryname},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



