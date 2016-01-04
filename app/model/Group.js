'use strict';

var Hash = require('../libs/Hash');
var UserConnection = require('./UserConnection');
var EventEmitter = require('events').EventEmitter;

class Group {
    constructor(name, icon, io, owner, globalEvent) {
        this.id = Hash(name);
        this.name = name;
        this.icon = icon;
        this.io = io;
        this.owner = owner;

        this.groupChat = null;
        this.userConnection = [];

        this.globalEvent = globalEvent;
        this.event = new EventEmitter();
    }

    start() {
        this.io
            .of('/' + this.name)
            .on('connection', this._receiveClient.bind(this));

        this.groupChat = this.io.in(this.name);

        this.event.on('user-offline', this._kickUser.bind(this));
        this.event.on('send-message', this._broadcast.bind(this));
        this.event.on('user-added', this._userAdded.bind(this));
    }

    _receiveClient(socket) {
        this.userConnection = [
            ...this.userConnection,
            new UserConnection(socket, this.event).start()
        ];
    }

    _broadcast(socket, message) {
        socket.broadcast.emit('message', message);
    }

    _kickUser(socket, userConnection) {
        this.userConnection = this.userConnection.filter(conn => conn !== userConnection);
        socket.broadcast.emit('group-user-removed', userConnection.json());

        this.globalEvent.emit('group-user-removed', this);
    }

    _userAdded(socket, user) {
        socket.broadcast.emit('group-user-added', user);

        this.globalEvent.emit('group-user-added', this);
    }

    contains(user) {
        return !!this.userConnection.find(u => u.id === user.id);
    }

    json() {
        return {
            id: this.id,
            name: this.name,
            icon: this.icon,
            users: this.userConnection.filter(conn => !!conn.user).map(conn => conn.json())
        };
    }
}

module.exports = Group;
