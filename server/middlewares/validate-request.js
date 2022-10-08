const ApiError = require('../dtos/ApiError');

const validateRequest = (schema, targetRequestField) => (req, res, next) => {

    const { error, value } = schema().validate(req[targetRequestField]);

    if (error)
        return next(ApiError.badRequest(error.name, error.message));

    req[targetRequestField] = value;

    return next();
}

module.exports = validateRequest;