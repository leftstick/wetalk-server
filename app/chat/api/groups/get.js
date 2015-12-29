'use strict';

var chatroom = require('../../chatroom/Chatroom');

var Handler = function(app, server) {
    return function(req, res, next) {
        return res.json({code: 0, data: chatroom.json()});
    };
};

module.exports = {
    when: '/groups',
    verb: 'get',
    handler: Handler
};
