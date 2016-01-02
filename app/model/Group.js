'use strict';

var Hash = require('../libs/Hash');
var UserConnection = require('./UserConnection');

class Group {
    constructor(name, icon, io, owner, event) {
        this.id = Hash(name);
        this.name = name;
        this.icon = icon;
        this.io = io;
        this.owner = owner;

        this.groupChat = null;
        this.userConnection = [];

        this.event = event;
    }

    start() {
        this.groupChat = this.io
            .of('/' + this.id)
            .on('connection', this._receiveClient.bind(this));

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

    _broadcast(message) {
        this.groupChat.emit('message', message);
    }

    _kickUser(userConnection) {
        this.userConnection = this.userConnection.filter(conn => conn !== userConnection);
        this.groupChat.emit('group-user-removed', userConnection.json());

        this.event.emit('group-user-removed', this);
    }

    _userAdded(user) {
        this.groupChat.emit('group-user-added', user);

        this.event.emit('group-user-added', this);
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
