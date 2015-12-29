'use strict';

var login = require('./login');

module.exports = function(app, server) {
    app[login.verb](login.when, login.handler);
};
