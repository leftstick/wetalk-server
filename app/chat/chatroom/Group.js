'use strict';

var Hash = require('../../../libs/Hash');
var UserConnection = require('../user/UserConnection');

var Group = function(name, io) {
    this.id = Hash(name);
    this.name = name;
    this.io = io;
    this.userConnection = [];
};

Group.prototype.start = function() {
    var _this = this;
    this.io
        .of('/' + this.id)
        .on('connection', function(socket) {
            var conn = new UserConnection(socket).start();
            _this.userConnection = [..._this.userConnection, conn];
        });
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
        users: this.userConnection.map(conn => conn.json())
    };
};

module.exports = Group;
