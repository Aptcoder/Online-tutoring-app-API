const mongoose = require('mongoose');
const 
var userSchema = mongoose.Schema({

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

    category : [{type : mongoose.Schema.Types.ObjectId , ref : 'Category'}],

    role: {
        type : String,
        enum : ["student","tutor","admin"],
        default : "student",
        required : true
    }
})



var User = mongoose.model('User',userSchema)