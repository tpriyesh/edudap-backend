var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var experimentSchema = new Schema({
    boardId: { type: String},
    classId: { type: String},
    subjectId: { type: String},
    experimentname: { type: String },
    description: { type: String },
    isFree: { type: Boolean },
    createdDate: { type: String },
    lastupdateddate : { type: String}
})

const experimentModel = mongoose.model('experiment', experimentSchema);

module.exports.createexperiment = (data1,callback)=> {
    let usr = new experimentModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.listexperiment = async (callback)=> {
    await experimentModel.find({},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listexperimentbycalss = async (classId,callback)=> {
    await experimentModel.find({classId: classId},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listexperimentbysubject = async (subjectId,callback)=> {
    await experimentModel.find({subjectId: subjectId},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listfreeexperiment = async (callback)=> {
    await experimentModel.find({isFree: "true" },(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listexperimentbyid = async (id)=> {
       return experimentModel.find({_id: id})
}

module.exports.listfreeexperiments = async (classId,isFree,callback)=> {
    await experimentModel.find({classId: classId, isFree: isFree},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.deleteexperiment = async (experimentname,callback)=> {
    await experimentModel.deleteOne({experimentname:experimentname},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



