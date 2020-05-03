const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../../config')
const AuthToken = require('../../models/authToken')

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
    email: {
        type : String,
        validate : {
            validator : function(add){
                var re = /\S+@\S+\.\S+/;
                return re.test(add);
            },
            message : mail => `${mail} is not a valid email`
        },
        unique : true
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
let secreteKey = "jsisnkbsiuvialaninb"

//instance method for generating tokens
studentSchema.methods.generateToken = function(){
    let student = this
    console.log('student :' + student)
    let payload = {
        owner : student.first_name,
        access : "student"
    }
    let options = {
        expiresIn : "7d"
    }

    let token = jwt.sign(payload,config.secreteKey,options);

    let newToken = new AuthToken({
        owner : student.first_name,
        token : token,
        access : 'student'
    })
    return newToken.save().then((authToken) => {
        return authToken
    })
}

studentSchema.methods.toJSON = function(){
    let student = this
    let studentObject = student.toObject();

    return _.pick(studentObject,['first_name','email'])
}

studentSchema.statics.verifyToken = function(authToken){
    let Student = this
    let decoded ;

    try {
        decoded = jwt.verify(authToken,config.secreteKey)
    }
    catch(err){
        console.log("Error decoding token"+err);
        return Promise.reject(err)
    }

    return Student.findOne({first_name : decoded.owner}).then((student) => {
        return {
            student,
            decoded : decoded
        }
    })
}




var Student = mongoose.model('Student',studentSchema)
module.exports = Student