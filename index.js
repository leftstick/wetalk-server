'use strict';

var app = require('express')();
var server = require('http').createServer(app);

var prerequest = require('./app/prerequest');
var chat = require('./app/chat');
var api = require('./app/api');

prerequest(app, server);

var io = chat(app, server);
api(app, server, io);

server.listen(3000, '0.0.0.0', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`wetalk is listening at http://${host}:${port}`);
});
