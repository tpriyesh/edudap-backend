var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var experimentSchema = new Schema({
    board: { type: mongoose.Schema.Types.ObjectId, ref: "board"},
    class: { type: mongoose.Schema.Types.ObjectId, ref: "class"},
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "subject"},
    experimentname: { type: String },
    description: { type: String },
    experimentvideourl: { type: String },
    experimentimage: { type: String },
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
    await experimentModel.find({}).populate("board").populate("class").populate("subject").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listexperimentbycalss = async (classId,callback)=> {
    await experimentModel.find({class: classId}).populate("board").populate("class").populate("subject").exec( (err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
   
}

module.exports.listexperimentbysubject = async (subjectId,callback)=> {
    await experimentModel.find({subject: subjectId}).populate("board").populate("class").populate("subject").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listfreeexperiment = async (callback)=> {
    await experimentModel.find({isFree: "true" }).populate("board").populate("class").populate("subject").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listexperimentbyid = async (id)=> {
       return experimentModel.find({_id: id}).populate("board").populate("class").populate("subject").exec()
}

module.exports.listfreeexperiments = async (classId,isFree,callback)=> {
    await experimentModel.find({class: classId, isFree: isFree}).populate("board").populate("class").populate("subject").exec((err,data)=>{
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



