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

    subjects : [{type : mongoose.Schema.Types.ObjectId , ref : 'Subject' ,unique: true}],

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
        owner : tutor.first_name,
        access : "tutor"
    }
    let options = {
        expiresIn : "1d"
    }

    let token = jwt.sign(payload,config.secreteKey,options);

    let newToken = new AuthToken({
        owner : tutor.first_name,
        token : token,
        access : 'tutor'
    })
    return newToken.save().then((authToken) => {
        return authToken
    })
}

tutorSchema.statics.verifyToken = function(authToken){
    let Tutor = this
    let decoded ;

    try {
        decoded = jwt.verify(authToken,config.secreteKey)
    }
    catch(err){
        console.log("Error decoding token"+err);
        return Promise.reject(err)
    }

    return Tutor.findOne({first_name : decoded.owner}).then((tutor) => {
        return {
            tutor : tutor,
            decoded : decoded
        }
    })
}

var Tutor = mongoose.model('Tutor',tutorSchema)
module.exports = Tutor
