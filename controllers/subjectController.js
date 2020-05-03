const Subject = require('../models/subject')
const Category = require('../models/category')
const Tutor = require('../models/user/tutor')
let {ObjectID} = require('mongodb')




const createSubject = function(req,res,next){
    let name = req.body.name;
    let category = req.body.category

    Category.findOne({name : category}).then((cat) => {
        let newSubject = new Subject({
            name : name,
            category : cat._id
        })

        newSubject.save().then((subject) => {
            res.status(201).send({
                message : "subject successfully created",
                success : false
            })
        }).catch((err) => {
            console.log('could not save subject' + err)
            next(err)
        })
    }).catch((err) => {
        console.log('could not find category' + err);
        res.status(400).send({
            message : "category not found. Try 'sss','jss' or 'primary'",
            success : false,
            status : 400
        })
    })
}


const getTutorsTakingSub = function(req,res,next){
    let category = req.params.category
    let subject = req.params.subject

    Category.findOne({name : category}).then((category) => {
        Subject.findOne({name : subject,category : category._id})
            .then((subject) => {
                Tutor.find({subjects : subject._id}).then((tutors) => {
                    res.send({
                        tutors 
                    })
                }).catch((err) => {
                    console.log('could not find tutor with subjects' + err)
                    next(err);
                })
        }).catch((err) => {
            console.log('could not find subject :' + err);
            res.status(404).send({
                message : "subject not found. Try 'mathematics'",
                success : false,
                status : 404
            })
        })
    }).catch(err => {
        console.log('could not find category:' + err);
        res.status(404).send({
            message : "category not found. Try 'sss','jss' or 'primary'",
            success : false,
            status : 404
        })
    })

}
//function to get subjects in category by id
const getSubInCatById = function(req,res,next){

    let category = req.params.category;
    let subjectId = req.params.id;

    if(!ObjectID.isValid(subjectId)){
        res.status(403).send({
            message : "This url requires a valid Id for the subject",
            success : false,
            status : 403
        })
    }

    Category.findOne({name : category}).then((cat) => {
        Subject.findOne({_id : subjectId,category : cat._id})
            .then((subject)=>{
                res.send({
                    message : "subject found",
                    success : true,
                    subject : subject
                })
        }).catch((err)=> {
            console.log('could not find subject by id' + err);
            res.status(404).send({
                message : "subject not found. Try a valid Id",
                success : false,
                status : 404
            })
        })

    }).catch((err) => {
        console.log('category not found ' + err)
        res.status(404).send({
            message : "category not found. Try 'sss','jss' or 'primary'",
            success : false,
            status : 404
        })
    })


    
  

}
 //handler for routes to get subjects by name
const getSubByName = function(req,res,next){
    let name = req.query.name

    if(!name){
        res.status(401).send({
            message : `Url requires a query,'name' of subject`,
            success : false,
            status : 404
        })
    }
    Subject.find({name : name})
        .sort({name : 'asc'})
        .populate('category')
        .then((subjects) => {
            res.send({
                message : "subjects found",
                success : true,
                subjects
            })
        }).catch((err) => {
            console.log(`subjects not found by name :` + err)
            res.status(404).send({
                message : `Subject with name ${name} not found`,
                success : false,
                status : 404
            })
        })
}

module.exports = {
    createSubject,
    getTutorsTakingSub,
    getSubInCatById,
    getSubByName
}