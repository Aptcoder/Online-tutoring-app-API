

class ErrorHandler extends Error{
    constructor(status,message){
        super()
        this.message = message;
        this.status = status
    }
}


var handleError = function(err,res){
    res.status(err.status).send({
        message : err.message,
        status : err.status,
        success : false
    })
}

module.exports = {
    handleError,
    ErrorHandler
}