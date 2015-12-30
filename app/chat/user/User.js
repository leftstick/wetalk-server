'use strict';

var Hash = require('../../../libs/Hash');

var User = function(nickname) {
    this.id = Hash(nickname);
    this.nickname = nickname;
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
