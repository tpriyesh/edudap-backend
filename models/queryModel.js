var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var querySchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    text: { type: String },
    reply: [{replytext:{ type: String },
    teacher:{type: mongoose.Schema.Types.ObjectId, ref: "teacher"}}],
    board: { type: mongoose.Schema.Types.ObjectId, ref: "board"},
    class: { type: mongoose.Schema.Types.ObjectId, ref: "class"},
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "subject"},
    isActive: { type: Boolean },
    createdDate: { type: String }
})

const queryModel = mongoose.model('query', querySchema);

module.exports.createquery = async(data1)=> {
    try{
        let usr = new queryModel(data1)
        var result = await usr.save()
        return result
    }catch(e){
        return []
    }
 
}

module.exports.createqueryreply = async (id, data)=> {
    try{
        return queryModel.updateOne({_id:id}, data).exec()
    }catch(e){
        return []
    }
}

module.exports.listquery = async ()=> {
    try{
        var queryList = await queryModel.find({}).populate("board").populate("class").populate("subject").exec()
        return queryList
    }
    catch(e){
        return []
    }
}

module.exports.listquerysbysubject = async (subjectId)=> {
    try{
        var queryList = await queryModel.find({subject:subjectId}).populate("board").populate("class").populate("subject").exec()
        return queryList
    }
    catch(e){
        return []
    }
}

module.exports.deletequery = (id,callback)=> {
    queryModel.deleteOne({_id:id},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}


