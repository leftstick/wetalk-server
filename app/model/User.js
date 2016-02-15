'use strict';

var hash = require('../libs/Hash');

class User{
    constructor(){
        var args = Array.prototype.slice.call(arguments);
        this.nickname = args[0];
        this.id = hash(this.nickname);
        if (args === 2){
            this.id = args[0];
            this.nickname = args[1];
        }
    }

    nickname(nickname){
        if (!nickname){
            return this.nickname;
        }
        return (this.nickname = nickname);
    }

    json(){
        return { id: this.id, nickname: this.nickname };
    }
}

module.exports = User;
