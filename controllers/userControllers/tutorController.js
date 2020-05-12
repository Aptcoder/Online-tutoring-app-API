
const Tutor = require('../../models/user/tutor')
const bcrypt = require('bcrypt')
const {ErrorHandler} = require('../../helper/error')
const Category = require('../../models/category')
const Subject = require('../../models/subject') 
const {ObjectId} = require('mongodb')


const signUpTutor = function(req,res,next){
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    

    if(!email || !password || !first_name || !username){
        res.status(400).send({
            message :"Oops,seems like you missed something required",
            status : 400,
            success : false
        })
    }


    if(password.length < 6){
        throw new ErrorHandler(400,"password must be at least six characters")
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
                name : tutor.fullname,
                _id : tutor._id
            })
        }).catch((err) => {
            console.log('error generating token' + err);
            next(err);
        })
      
    }).catch((err) => {
        console.log('could not save tutor :' + err);
        res.status(400).send({
            message :"email or username already exists",
            status : 400,
            success : false
        })
        // throw new ErrorHandler(400,"email address already exists")
    })
}

//function to login tutor 
const loginTutor = function(req,res,next){
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
        // throw new ErrorHandler(400,"password must be at least six characters")
        res.status(400).send({
            message :"password must be at least six characters",
            status : 400,
            success : false
        })
    }

    Tutor.findOne({email : email}).then((tutor) => {
        if(!tutor){
            // throw new ErrorHandler(400,"Oops! Invalid email address")
            res.status(400).send({
                message :"Oops! Invalid email address",
                status : 400,
                success : false
            })
        }
        bcrypt.compare(password,tutor.password).then((result) => {
            if(!result){
                // throw new ErrorHandler(401,"wrong password")
                res.status(401).send({
                    message :"wrong password",
                    status : 401,
                    success : false
                })
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
        res.status(400).send({
            message :"Oops! Invalid email address" ,
            status : 400,
            success : false
        })
        // throw new ErrorHandler(400,"Oops! Invalid email address")
    })
}


const registerSubject = function(req,res,next){
    let tutor = req.user;
    let subject = req.body.subject 
    let category = req.body.category 

    if(!subject || !category){
       return res.status(400).send({
            message :"subject and category is required to complete request" ,
            status : 400,
            success : false
        })
    }

    Category.findOne({name : category}).then((category) => {
        Subject.findOne({name : subject,category : category._id})
            .then((subject) => {
                Tutor.updateOne({_id : tutor._id},{$push : {subjects : subject._id }})
                    .then(result => {
                        console.log(result);
                        res.status(201).send({
                            message : `${tutor.first_name} successfully registered ${subject.name}`,
                            success : true
                        })
                    })
        }).catch((err) => {
            console.log('could not find subject :' + err);
            // throw new ErrorHandler(404,"subject not found. Try 'mathematics'")
            res.status(404).send({
                message :"subject not found. Try 'mathematics'" ,
                status : 404,
                success : false
            })
        })
    }).catch(err => {
        console.log('could not find category:' + err);
        // throw new ErrorHandler(404,"category not found. Try 'sss','jss' or 'primary'")
        res.status(404).send({
            message :"category not found. Try 'sss','jss' or 'primary'" ,
            status : 404,
            success : false
        })
    })
}

const getTutorsByName = function(req,res,next){
    let name = req.query.first_name

    if(!name){
        // throw new ErrorHandler(401,"Url requires a query,'first_name' of tutor")
        res.status(400).send({
            message : "Url requires a query,'first_name' of tutor",
            status : 400,
            success : false
        })
    }
    Tutor.find({first_name : name})
        .sort({name : 'asc'})
        .populate('subjects')
        .then((tutors) => {
            if(!tutors.length){
                console.log(tutors.populated())
                return res.status(401).send({
                    message : `Tutor with name ${name} not found`,
                    status : 401,
                    success : false
                })
            }
            res.send({
                message : "Tutor found",
                success : true,
                tutors
            })
        }).catch((err) => {
            console.log(`Tutor not found by name :` + err)
            res.status(401).send({
                message : "`Tutor with name ${name} not found`",
                status : 401,
                success : false
            })
            // throw new ErrorHandler(401,`Tutor with name ${name} not found`)
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
        // throw new ErrorHandler(400,"This route requires a valid tutor Id")
        res.status(400).send({
            message : "This route requires a valid tutor Id",
            status : 400,
            success : false
        })

    }

    Tutor.updateOne({_id : id},{$set :{active : 0}})
        .then((result) => {
            if(!result.n){
                throw new ErrorHandler(404,"Tutor with Id not found,Try Valid Id")
            }
            res.send({
                message : "Tutor deactivated",
                success : true
            })
        }).catch((err) => {
            console.log("could not deactivate tutor" + err)
            // throw new ErrorHandler(404,"Tutor with Id not found,Try Valid Id")
            res.status(404).send({
                message : "Tutor with id not found. Try valid id",
                status : 404,
                success : false
            })
    
        })
}

const getTutorById = function(req,res,next){
    let id = req.params.id

    if(!ObjectId.isValid(id)){
        // throw new ErrorHandler(400,"This route requires a valid tutor Id")
        res.status(400).send({
            message : "This route requires a valid tutor Id",
            success : false,
            status : 400
        })
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
        // throw new ErrorHandler(404,"Tutor with id not found. Try valid id")
        res.status(404).send({
            message : "Tutor with id not found. Try valid id",
            status : 404,
            success : false
        })

    })
}

const getTutorSubjects = function(req,res,next){
    let tutor = req.user;

    console.log(tutor)
    Tutor.findOne({email : tutor.email})
            .populate({path : 'subjects'})
            .then((tutor) => {
                if(!tutor){
                throw new ErrorHandler(404,'Tutor,subjects not found')
                }
            res.send({
                success : true,
                subjects : tutor.subjects
            })
        }).catch((err)=>{
            console.error("could not find tutor and subjects" + err);
           next(err)
        })

}

const updateRegisteredSub = function(req,res,next){
    let tutor = req.user;
    let newName = req.body.name
    let category = req.body.category 
    let oldSubject = req.params.subject
    let oldCategory = req.params.category

    //check if new subject name and category is provided
    if(!category || !newName){
        return res.status(400).send({
            message :"subject name and category is needed for update" ,
            status : 400,
            success : false
        })
    }

    //confirm if subject exists and is registered by tutor
    Category.findOne({name : oldCategory}).then((cate) => {
        Subject.findOne({name : oldSubject,category : cate._id})
        .then((subject) => {
            if(!subject){
                res.status(404).send({
                    message :"subject not found. Try 'mathematics'" ,
                    status : 404,
                    success : false
                })
            }
            if(tutor.subjects.includes(subject._id)){
                //if the tutor registered the subject go on

                //check if the new category exists
                Category.findOne({name : category}).then((cat) => {
                        if(!cat){
                            res.status(404).send({
                                message :"category not found. Try 'sss','jss' or 'primary'" ,
                                status : 404,
                                success : false
                            })
                        }
                        //update the subject 
                    Subject.updateOne({name : oldSubject,category : cate._id},{$set : {name : newName,category :cat._id}})
                        .then((result) => {
                            if(!result.nModified){
                                res.status(404).send({
                                    message :"subject not found. Try 'mathematics'" ,
                                    status : 404,
                                    success : false
                                })
                            }
                            res.send({
                                success : true,
                                message : "subject updated"
                            })
                    }).catch((err) => {
                        console.log('could not find subject :' + err);
                        // throw new ErrorHandler(404,"subject not found. Try 'mathematics'")
                        res.status(404).send({
                            message :"subject not found. Try 'mathematics'" ,
                            status : 404,
                            success : false
                        })
                    })
                }).catch(err => {
                    console.log('could not find category:' + err);
                    // throw new ErrorHandler(404,"category not found. Try 'sss','jss' or 'primary'")
                    res.status(404).send({
                        message :"category not found. Try 'sss','jss' or 'primary'" ,
                        status : 404,
                        success : false
                    })
                })
            }
            else {
                //if the tutor didnt register the course stop the process
                return res.status(403).send({
                    message :"Oops. You can not do that" ,
                    status : 403,
                    success : false
                })
            }
    })
    }).catch(err => {
        //if the category does not exist
        console.log('could not find category:' + err);
        // throw new ErrorHandler(404,"category not found. Try 'sss','jss' or 'primary'")
        res.status(404).send({
            message :"category in url not found. Try 'sss','jss' or 'primary'" ,
            status : 404,
            success : false
        })
    })
}

const deleteRegSub = function(req,res,next){
    let subjectId = req.params.id
    let tutor = req.user

    if(!ObjectId.isValid(subjectId)){
        res.status(400).send({
            message : "This route requires an Id,try a good one",
            success : false,
            status : 400
        })
    }

    Subject.findById(subjectId).then((subject) => {
        console.log(subject)
        if(!subject){
            throw new Error()
        }
        console.log(tutor.email)
        if(tutor.subjects.includes(subjectId)){
            Subject.deleteOne({_id : subjectId}).then((result) => {
               return res.send({
                    message : "subject deleted",
                    success : true
                })
            }).catch((err) => {
                console.log("problem deleting" + err)
                next(err)
            })
        }
        else{
            res.status(403).send({
                message :"Oops. Not allowed" ,
                status : 403,
                success : false
            })
        }  
    }).catch((err) => {
        console.log('error with finding subject' + err)
        res.status(404).send({
            message :"subject not found. Try 'mathematics'" ,
            status : 404,
            success : false
        })
    })
}


module.exports = {
    signUpTutor,
    loginTutor,
    getTutorsByName,
    registerSubject,
    getAllTutors,
    getTutorSubjects,
    getTutorById,
    deactivateTutor,
    updateRegisteredSub,
    deleteRegSub
}