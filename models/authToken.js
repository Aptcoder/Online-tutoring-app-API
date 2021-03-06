const mongoose = require('mongoose');

var authTokenSchema = mongoose.Schema({
    token : {
         type : String,
         required : true
    },
    access : {
        type : String,
        enum : ["admin","student","tutor"],
        default: "student"
    },
    //owner of token uses the owners first name
    owner : {
        type : String,
    }
})



let AuthToken = mongoose.model('AuthToken',authTokenSchema)

module.exports = AuthToken