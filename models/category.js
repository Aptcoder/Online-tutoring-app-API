const mongoose = require('mongoose');
const shortid = require('shortid')
const _ = require('lodash')

categorySchema = mongoose.Schema({

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


// categorySchema.methods.toJSON = function(){
//     let category = this
//     let categoryObject = category.toObject();

//     return _.pick(categoryObject,['name','full_name'])
// }

//TODO - create sss,jss,primary category
var Category = mongoose.model('Category',categorySchema)

module.exports = Category