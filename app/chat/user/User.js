'use strict';

var Hash = require('../../../libs/Hash');

var User = function() {
    var args = Array.prototype.slice.call(arguments);
    this.nickname = args[0];
    this.id = Hash(this.nickname);
    if (args === 2) {
        this.id = args[0];
        this.nickname = args[1];
    }
};

User.prototype.nickname = function(nickname) {
    if (!nickname) {
        return this.nickname;
    }
    return this.nickname = nickname;
};

User.prototype.json = function() {
    return {id: this.id, nickname: this.nickname};
};

module.exports = User;
