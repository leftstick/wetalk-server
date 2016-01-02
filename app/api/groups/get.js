'use strict';

var Handler = function(app, server, chatroom) {
    return function(req, res, next) {
        return res.json({
            code: 0,
            data: chatroom.json().map(g => g.json())
        });
    };
};

module.exports = {
    when: '/groups',
    verb: 'get',
    handler: Handler
};
