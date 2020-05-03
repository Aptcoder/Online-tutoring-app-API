const AuthToken = require('../../models/authToken');
const Student = require('../../models/user/student')

const tutorAuth = function(req,res,next){
    let  token = req.cookies.token || req.header('x-auth')

    if(!token){
        res.status(401).send({
            message : 'Oops! you have to login first',
            success : false,
            status : 401
        })
    }

    AuthToken.findOne({token : token}).then((authToken) => {
            Student.verifyToken(authToken.token).then((auth) => {
                req.user = auth.student
                if(auth.decoded.access === 'student'){
                   return next()
                }
               return res.status(403).send({
                message : 'Oops! Not allowed',
                success : false,
                status : 403
            })
            }).catch((err) => {
                console.log('could not verify tutor token' + err)
                res.status(401).send({
                    message : 'Oops! you have to login first',
                    success : false,
                    status : 401
                })
            })
    }).catch((err) => {
        console.log('could not authenticate student :' + err)
        res.status(401).send({
            message : 'Oops! you have to login first',
            success : false,
            status : 401
        })
    })
}

module.exports = tutorAuth