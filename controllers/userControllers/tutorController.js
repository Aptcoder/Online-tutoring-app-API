
const Tutor = require('../../models/user/tutor')
const bcrypt = require('bcrypt')



const signUpTutor = function(req,res,next){
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var password = req.body.password
    var email = req.body.email
    
    if(password.length < 6){
        res.status(400).send({
            message : "password must be at least six characters",
            success : false,
            status : 400
        })
    }

    let newTutor = new Tutor({
        first_name ,
        last_name,
        email,
        password
    })

    newTutor.save().then((tutor) => {
        console.log('tutor successfully created')
        tutor.generateToken().then((authToken) => {
            res.cookie('token',authToken.token,{
                maxAge : 36000000,
                httpOnly : true,
                secure : false
            })
            res.status(201).set('x-auth',authToken.token).send({
                message : "user(tutor) successfully created",
                success : true,
                name : tutor.fullname
            })
        }).catch((err) => {
            console.log('error generating token' + err);
            next(err);
        })
      
    }).catch((err) => {
        console.log('could not save tutor :' + err);
        res.status(400).send({
            message : "email address already exists",
            success : false,
            status : 400
        })
    })
}

//function to login tutor 
const loginTutor = function(req,res,next){
    let email =  req.body.email;
    let password = req.body.password;

    if(password.length < 6){
        res.status(400).send({
            message : "password must be at least six characters",
            success : false,
            status : 400
        })
    }

    Tutor.findOne({email : email}).then((tutor) => {
        bcrypt.compare(password,tutor.password).then((result) => {
            if(!result){
                res.status(401).send({
                    message : "wrong password",
                    success : false,
                    status : 401
                })
            }
            console.log('password correct!')
            tutor.generateToken().then((authToken) => {
                res.cookie('token',authToken.token,{
                    maxAge : 36000000,
                    httpOnly : true,
                    secure : false
                })
                res.status(201).set('x-auth',authToken.token).send({
                    message : "login successful",
                    success : true,
                    name : tutor.fullname
                })
            }).catch((err) => {
                console.log('error generating token' + err);
                next(err);
            })
        })
    }).catch((err) => {
        console.log('error occured while finding tutor :' + err);
        res.status(400).send({
            message : "Oops! Invalid email address",
            success : false,
            status : 400
        })
    })
}


module.exports = {
    signUpTutor,
    loginTutor
}