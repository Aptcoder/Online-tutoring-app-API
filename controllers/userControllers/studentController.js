const Student = require('../../models/user/student')
const Category = require('../../models/category')


const signUpStudent = function(req,res){
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
        res.status(201).send({
            message : "user successfully created",
            success : true,
            name : student.fullname
        })
    }).catch((err) => {
        console.log('could not save student :' + err);
        res.status(400).send({
            message : "could not create user",
            success : false,
            status : 400
        })
    })
}

module.exports = {
    signUpStudent
}