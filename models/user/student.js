const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt')

//student model schema
var studentSchema = mongoose.Schema({

    // _id: {
    //     'type': String,
    //     'default': shortid.generate
    //   },
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

studentSchema.pre('save',function(next) {
    var student = this;
    
    if(!student.isNew){
        return next();
    }
    //TODO - hide hash rounds in config file
    return bcrypt.hash(student.password,10).then((hash)=>{
        console.log('password hashed')
        student.password = hash
    }).catch((err) => {
        console.log('could not hash password:' + err)
    })

})

studentSchema.virtual('fullname').get(function(){
    return this.first_name + ' ' + this.last_name
})

var Student = mongoose.model('Student',studentSchema)
module.exports = Student