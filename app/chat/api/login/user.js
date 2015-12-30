'use strict';

var loggedInUsers = require('../../user/LoggedInUsers');

var GET_FAILED_USER_NON_EXIST = 3;

var Handler = function(app, server) {
    return function(req, res, next) {
        var user = loggedInUsers.get(Number(req.params.id));
        return res.json({
            code: user ? 0 : GET_FAILED_USER_NON_EXIST,
            data: user && user.json()
        });
    };
};

module.exports = {
    when: '/user/:id',
    verb: 'get',
    handler: Handler
};
