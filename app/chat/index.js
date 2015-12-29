'use strict';

var Socket = require('socket.io');

var api = require('./api');

module.exports = function(app, server) {

    var io = Socket(server);

    api(app, server, io);

};
