const mongoose = require('mongoose');
const shortId = require('shortid')

//schema for subject model 
var subjectSchema = mongoose.Schema({
    _id : {
        type : String,
        default : shortId.generate
    },
    name : {
        type : String,
        required : true
    },
    category : {type : mongoose.Schema.Types.ObjectId,ref : 'Category',required: true}
}) 

var Subject = mongoose.model('Subject',subjectSchema)
module.exports = Subject