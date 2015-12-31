'use strict';

var Socket = require('socket.io');

module.exports = function(app, server) {

    return Promise.resolve(Socket(server));

};
