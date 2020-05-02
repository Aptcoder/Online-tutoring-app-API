const Subject = require('../models/subject')
const Category = require('../models/category')
const Tutor = require('../models/user/tutor')




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

module.exports = {
    createSubject,
    getTutorsTakingSub
}