'use strict';

var app = require('express')();
var server = require('http').createServer(app);
var Socket = require('socket.io');

var Chatroom = require('./app/chat/Chatroom');

var beforeLogic = require('./app/beforeLogic');
var api = require('./app/api');

beforeLogic(app, server);

api(app, server, new Chatroom(Socket(server)));

server.listen(3000, '0.0.0.0', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`wetalk is listening at http://${host}:${port}`);
});
