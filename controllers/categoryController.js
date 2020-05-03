const Subject = require('../models/subject')
const Category = require('../models/category')

//function to get the subjects by category
const getSubjectsInCategory = function(req,res,next){
    let category = req.params.category
/*
    variable cat -- category
*/
    Category.findOne({name : category}).then((cat) => {
        Subject.find({category : cat._id})
        .populate('category','name')
        .then((subjects)=> {
            res.status(200).send({
                message : "subjects found :",
                success : true,
                subjects : subjects
            })
        } ).catch(err => {
            next(err)
        })
    }).catch((err) => {
        console.log('could not find category' + err)
        res.status(404).send({
            message : "category not found. Try 'sss','jss' or 'primary'",
            success : false,
            status : 404
        })
    })
    
}

const getCategories = function(req,res,next){
    Category.find({}).then((categories) => {
        res.send(({
            categories
        }))
    }).catch((err) => next(err))
}

module.exports = {
    getSubjectsInCategory,
    getCategories
}