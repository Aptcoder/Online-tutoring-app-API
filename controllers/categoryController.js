const Subject = require('../models/subject')
const ErrorHandler = require('../helper/error');

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
        // throw new ErrorHandler(404,"category not found. Try 'sss','jss' or 'primary'")
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

const updateCategory = function(req,res,next){
    let name = req.params.category;
    let newName = req.body.name 
    let newFullname = req.body.full_name

    if(!newName || !newFullname){
        // throw new ErrorHandler(400,"'name' and 'full_name' is required for this request")
        res.status(400).send({
            message : "'name' and 'full_name' is required for this request",
            success : false,
            status : 400
        })
    }

    Category.updateOne({name : name},{$set : {name : newName,full_name : newFullname}})
        .then((result) => {
            if(!result.n){
        // throw new ErrorHandler(404,"category not found. Try 'sss','jss' or 'primary'")
                res.status(404).send({
                    message : "category not found. Try 'sss','jss' or 'primary'",
                    success : false,
                    status : 404
                })
            }
            res.send({
                message : "Category updated succefully",
                success : true
            })
        }).catch((err) => {
            console.log('could not update category' + err)
            // throw new ErrorHandler(404,"category not found. Try 'sss','jss' or 'primary'")
            res.status(404).send({
                message : "category not found. Try 'sss','jss' or 'primary'",
                success : false,
                status : 404
            })
        })

}


const deleteCategory = function(req,res,next){
    let name = req.params.category;
/* noticing that the pre hook for model middlewares is called with the query
    -- first I find the category by name then i delete by id 
    */
    Category.findOne({name : name}).then((category) => {
        console.log(category)
        if(!category){
            console.log("can not find category 1")
            // throw new ErrorHandler(404,"category not found. Try 'sss','jss' or 'primary'")
            res.status(404).send({
                message : "category not found. Try 'sss','jss' or 'primary'",
                success : false,
                status : 404
            })
        }
       return Category.deleteOne({_id : category._id}).then((result) => {
            res.send({
                message : "Category successfully deleted",
                success : true
            })
        })
    }).catch((err) => {
        console.log("can not find category 2" + err)
        // throw new ErrorHandler(404,"category not found. Try 'sss','jss' or 'primary'")
        res.status(404).send({
            message : "category not found. Try 'sss','jss' or 'primary'",
            success : false,
            status : 404
        })
    })
}
module.exports = {
    getSubjectsInCategory,
    getCategories,
    updateCategory,
    deleteCategory
}