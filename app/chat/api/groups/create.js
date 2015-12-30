'use strict';

var chatroom = require('../../chatroom/Chatroom');
var Group = require('../../chatroom/Group');

var GROUP_EXIST = 2;

var Handler = function(app, server, io) {
    return function(req, res, next) {
        var g = new Group(req.body.name, req.body.icon, io);
        if (chatroom.contains(g)) {
            return res.json({code: GROUP_EXIST});
        }

        chatroom.add(g);
        return res.json({code: 0, data: g.json()});
    };
};

module.exports = {
    when: '/group',
    verb: 'post',
    handler: Handler
};
