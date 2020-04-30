const mongoose = require('mongoose');
const shortid = require('shortid')

categorySchema = mongoose.Schema({

    _id : {
        type : String,
        default : shortid.generate
    },
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

var Category = mongoose.model('Category',categorySchema)

module.exports = Category