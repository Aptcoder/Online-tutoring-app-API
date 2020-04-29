//third party modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



mongoose.Promise = global.Promise


var url = 'mongodb://localhost:27017/OnlineTutoring'
mongoose.connect(url,(err) => {
    console.log("Error connecting to database :" + err)
})
var app = express();


app.get('/',(req,res)=>{
    res.send('Hello world')
})

//start(create) server
app.listen(3000,() => {
    console.log("node app listening")
})