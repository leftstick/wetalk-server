'use strict';

var LoggedInUsers = function() {
    this.users = [];
};

LoggedInUsers.prototype.add = function(user) {
    if (!!this.users.find(u => u.id === user.id)) {
        throw new Error('user exist');
    }
    this.users.push(user);
};

LoggedInUsers.prototype.get = function(id) {
    return this.users.find(u => u.id === id);
};

LoggedInUsers.prototype.remove = function(user) {
    if (!user) {
        return;
    }
    this.users = this.users.filter(u => u.id !== user.id);
};

module.exports = new LoggedInUsers();
