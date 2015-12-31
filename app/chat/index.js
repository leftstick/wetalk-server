'use strict';

var Socket = require('socket.io');

module.exports = function(app, server) {

    return Socket(server);

};
