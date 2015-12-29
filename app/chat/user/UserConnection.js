'use strict';

var Hash = require('../../../libs/Hash');

var UserConnection = function(socket) {
    this.socket = socket;
    this.id = null;
    this.nickname = null;
};

UserConnection.prototype.start = function() {
    this.socket
        .on('init', function(from, msg) {
            console.log(from, msg);
        });
    return this;
};

UserConnection.prototype.set = function(nickname) {
    this.id = Hash(nickname);
    this.nickname = nickname;
};

UserConnection.prototype.json = function() {
    return {id: this.id, nickname: this.nickname};
};

module.exports = UserConnection;
