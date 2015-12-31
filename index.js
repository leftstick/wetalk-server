'use strict';

var app = require('express')();
var server = require('http').createServer(app);

var beforeLogic = require('./app/beforeLogic');
var chat = require('./app/chat');
var api = require('./app/api');

beforeLogic(app, server)
    .then(function() {
        return chat(app, server);
    })
    .then(function(io) {
        return api(app, server, io);
    })
    .then(function() {
        server.listen(3000, '0.0.0.0', function() {
            var host = server.address().address;
            var port = server.address().port;
            console.log(`wetalk is listening at http://${host}:${port}`);
        });
    });
