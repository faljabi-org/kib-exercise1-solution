const ApiError = require('../dtos/ApiError');

const handleErrors = (error, req, res, next) => {

    return error instanceof ApiError ?

        res.status(error.code).send(error)
        :
        res.status(500).send(ApiError.internal(error.message));
}

module.exports = handleErrors;