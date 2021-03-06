const Student = require('../../models/user/student')
const Category = require('../../models/category')
const bcrypt = require('bcrypt')


//TODO- refactor error responses

const signUpStudent = function(req,res,next){
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var email = req.body.email
    var username = req.body.username
    var password = req.body.password
    
    
    if(!email || !password || !first_name || !username){
        res.status(400).send({
            message :"Oops,seems like you missed something required",
            status : 400,
            success : false
        })
    }


    if(password.length < 6){
        res.status(400).send({
            message : "password must be at least six characters",
            success : false,
            status : 400
        })
    }

    let studentObj = {
        first_name,
        last_name,
        password,
        username,
        email
    }

    if(req.body.category){
        Category.findOne({name : req.body.category}).then((cat) =>{
            studentObj.category = cat._id
        }).catch((err) => {
            console.log('could not find category :' + err)
            res.status(404).send({
                message : "category not found. Try 'sss','jss' or 'primary'",
                success : false,
                status : 404
            })
        })
    }

    let newStudent = new Student(studentObj)

    newStudent.save().then((student) => {
        console.log('tutor successfully created')
        student.generateToken().then((authToken) => {
            res.cookie('token',authToken.token,{
                maxAge : 604800000,
                httpOnly : true,
                secure : false
            })
            res.status(201).set('x-auth',authToken.token).send({
                message : "user(student) successfully created",
                success : true,
                name : student.fullname,
                id : student._id
            })
        }).catch((err) => {
            console.log('error generating token' + err);
            next(err);
        })
    }).catch((err) => {
        console.log('could not save student :' + err);
        res.status(400).send({
            message : "email or username already exists",
            success : false,
            status : 400
        })
    })
}

//function  to handle student login
const loginStudent = function(req,res,next){
    let email =  req.body.email;
    let password = req.body.password;

    if(!email || !password){
        res.status(400).send({
            message :"Email address and password is required",
            status : 400,
            success : false
        })
    }
   
    if(password.length < 6){
        res.status(400).send({
            message : "password must be at least six characters",
            success : false,
            status : 400
        })
    }

    Student.findOne({email : email}).then((student) => {
        bcrypt.compare(password,student.password).then((result) => {
            if(!result){
                res.status(401).send({
                    message : "wrong password",
                    success : false,
                    status : 401
                })
            }
            console.log('password correct!')
            student.generateToken().then((authToken) => {
                res.cookie('token',authToken.token,{
                    maxAge : 604800000,
                    httpOnly : true,
                    secure : false
                })
                res.status(200).set('x-auth',authToken.token).send({
                    message : "login successful",
                    success : true,
                    name : student.fullname,
                    id : student._id
                })
            }).catch((err) => {
                console.log('error generating token' + err);
                next(err);
            })
        })
    }).catch((err) => {
        console.log('error occured while finding student :' + err);
        res.status(400).send({
            message : "Oops! Invalid email address",
            success : false,
            status : 400
        })
    })
}

module.exports = {
    signUpStudent,
    loginStudent
}