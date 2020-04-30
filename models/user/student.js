const mongoose = require('mongoose');
const shortid = require('shortid');


//student model schema
var studentSchema = mongoose.Schema({

    _id: {
        'type': String,
        'default': shortid.generate
      },

    first_name : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    } ,
    last_name : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },
    password : {
        type: String,
        required : true,
        minlength : [6,"password must not be less than six characters"]
    },

    category : {type : mongoose.Schema.Types.ObjectId , ref : 'Category'},

})

var Student = mongoose.model('Student',studentSchema)
module.exports = Student