var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookingSchema = new Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "teacher"},
    date: { type: String }, 
    time: { type: String },
    createdDate: { type: String },
})

const bookingModel = mongoose.model('booking', bookingSchema);

module.exports.createbooking = (data1,callback)=>{
    let usr = new bookingModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.listbooking = async (callback)=> {
    await bookingModel.find({}).populate("student").populate("teacher").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.listbookingsbystudent = async (studentId,callback)=> {
    await bookingModel.find({student:studentId}).populate("student").populate("teacher").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listbookingsbyteacher = async (teacherId,callback)=> {
    await bookingModel.find({teacher:teacherId}).populate("student").populate("teacher").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listallbookingsbydate = async (date,callback)=> {
    await bookingModel.find({date:date}).populate("student").populate("teacher").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listallbookingsbydateandtime = async (date,time,callback)=> {
    await bookingModel.find({date:date,time:time}).populate("student").populate("teacher").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.deletebooking = (id,callback)=> {
    bookingModel.deleteOne({_id:id},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



