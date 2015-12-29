'use strict';

var userPool = require('../../user/Userpool');

var LOGIN_SUCCESS = 0;
var LOGIN_FAILED_NAME_DUPLICATED = 1;

var Handler = function(req, res, next) {
    var loggedin = userPool.hasUserLoggedin(req.body.nickname);
    return res.json({
        code: loggedin ? LOGIN_FAILED_NAME_DUPLICATED : LOGIN_SUCCESS
    });
};

module.exports = {
    when: '/login',
    verb: 'post',
    handler: Handler
};
