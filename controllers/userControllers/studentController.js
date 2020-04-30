const Student = require('../../models/user/student')
const Category = require('../../models/category')


const signUpStudent = function(req,res,next){
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var password = req.body.password
    
    if(password.length < 6){
        res.status(400).send({
            message : "password must be at least six characters",
            success : false,
            status : 400
        })
    }

    let studentObj = {
        first_name ,
        last_name,
        password
    }

    if(req.body.category){
        Category.findOne({name : req.body.category}).then((cat) =>{
            studentObj.category = cat._id
        }).catch((err) => {
            console.log('could not find category :' + err)
            res.status(400).send({
                message : "category not found. Try 'sss','jsss' or 'primary'",
                success : false,
                status : 400
            })
        })
    }

    let newStudent = new Student(studentObj)

    newStudent.save().then((student) => {
        console.log('tutor successfully created')
        student.generateToken().then((authToken) => {
            res.cookie('token',authToken.token,{
                maxAge : 36000000,
                httpOnly : true,
                secure : false
            })
            res.status(201).set('x-auth',authToken.token).send({
                message : "user(student) successfully created",
                success : true,
                name : student.fullname
            })
        }).catch((err) => {
            console.log('error generating token' + err);
            next(err);
        })
    }).catch((err) => {
        console.log('could not save student :' + err);
        res.status(400).send({
            message : "Oops! could not create user",
            success : false,
            status : 400
        })
    })
}

const loginStudent = function(req,res,next){

}

module.exports = {
    signUpStudent
}