var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    board: { type: mongoose.Schema.Types.ObjectId, ref: "board"},
    class: { type: mongoose.Schema.Types.ObjectId, ref: "class"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    deliveryinfo: { type: String },
    status: { type: String },
    createdDate: { type: String },
})

const orderModel = mongoose.model('order', orderSchema);

module.exports.createorder = (data1,callback)=>{
    let usr = new orderModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.updateorderstatus = async (id, data)=> {
    try{
        return orderModel.updateOne({_id:id}, data).exec()
    }catch(e){
        return []
    }
}

module.exports.checkorderstatus = async (id,callback)=> {
    await orderModel.find({_id:id}).populate("board").populate("class").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.listorder = async (callback)=> {
    await orderModel.find({}).populate("board").populate("class").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}
module.exports.listorderbyclass = async (classId,callback)=> {
    await orderModel.find({class:classId}).populate("board").populate("class").exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.deleteorder = (ordername,callback)=> {
    orderModel.deleteOne({ordername:ordername},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



