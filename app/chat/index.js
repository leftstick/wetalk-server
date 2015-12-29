'use strict';

var Socket = require('socket.io');

module.exports = function(app, server) {

    var io = Socket(server);
    io.on('connection', function() {
        /* … */
    });

};
