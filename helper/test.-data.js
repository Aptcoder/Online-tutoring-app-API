const Category = require('../models/category');
const Subject = require('../models/subject');
const Tutor = require('../models/user/tutor')





module.exports = function(){

    var cat = new Category({
        name : "sss",
        full_name : "senior secondary school"
    })
    
    
    cat.save().then((res) => {
        console.log(res)
    }).catch(err => {
        console.log("error : " + err)
    })
    
    
    var newCat = new Category({
        name : "jss",
        full_name : "junior seconndary school"
    })
    
    newCat.save().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log("error" + err)
    })

    var newCat2 = new Category({
        name : "primary",
        full_name : "primary school"
    })
    
    newCat2.save().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log("error" + err)
    })


    let admin = new Tutor({
        username : "omilo",
        password : "wonderful",
        first_name : "samuel",
        email : "omilosamuel@gmail.com",
        role : "admin"
    })

    admin.save().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log("error" + err)
    })


}