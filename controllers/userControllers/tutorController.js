
const Tutor = require('../../models/user/tutor')
const bcrypt = require('bcrypt')
const Category = require('../../models/category')
const Subject = require('../../models/subject') 
const {ObjectId} = require('mongodb')


const signUpTutor = function(req,res,next){
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    
    if(password.length < 6){
        throw new ErrorHandler(400,"password must be at least six characters")
        // res.status(400).send({
        //     message : "password must be at least six characters",
        //     success : false,
        //     status : 400
        // })
    }

    let newTutor = new Tutor({
        first_name ,
        last_name,
        email,
        username,
        password
    })

    newTutor.save().then((tutor) => {
        console.log('tutor successfully created')
        tutor.generateToken().then((authToken) => {
            res.cookie('token',authToken.token,{
                maxAge : 604800000,
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
        throw new ErrorHandler(400,"email address already exists")
        // res.status(400).send({
        //     message : "email address already exists",
        //     success : false,
        //     status : 400
        // })
    })
}

//function to login tutor 
const loginTutor = function(req,res,next){
    let email =  req.body.email;
    let password = req.body.password;

    if(password.length < 6){
        throw new ErrorHandler(400,"password must be at least six characters")
        // res.status(400).send({
        //     message : "password must be at least six characters",
        //     success : false,
        //     status : 400
        // })
    }

    Tutor.findOne({email : email}).then((tutor) => {
        bcrypt.compare(password,tutor.password).then((result) => {
            if(!result){
                throw new ErrorHandler(401,"wrong password")
                // res.status(401).send({
                //     message : "wrong password",
                //     success : false,
                //     status : 401
                // })
            }
            console.log('password correct!')
            tutor.generateToken().then((authToken) => {
                res.cookie('token',authToken.token,{
                    maxAge : 604800000,
                    httpOnly : true,
                    secure : false
                })
                res.status(200).set('x-auth',authToken.token).send({
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
        throw new ErrorHandler(400,"Oops! Invalid email address")
        // res.status(400).send({
        //     message : "Oops! Invalid email address",
        //     success : false,
        //     status : 400
        // })
    })
}


const registerSubject = function(req,res,next){
    let tutor = req.user;
    let subject = req.body.subject 
    let category = req.body.category 


    Category.findOne({name : category}).then((category) => {
        Subject.findOne({name : subject,category : category._id})
            .then((subject) => {
                Tutor.updateOne({_id : tutor._id},{$push : {subjects : subject._id }})
                    .then(result => {
                        console.log(result);
                        res.status(200).send({
                            message : `${tutor.first_name} successfully registered ${subject.name}`,
                            success : true
                        })
                    })
        }).catch((err) => {
            console.log('could not find subject :' + err);
            throw new ErrorHandler(404,"subject not found. Try 'mathematics'")
            // res.status(404).send({
            //     message : "subject not found. Try 'mathematics'",
            //     success : false,
            //     status : 404
            // })
        })
    }).catch(err => {
        console.log('could not find category:' + err);
        throw new ErrorHandler(404,"category not found. Try 'sss','jss' or 'primary'")
        // res.status(404).send({
        //     message : "category not found. Try 'sss','jss' or 'primary'",
        //     success : false,
        //     status : 404
        // })
    })
}

const getTutorsByName = function(req,res,next){
    let name = req.query.first_name

    if(!name){
        throw new ErrorHandler(401,"Url requires a query,'first_name' of tutor")
        // res.status(401).send({
        //     message : `Url requires a query,'first_name' of tutor`,
        //     success : false,
        //     status : 404
        // })
    }
    Tutor.find({first_name : name})
        .sort({name : 'asc'})
        .populate('subjects')
        .then((tutors) => {
            res.send({
                message : "subjects found",
                success : true,
                tutors
            })
        }).catch((err) => {
            console.log(`Tutor not found by name :` + err)
            throw new ErrorHandler(401,`Tutor with name ${name} not found`)
            // res.status(404).send({
            //     message : `Tutor with name ${name} not found`,
            //     success : false,
            //     status : 404
            // })
        })
}
/*
get all the tutors in the data base
*/
const getAllTutors = function(req,res,next){
    Tutor.find({})
    .populate('subjects')
    .then((tutors) => {
        res.send({
            message : "Tutors found",
            success : true,
            tutors
        })
    }).catch((err) => {
        next(err)
    })
}

const deactivateTutor = function(req,res,next){
    let id = req.params.id

    if(!ObjectId.isValid(id)){
        throw new ErrorHandler(400,"This route requires a valid tutor Id")
        // res.status(400).send({
        //     message : "This route requires a valid tutor Id",
        //     success : false,
        //     status : 400
        // })
    }

    Tutor.updateOne({_id : id},{$set :{active : 0}})
        .then((result) => {
            if(!result.n){
                throw new ErrorHandler(404,"Tutor with Id not found,Try Valid Id")
                // res.status(404).send({
                //     message : "Tutor with Id not found,Try Valid Id",
                //     success : false,
                //     status : 404
                // })
            }
            res.send({
                message : "Tutor deactivated",
                success : true
            })
        }).catch((err) => {
            console.log("could not deactivate tutor" + err)
            throw new ErrorHandler(404,"Tutor with Id not found,Try Valid Id")
            // res.status(404).send({
            //     message : "Tutor with Id not found,Try Valid Id",
            //     success : false,
            //     status : 404
            // })
        })
}

const getTutorById = function(req,res,next){
    let id = req.params.id

    if(!ObjectId.isValid(id)){
        throw new ErrorHandler(400,"This route requires a valid tutor Id")
        // res.status(400).send({
        //     message : "This route requires a valid tutor Id",
        //     success : false,
        //     status : 400
        // })
    }
    Tutor.findById(id)
    .populate('subjects')
    .then((tutor)=>{
        res.send({
            message : 'Tutor found',
            success : true,
            tutor
        })
    }).catch((err) => {
        console.log('Could not find tutor by id' + err)
        throw new ErrorHandler(404,"Tutor with id not found. Try valid id")
        // res.status(404).send({
        //     message : "Tutor with id not found. Try valid id",
        //     success : false,
        //     status : 404
        // })
    })
}


module.exports = {
    signUpTutor,
    loginTutor,
    getTutorsByName,
    registerSubject,
    getAllTutors,
    getTutorById,
    deactivateTutor
}