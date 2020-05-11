//third party modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const Category = require('./models/category')


//my modules
const studentRouter = require('./routes/userRoutes/studentRoutes')
const tutorRouter = require('./routes/userRoutes/tutorRoutes')
const subjectRouter = require('./routes/subjectsRoutes')
const lessonRouter = require('./routes/lessonRoutes')
const adminRouter = require('./routes/userRoutes/adminRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const {ErrorHandler,handleError } = require('./helper/error')
const generateTestData = require('./helper/test.-data');
mongoose.Promise = global.Promise


var url = 'mongodb://localhost:27017/OnlineTutoring' ||
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
    if(err){
        console.log("Error connecting to database :" + err)
    }
})
var app = express();
app.use(bodyParser.json());
app.use(cookieParser());

//generate test data
generateTestData();



app.get('/',(req,res)=>{
    res.send('Hello world')
})

//student routes handler
app.use('/student',studentRouter)
//lesson routes student access
app.use('/student/lesson',studentRouter)

//tutor routes handler
app.use('/tutor',tutorRouter)
app.use('/tutors',tutorRouter)
//tutor routes - admin
app.use('/admin/tutor',adminRouter)
app.use('/admin/tutors',adminRouter)

//subject routes handler
app.use('/subject',subjectRouter)
app.use('/subjects',subjectRouter)

//category routes handler
app.use('/category',categoryRouter)
app.use('/categories',categoryRouter)
//lesson routes
app.use('/lesson',lessonRouter);
app.use('/lessons',lessonRouter);
//lessons routes -admin access
app.use('/admin/lesson',lessonRouter);
app.use('/admin/lessons',lessonRouter);



app.use((err, req, res, next) => {


    if(err instanceof ErrorHandler ){
        console.log("i got here")
       return handleError(err,res)
    }
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message || "Oops something went wrong"
    });
  });

  app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`
    });
  });
//start(create) server
app.listen(3000,() => {
    console.log("node app listening")
})