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
    await bookingModel.find({}).populate("user").populate("teacher").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.listbookingbyclass = async (classId,callback)=> {
    await bookingModel.find({class:classId}).populate("user").populate("teacher").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.deletebooking = (bookingname,callback)=> {
    bookingModel.deleteOne({bookingname:bookingname},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



