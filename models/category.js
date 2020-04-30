const mongoose = require('mongoose');
const shortid = require('shortid')

categorySchema = mongoose.Schema({

    // _id : {
    //     type : String,
    //     default : shortid.generate
    // },
    name : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    full_name : {
        type : String,
    }
})

//TODO - create sss,jss,primary category
var Category = mongoose.model('Category',categorySchema)

module.exports = Category