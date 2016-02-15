'use strict';

var login = require('./login/login');
var userGet = require('./login/user');
var logout = require('./login/logout');

var groupsGet = require('./groups/get');
var groupsCreate = require('./groups/create');

module.exports = function(app, server, chatroom){

    app[login.verb](login.when, login.handler(app, server, chatroom));
    app[userGet.verb](userGet.when, userGet.handler(app, server, chatroom));
    app[logout.verb](logout.when, logout.handler(app, server, chatroom));

    app[groupsGet.verb](groupsGet.when, groupsGet.handler(app, server, chatroom));
    app[groupsCreate.verb](groupsCreate.when, groupsCreate.handler(app, server, chatroom));

};
