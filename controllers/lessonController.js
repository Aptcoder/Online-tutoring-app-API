const Lesson = require('../models/lesson');
const Tutor = require('../models/user/tutor')
const Student = require('../models/user/student')
const {ObjectId} = require('mongodb')
const {ErrorHandler} = require('../helper/error')

const adminBookLesson = function(req,res,next){
    let tutor = req.body.tutor
    let student = req.body.student
    let date = req.body.date
    let time = req.body.time


    if(!date || !time){
        // throw new ErrorHandler(400,"Date and time is required")
        res.status(400).send({
            message : " Date and time is required",
            success : false,
            status : 400
        })
    }
    /*
    Find tutor and then find student and use them to create the lesson

    */

    Tutor.findOne({username : tutor}).then((tutor)=>{
        Student.findOne({username : student}).then((student)=>{
            let newLesson = new Lesson({
                student : student._id,
                tutor : tutor._id,
                date : new Date(date+"T"+time+":00Z")
            })
            newLesson.save().then((lesson)=>{
                res.send({
                    message : 'Lesson booked',
                    success : true
                })
            }).catch((err) => {
                console.log("could not save lesson");
                next(err)
            })
        }).catch((err)=> {
            console.log("Student not found" + err)
            // throw new ErrorHandler(404,"Student not found")
            res.status(404).send({
                message : "Student not found",
                success : false,
                status : 404
            })
        })
    }).catch((err)=> {
        console.log("Tutor not found " + err)
        // throw new ErrorHandler(404,"Tutor not found")
        res.status(404).send({
            message : "Tutor not found",
            success : false,
            status : 404
        })
    })

}

const getLessons = function(req,res,next){
    Lesson.find({})
    .populate({path : 'tutor',select : ['username','first_name','email']})
    .populate({path : 'student',select : ['username','first_name','email']})
    .then((lessons)=> {
        res.send({
            message : "lessons found",
            success : true,
            lessons
        })
    }).catch((err) => {
        console.log('could not get lessons',err);
        next(err)
    })
}

const getLessonById = function(req,res,next){
    let id = req.params.id
    //check if the id is valid
    if(!ObjectId.isValid(id)){
        // throw new ErrorHandler(400,"This route requires a valid tutor Id")
        res.status(400).send({
            message : "This route requires a valid tutor Id",
            success : false,
            status : 400
        })
    }
    Lesson.findById(id)
    //populate the response with tutors and students
    .populate({path : 'tutor',select : ['username','first_name','email']})
    .populate({path : 'student',select : ['username','first_name','email']})
    .then((tutor)=>{
        res.send({
            message : 'Lesson found',
            success : true,
            tutor
        })
    }).catch((err) => {
        console.log('Could not find lesson by id' + err)
        // throw new ErrorHandler(404,"Lesson with id not found. Try valid id")
        res.status(404).send({
            message : "Lesson with id not found. Try valid id",
            success : false,
            status : 404
        })
    })
}

const updateLesson = function(req,res,next){
    let tutor = req.body.tutor
    let student = req.body.student
    let date = req.body.date
    let time = req.body.time


    if(!date || !time){
        // throw new ErrorHandler(400,"Date and time is required")
        res.status(400).send({
            message : " Date and time is required",
            success : false,
            status : 400
        })
    }
    let id = req.params.id
    //check if the id is valid
    if(!ObjectId.isValid(id)){
        // throw new ErrorHandler(400,"This route requires a valid tutor Id")
        res.status(400).send({
            message : "This route requires a valid tutor Id",
            success : false,
            status : 400
        })
    }
    /*
    Find tutor and then find student and use them to create the lesson

    */
    Tutor.findOne({username : tutor}).then((tutor)=>{
        if(!tutor){
            // throw new ErrorHandler(404,"Tutor not found")
            return res.status(404).send({
                message : "Tutor not found",
                success : false,
                status : 404
            })
        }
        Student.findOne({username : student}).then((student)=>{
            if(!student){
                // throw new ErrorHandler(404,"Student not found")
                return res.status(404).send({
                    message : "Student not found",
                    success : false,
                    status : 404
                })
            }
           Lesson.updateOne({_id : id},{$set : {Tutor : tutor._id,student : student._id,date : new Date(date+"T"+time+":00Z")}})
           .then((result) => {
            if(!result.n){
                // throw new ErrorHandler(404,"Lesson not found")
                res.status(404).send({
                    message : "Lesson not found",
                    success : false,
                    status : 404
                })
            }
            res.send({
                message : "Lesson updated",
                success : true
            })
           })
            })
        .catch((err)=> {
            console.log("Student not found" + err)
            // throw new ErrorHandler(404,"Student not found")
            res.status(404).send({
                message : "Student not found",
                success : false,
                status : 404
            })
        })
    }).catch((err)=> {
        console.log("Tutor not found " + err)
        // throw new ErrorHandler(404,"Tutor not found")
        res.status(404).send({
            message : "Tutor not found",
            success : false,
            status : 404
        })
    })

}

const deleteLesson = function(req,res,next){
    let id = req.params.id
    //check if the id is valid
    if(!ObjectId.isValid(id)){
        // throw new ErrorHandler(400,"This route requires a valid tutor Id")
        res.status(400).send({
            message : "This route requires a valid Id",
            success : false,
            status : 400
        })
    }

    Lesson.deleteOne({_id : id})
    .then((result)=>{
        if(!result.n){
            //  throw new ErrorHandler(404,"Lesson not found")
            res.status(404).send({
                message : "Lesson not found",
                success : false,
                status : 404
            })
        }
        res.send({
            message : "Lesson deleted",
            success : true
        })
    }).catch((err)=>{
        console.log('could not delete lesson',err)
        next(err)
    })
}

const studentBookLesson = function(req,res,next){
    let tutor = req.body.tutor
    console.log(req.user)
    let student = req.user.username
    let date = req.body.date
    let time = req.body.time


    if(!date || !time){
        res.status(400).send({
            message : "date and time is required",
            success : false,
            status : 400
        })
    }
    /*
    Find tutor and then find student and use them to create the lesson

    */

    Tutor.findOne({username : tutor}).then((tutor)=>{
        Student.findOne({username : student}).then((student)=>{
            let newLesson = new Lesson({
                student : student._id,
                tutor : tutor._id,
                date : new Date(date+"T"+time+":00Z")
            })
            newLesson.save().then((lesson)=>{
                res.send({
                    message : 'Lesson booked',
                    success : true
                })
            }).catch((err) => {
                console.log("could not save lesson");
                next(err)
            })
        }).catch((err)=> {
            console.log("Student not found" + err)
            res.status(404).send({
                message : "Student not found",
                success : false,
                status : 404
            })

        })
    }).catch((err)=> {
        console.log("Tutor not found " + err)
       res.status(404).send({
                message : "Tutor not found",
                success : false,
                status : 404
            })
    })

}



module.exports = {
    adminBookLesson,
    getLessons,
    getLessonById,
    updateLesson,
    deleteLesson,
    studentBookLesson
}