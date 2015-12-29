'use strict';

var User = require('./User');

var Userpool = function() {
    this.users = [];
};

Userpool.prototype.add = function(nickname) {
    var id = User.hash(nickname);
    this.users.push(new User(id, nickname));
};

Userpool.prototype.get = function(id) {
    return this.users.find(user => user.id === id);
};

Userpool.prototype.hasUserLoggedin = function(nickname) {
    var id = User.hash(nickname);
    var user = this.get(id);
    if (!user) {
        return false;
    }
    return user.active();
};

module.exports = new Userpool();
