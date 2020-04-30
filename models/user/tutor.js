const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const config = require('../../config')
const jwt = require('jsonwebtoken')
const AuthToken = require('../../models/authToken')

//schema for tutor model
var tutorSchema = mongoose.Schema({

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

    // category : [{type : mongoose.Schema.Types.ObjectId , ref : 'Category'}],
    role: {
        type : String,
        enum : ["admin","tutor"],
        default : "tutor",
    }
})


tutorSchema.pre('save',function(next) {
    var tutor = this;

    if(!tutor.isNew){
        return next();
    }
    return bcrypt.hash(tutor.password,10).then((hash)=>{
        console.log('password hashed')
        tutor.password = hash
    }).catch((err) => {
        console.log('could not hash password:' + err)
    })

})

tutorSchema.virtual('fullname').get(function(){
    return this.first_name + ' ' + this.last_name
})

tutorSchema.methods.generateToken = function(){
    let tutor = this
    console.log('tutor:' + tutor )
    let payload = {
        owner : tutor.first_name
    }
    let options = {
        expiresIn : "10h"
    }

    let token = jwt.sign(payload,config.secreteKey,options);

    let newToken = new AuthToken({
        owner : tutor.first_name,
        token : token
    })
    return newToken.save().then((authToken) => {
        return authToken
    })
}

var Tutor = mongoose.model('Tutor',tutorSchema)
module.exports = Tutor
