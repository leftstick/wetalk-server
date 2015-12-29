'use strict';

var chatroom = require('../../chatroom/Chatroom');
var User = require('../../user/User');

var LOGIN_FAILED_NAME_DUPLICATED = 1;

var Handler = function(app, server) {
    return function(req, res, next) {
        var user = new User(req.body.nickname);
        var loggedin = chatroom.containsUser(user);
        return res.json({
            code: loggedin ? LOGIN_FAILED_NAME_DUPLICATED : 0
        });
    };
};

module.exports = {
    when: '/login',
    verb: 'post',
    handler: Handler
};
