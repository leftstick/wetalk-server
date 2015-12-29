'use strict';

var Chatroom = function() {
    this.groups = [];
    this.io = null;
};

Chatroom.prototype.add = function(group) {
    if (typeof group !== 'object') {
        return;
    }
    group.start();
    this.groups = [...this.groups, group];
    return group;
};

Chatroom.prototype.remove = function(group) {
    if (typeof group !== 'object') {
        return;
    }
    this.groups = this.groups.filter(g => g.id !== group.id);
};

Chatroom.prototype.contains = function(group) {
    if (typeof group !== 'object') {
        return;
    }
    return !!this.groups.find(g => g.id === group.id);
};

Chatroom.prototype.containsUser = function(user) {
    if (typeof user !== 'object') {
        return;
    }
    return !!this.groups.find(g => g.contains(user));
};

Chatroom.prototype.size = function() {
    return this.groups.length;
};

Chatroom.prototype.json = function() {
    return this.groups;
};

module.exports = new Chatroom();
