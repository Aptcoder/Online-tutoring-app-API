const mongoose = require('mongoose');
const shortId = require('shortid')

//schema for subject model 
var subjectSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : {type : mongoose.Schema.Types.ObjectId,ref : 'Category',required: true}
}) 


// subjectSchema.methods.toJSON = function(){
//     let subject = this
//     let subjectObject = subject.toObject();

//     return _.pick(subjectObject,['name','category'])
// }


var Subject = mongoose.model('Subject',subjectSchema)
module.exports = Subject