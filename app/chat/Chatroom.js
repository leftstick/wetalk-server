'use strict';

var EventEmitter = require('events').EventEmitter;

class Chatroom{
    constructor(io){
        this.groups = [];
        this.io = io;

        this.chatroom = null;

        this.event = new EventEmitter();

        this._start();
    }

    _start(){
        this.chatroom = this.io
            .of('/chatroom');

        this.event.on('group-user-added', this._groupUserUpdated.bind(this));
        this.event.on('group-user-removed', this._groupUserUpdated.bind(this));
    }

    _groupUserUpdated(group){
        this.chatroom.emit('group-user-updated', group.json());
    }

    add(group){
        if (typeof group !== 'object'){
            return;
        }
        this.groups = [...this.groups, group];
        this.chatroom.emit('group-added', group.json());
        return group;
    }

    remove(group){
        if (typeof group !== 'object'){
            return;
        }
        this.groups = this.groups.filter(g => g.id !== group.id);
        this.chatroom.emit('group-removed', group.json());
    }

    contains(group){
        if (typeof group !== 'object'){
            return;
        }
        return !!this.groups.find(g => g.id === group.id);
    }

    json(){
        return this.groups;
    }
}

module.exports = Chatroom;
