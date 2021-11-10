var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var subjectSchema = new Schema({
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "board"},
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "class"},
    subjectname: { type: String }, 
    description: { type: String },
    isActive: { type: Boolean },
    createdDate: { type: String },
})

const subjectModel = mongoose.model('subject', subjectSchema);

module.exports.createsubject = (data1,callback)=>{
    let usr = new subjectModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.listsubject = async (callback)=> {
    await subjectModel.find({}).populate("boardId").populate("classId").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.listsubjectbyclass = async (classId,callback)=> {
    await subjectModel.find({classId:classId}).populate("boardId").populate("classId").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.deletesubject = (subjectname,callback)=> {
    subjectModel.deleteOne({subjectname:subjectname},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



