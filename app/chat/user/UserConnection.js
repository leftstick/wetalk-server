'use strict';

var loggedInUsers = require('./LoggedInUsers');

class UserConnection {
    constructor(socket, event) {
        this.socket = socket;
        this.event = event;
        this.user = null;
    }

    initialize(id) {
        this.user = loggedInUsers.get(id);
    }

    start() {
        this.socket
            .on('init', this.initialize.bind(this))
            .on('message', this.message.bind(this))
            .on('disconnect', this.destroy.bind(this));
        return this;
    }

    message(message) {
        this.event.emit('send-message', message);
    }

    destroy() {
        this.event.emit('user-offline', this);
    }

    json() {
        return this.user && this.user.json();
    }
}

module.exports = UserConnection;
