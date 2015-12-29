'use strict';

var Hash = require('../../../libs/Hash');

var User = function(id, nickname) {
    this.id = id;
    this.nickname = nickname;
    this.isActive = false;
};

User.prototype.nickname = function(nickname) {
    if (!nickname) {
        return this.nickname;
    }
    return this.nickname = nickname;
};

User.prototype.active = function(isActive) {
    if (typeof isActive !== 'boolean') {
        return this.isActive;
    }
    return this.isActive = isActive;
};

User.hash = function(nickname) {
    return Hash(nickname);
};

module.exports = User;
