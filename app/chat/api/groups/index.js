'use strict';

var chatroom = require('../../chatroom/Chatroom');

var LOGIN_SUCCESS = 0;
var LOGIN_FAILED_NAME_DUPLICATED = 1;

var Handler = function(req, res, next) {
    return res.json({code: 0, data: chatroom});
};

module.exports = {
    when: '/groups',
    verb: 'get',
    handler: Handler
};
