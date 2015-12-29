'use strict';

var login = require('./login');
var groups = require('./groups');

module.exports = function(app, server) {
    app[login.verb](login.when, login.handler);
    app[groups.verb](groups.when, groups.handler);
};
