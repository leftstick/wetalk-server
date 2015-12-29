'use strict';

var Chatroom = function() {
    this.size = 0;
    this.groups = [];
};

Chatroom.prototype.size = function() {
    return this.size;
};

module.exports = new Chatroom();
