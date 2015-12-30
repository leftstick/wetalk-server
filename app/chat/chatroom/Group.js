'use strict';

var Hash = require('../../../libs/Hash');
var loggedInUsers = require('../user/LoggedInUsers');
var UserConnection = require('../user/UserConnection');
var EventEmitter = require('events').EventEmitter;

var Group = function(name, icon, io) {
    this.id = Hash(name);
    this.name = name;
    this.icon = icon;
    this.io = io;

    this.groupChat = null;
    this.userConnection = [];

    this.event = new EventEmitter();
};

Group.prototype.start = function() {
    this.groupChat = this.io
        .of('/' + this.id)
        .on('connection', this.receiveClient.bind(this));

    this.event.on('user-offline', this.kickUser.bind(this));
    this.event.on('send-message', this.broadcast.bind(this));
};

Group.prototype.receiveClient = function(socket) {
    this.userConnection = [
        ...this.userConnection,
        new UserConnection(socket, this.event).start()
    ];
};

Group.prototype.broadcast = function(message) {
    this.groupChat.emit('message', message);
};

Group.prototype.kickUser = function(userConnection) {
    this.userConnection = this.userConnection.filter(conn => conn !== userConnection);
    loggedInUsers.remove(userConnection.user);
};

Group.prototype.contains = function(user) {
    return !!this.userConnection.find(u => u.id === user.id);
};

Group.prototype.size = function() {
    return this.userConnection.length;
};

Group.prototype.json = function() {
    return {
        id: this.id,
        name: this.name,
        icon: this.icon,
        users: this.userConnection.map(conn => conn.json())
    };
};

module.exports = Group;
