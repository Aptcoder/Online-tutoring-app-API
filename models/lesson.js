const mongoose = require('mongoose');
const shortid = require('shortid');
const _ = require('lodash')

var lessonSchema = mongoose.Schema({

    // _id : {
    //     type : String,
    //     default : shortid.generate
    // },
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Student' },
    tutor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tutor'
    },
    date : {
        type : Date,
        required : true
    }

})

lessonSchema.methods.toJSON = function(){
    let lesson = this
    let lessonObject = lesson.toObject();

    return _.pick(lessonObject,['_id','tutor','student','date'])
}

Lesson = mongoose.model('Lesson',lessonSchema)
module.exports = Lesson;