
const Tutor = require('../../models/user/tutor')



const signUpTutor = function(req,res){
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

    let newTutor = new Tutor({
        first_name ,
        last_name,
        password
    })

    newTutor.save().then((tutor) => {
        console.log('tutor successfully created')
        res.status(201).send({
            message : "user successfully created",
            success : true,
            name : tutor.fullname
        })
    }).catch((err) => {
        console.log('could not save tutor :' + err);
        res.status(400).send({
            message : "could not create user",
            success : false,
            status : 400
        })
    })
}


module.exports = {
    signUpTutor
}