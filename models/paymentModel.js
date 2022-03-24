var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    paymentinfo: { type: String },
    order_id: { type: mongoose.Schema.Types.ObjectId},
    paymentstatus: { type: String },
    createdDate: { type: String },
})

const paymentModel = mongoose.model('payment', paymentSchema);

module.exports.createpayment = (data1,callback)=>{
    let usr = new paymentModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.updatepaymentstatus = async (id, data)=> {
    try{
        return paymentModel.updateOne({_id:id}, data).exec()
    }catch(e){
        return []
    }
}

module.exports.listpayment = async (callback)=> {
    await paymentModel.find({}).exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



