'use strict';

var UserPool = require('../../chat/UserPool');
var User = require('../../model/User');

var LOGIN_FAILED_NAME_DUPLICATED = 1;

var Handler = function(app, server){
    return function(req, res, next){
        var user = new User(req.body.nickname);
        try {
            UserPool.add(user);
            return res.json({ code: 0, data: user.json() });
        }catch (e){
            return res.json({
                code: LOGIN_FAILED_NAME_DUPLICATED
            });
        }
    };
};

module.exports = {
    when: '/login',
    verb: 'post',
    handler: Handler
};
