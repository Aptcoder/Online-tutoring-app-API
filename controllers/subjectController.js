const Subject = require('../models/subject')
const Category = require('../models/category')




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

module.exports = {
    createSubject
}