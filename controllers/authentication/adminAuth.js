const AuthToken = require('../../models/authToken');
const Tutor = require('../../models/user/tutor')

//function to authenticate admin
const adminAuth = function(req,res,next){
    console.log('cookies' + req.cookies.token + "header" + req.header('x-auth'))
    let  token = req.cookies.token || req.header('x-auth')

    if(!token){
        res.status(401).send({
            message : 'Oops! you have to login first',
            success : false,
            status : 400
        })
    }
/*
--Find a authtoken from the database 
--verfify the token is still viable with @function verfifyToken
-- the function returns the tutor and the promise checks if the user has admin
 role
*/
    AuthToken.findOne({token : token}).then((authToken) => {
        Tutor.verifyToken(authToken.token).then((auth) => {
            console.log("role :" + auth.tutor.role)
            if(auth.tutor.role !== 'admin'){
                return res.status(403).send({
                    message : 'access denied',
                    success : false,
                    status : 403
                })
            }
            req.user = auth.tutor;
            next()
        }).catch((err) => {
            res.status(401).send({
                message : 'Oops! you have to login first',
                success : false,
                status : 401
            })
        })
    }).catch((err) => {
        console.log('could not login' + err)
        res.status(401).send({
            message : 'Oops! you have to login',
            success : false,
            status : 401
        })
    })
}


module.exports = adminAuth