var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    teachername: { type: String },
    email: { type: String },
    phonenumber: { type: Number }

})

var teachermoreSchema = new Schema({
    teacherid: {type: mongoose.Schema.Types.ObjectId, ref: "teacher"},
    teacherboard: { type: mongoose.Schema.Types.ObjectId, ref: "board"},
    teacherclass: { type: mongoose.Schema.Types.ObjectId, ref: "class"},
    teachersubject: { type: mongoose.Schema.Types.ObjectId, ref: "subject"},
})

const teacherModel = mongoose.model('teacher', teacherSchema);
const teachermoreModel = mongoose.model('teachermore', teachermoreSchema);

module.exports.signUp = async(data1,data2)=> {
    try{
        let usr = new teacherModel(data1)
        var data = await usr.save()
        data2.teacherid = data._id
        let teacher1 = new teachermoreModel(data2)
        var dat = await teacher1.save()
        return dat
    }
 catch(e){
     return []
 }
}

module.exports.findteacher = async(phonenumber1)=> {
    try{
        var data = await teacherModel.findOne({phonenumber: phonenumber1})
        return data
    } catch(e){
        return []
    }
}

module.exports.listallteachers = async()=> {
    try{
        var data = await teacherModel.find({})
        return data
    }catch(e){
        return []
    }
}

module.exports.addexperiments = (id, items,callback)=>{
        teachermoreModel.findByIdAndUpdate(id,{$addToSet:{purchaseditems:items}},(error,data)=>{
            if(error){
                 callback(error)
            }
            else{
                callback(data)
            }
        })
    }

module.exports.listateacher = (id)=> {
    try{
        return teachermoreModel.findOne({teacherid:id}).populate("teacherId").populate("teacherboard").populate("teacherclass").exec()
    }catch(e){
        return []
    }
}
