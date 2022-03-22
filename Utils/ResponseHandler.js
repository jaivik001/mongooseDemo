let HttpStatus = require('http-status-codes');

let responseHandler = {
    sendSuccess: function(response , jsonResponse , errorMsg='') {
        response.status(HttpStatus.StatusCodes.OK).send({
            'errorMsg': errorMsg,
            'response': jsonResponse
        });
    },

    sendValidationError: function(response , jsonResponse) {
        response.status(HttpStatus.StatusCodes.OK).send({
            'errorMsg': "ValidationError",
            'response': jsonResponse
        });
    },

    sendBadRequest: function(response , jsonResponse , errorMsg= '') {
        response.status(HttpStatus.StatusCodes.BAD_REQUEST).send({
            'errorMsg': errorMsg,
            'response': jsonResponse
        });
    },

    sendInternalServerError: function(response , jsonResponse , errorMsg= '') {
        response.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
            'errorMsg': errorMsg,
            'response': jsonResponse
        });
    },

    sendUnAuthorised: function (response, errorMsg) {
        response.status(HttpStatus.StatusCodes.UNAUTHORIZED).send({
          'errorMsg': errorMsg
        });
    },

    sendForbidden: function (response, errorMsg) {
        response.status(HttpStatus.StatusCodes.FORBIDDEN).send({
          'errorMsg': errorMsg
        });
    },
};
module.exports = responseHandler;