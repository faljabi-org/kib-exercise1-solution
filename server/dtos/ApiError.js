const ERROR_MESSAGES = require('../constants/error-messages');

class ApiError {

    constructor({ code, name, message }) {

        this.code = code;
        this.name = name;
        this.message = message;
    }

    static badRequest(name, message) {

        return new ApiError({ code: 400, name, message });
    }

    static internal(message) {

        return new ApiError({ code: 500, name: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, message })
    }
}

module.exports = ApiError;