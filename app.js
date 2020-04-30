//third party modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Category = require('./models/category')

//my modules
const studenRouter = require('./routes/userRoutes/studentRoutes')
const tutorRouter = require('./routes/userRoutes/tutorRoutes')
mongoose.Promise = global.Promise


var url = 'mongodb://localhost:27017/OnlineTutoring'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
    if(err){
        console.log("Error connecting to database :" + err)
    }
})
var app = express();
app.use(bodyParser.json());

var cat = new Category({
    name : "primary",
    full_name : "primary school"
})


cat.save().then((res) => {
    console.log(res)
}).catch(err => {
    console.log("error : " + err)
})


app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/user/student',studenRouter)

app.use('/user/tutors',tutorRouter)

//start(create) server
app.listen(3000,() => {
    console.log("node app listening")
})