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

/*
delete subjects that refer to this category

*/
categorySchema.pre('deleteOne', function(next){
    let catId = this.getQuery()["_id"];
    console.log("id :" + catId)
    mongoose.model('Subject').deleteMany({category : catId})
    .then((res)=> {
        console.log("deleted subjects related",res)
        next()
    })
    .catch((err) => {
        console.log("error deleted related subjects")
        next(err)
    })
}
)


categorySchema.methods.toJSON = function(){
    let category = this
    let categoryObject = category.toObject();

    return _.pick(categoryObject,['name','full_name'])
}

//TODO - create sss,jss,primary category
var Category = mongoose.model('Category',categorySchema)

module.exports = Category