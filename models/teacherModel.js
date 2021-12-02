var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    teachername: { type: String },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "board"},
    class: { type: mongoose.Schema.Types.ObjectId, ref: "class"},
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "subject"},
    isActive: { type: Boolean },
    createdDate: { type: String }
})

const teacherModel = mongoose.model('teacher', teacherSchema);

module.exports.teachersignup = async(data1)=> {
    try{
        let usr = new teacherModel(data1)
        var result = await usr.save()
        return result
    }catch(e){
        return []
    }
 
}

module.exports.listteacher = async ()=> {
    try{
        var teacherList = await teacherModel.find({}).populate("board").populate("class").populate("subject").exec()
        return teacherList
    }
    catch(e){
        return []
    }
}

module.exports.listteachersbyboard = async (boardId)=> {
    try{
        var teacherList = await teacherModel.find({board:boardId}).populate("board").populate("class").populate("subject").exec()
        return teacherList
    }
    catch(e){
        return []
    }
}


module.exports.listteachersbyclass = async (classId)=> {
    try{
        var teacherList = await teacherModel.find({class:classId}).populate("board").populate("class").populate("subject").exec()
        return teacherList
    }
    catch(e){
        return []
    }
}

module.exports.listteachersbysubject = async (subjectId)=> {
    try{
        var teacherList = await teacherModel.find({subject:subjectId}).populate("board").populate("class").populate("subject").exec()
        return teacherList
    }
    catch(e){
        return []
    }
}

module.exports.deleteteacher = (teachername,callback)=> {
    teacherModel.deleteOne({teachername:teachername},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}


