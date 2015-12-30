'use strict';

var login = require('./login/login');
var user_get = require('./login/user');

var groups_get = require('./groups/get');
var groups_create = require('./groups/create');

module.exports = function(app, server, io) {
    app[login.verb](login.when, login.handler(app, server, io));
    app[user_get.verb](user_get.when, user_get.handler(app, server, io));

    app[groups_get.verb](groups_get.when, groups_get.handler(app, server, io));
    app[groups_create.verb](groups_create.when, groups_create.handler(app, server, io));
};
