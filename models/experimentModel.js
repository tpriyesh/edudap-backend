var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var experimentSchema = new Schema({
    classId: { type: String},
    experimentname: { type: String },
    description: { type: String },
    isFree: { type: Boolean },
    createdDate: { type: String },
    lastupdateddate : { type: String}
})

const experimentModel = mongoose.model('user', experimentSchema);

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


module.exports.listexperimentbyid = async (id,callback)=> {
    await experimentModel.find({_id: id},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
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
    await experimentModel.remove({experimentname,experimentname},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



