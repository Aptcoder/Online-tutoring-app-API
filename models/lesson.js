const mongoose = require('mongoose');
const shortid = require('shortid');

var lessonSchema = mongoose.Schema({

    _id : {
        type : String,
        default : shortid.generate
    },
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Student' },
    Tutor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tutor'
    }

})



Lesson = mongoose.model('Lesson',lessonSchema)
module.exports = Lesson;