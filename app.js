//third party modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const Category = require('./models/category')

//my modules
const studenRouter = require('./routes/userRoutes/studentRoutes')
const tutorRouter = require('./routes/userRoutes/tutorRoutes')
const subjectRouter = require('./routes/subjectsRoutes')
const categoryRouter = require('./routes/categoryRoutes')
mongoose.Promise = global.Promise


var url = 'mongodb://localhost:27017/OnlineTutoring'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
    if(err){
        console.log("Error connecting to database :" + err)
    }
})
var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
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

app.get('/',(req,res)=>{
    res.send('Hello world')
})

//student routes handler
app.use('/student',studenRouter)

//tutor routes handler
app.use('/tutor',tutorRouter)


//subject routes handler
app.use('/subject',subjectRouter)

//category routes handler
app.use('/category',categoryRouter)


//start(create) server
app.listen(3000,() => {
    console.log("node app listening")
})