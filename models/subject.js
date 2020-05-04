const mongoose = require('mongoose');
const shortId = require('shortid')
const Tutor = require('../models/user/tutor')
//schema for subject model 
var subjectSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : {type : mongoose.Schema.Types.ObjectId,ref : 'Category',required: true,unique: true}
}) 

subjectSchema.pre('deleteOne', function(next){
    let subId = this.getQuery()["_id"];
    console.log("id :" + subId)
    Tutor.updateMany({subjects : subId},{$pull : {subjects : subId }})
        .then((res) => {
            console.log(res)
            console.log('Tutors with subject removed')
            next()
        }).catch((err) => {
            console.log('Tutors with subject failed to be removed' + err)
            next();
        })
}
)

subjectSchema.methods.toJSON = function(){
    let subject = this
    let subjectObject = subject.toObject();

    return _.pick(subjectObject,['_id','name','category'])
}




var Subject = mongoose.model('Subject',subjectSchema)
module.exports = Subject