'use strict';

class Chatroom {
    constructor() {
        this.groups = [];
        this.io = null;
    }

    add(group) {
        if (typeof group !== 'object') {
            return;
        }
        this.groups = [...this.groups, group];
        return group;
    }

    remove(group) {
        if (typeof group !== 'object') {
            return;
        }
        this.groups = this.groups.filter(g => g.id !== group.id);
    }

    contains(group) {
        if (typeof group !== 'object') {
            return;
        }
        return !!this.groups.find(g => g.id === group.id);
    }

    json() {
        return this.groups;
    }
}

module.exports = new Chatroom();
