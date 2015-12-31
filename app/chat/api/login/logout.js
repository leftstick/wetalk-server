'use strict';

var loggedInUsers = require('../../user/LoggedInUsers');

var Handler = function(app, server) {
    return function(req, res, next) {
        var user = loggedInUsers.get(Number(req.params.id));
        loggedInUsers.remove(user);
        return res.json({code: 0});
    };
};

module.exports = {
    when: '/logout/:id',
    verb: 'post',
    handler: Handler
};
