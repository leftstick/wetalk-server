'use strict';

var UserPool = require('../../chat/UserPool');

var Handler = function(app, server){
    return function(req, res, next){
        var user = UserPool.get(Number(req.params.id));
        UserPool.remove(user);
        return res.json({ code: 0 });
    };
};

module.exports = {
    when: '/logout/:id',
    verb: 'post',
    handler: Handler
};
