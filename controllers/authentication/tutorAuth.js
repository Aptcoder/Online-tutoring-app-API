const AuthToken = require('../../models/authToken');
const Tutor = require('../../models/user/tutor')

const tutorAuth = function(req,res,next){
    let  token = req.cookies.token || req.header('x-auth')
    console.log('cookies' + req.cookies.token + "header" + req.header('x-auth'))

    if(!token){
        res.status(401).send({
            message : 'Oops! you have to login first',
            success : false,
            status : 401
        })
    }

    AuthToken.findOne({token : token}).then((authToken) => {
            Tutor.verifyToken(authToken.token).then((auth) => {
                req.user = auth.tutor
                console.log(auth.decoded)
                if(auth.decoded.access === 'tutor'){
                    return next()
                }
               return Promise.reject();
            }).catch((err) => {
                console.log('could not verify tutor' + err)
                res.status(403).send({
                    message : 'Oops! Not allowed',
                    success : false,
                    status : 403
                })
            })
    }).catch((err) => {
        console.log('could not authenticate tweeter : ' + err)
        res.status(401).send({
            message : 'Oops! you have to login first',
            success : false,
            status : 401
        })
    })
}

module.exports = tutorAuth