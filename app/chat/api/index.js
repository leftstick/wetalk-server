'use strict';

var login = require('./login');
var groups_get = require('./groups/get');

module.exports = function(app, server, io) {
    app[login.verb](login.when, login.handler(app, server, io));
    app[groups_get.verb](groups_get.when, groups_get.handler(app, server, io));
};
