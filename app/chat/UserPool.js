'use strict';

class UserPool{
    constructor(){
        this.users = [];
    }

    add(user){
        if (this.users.find(u => u.id === user.id)){
            throw new Error('user exist');
        }
        this.users = [...this.users, user];
    }

    get(id){
        return this.users.find(u => u.id === id);
    }

    remove(user){
        if (!user){
            return;
        }
        this.users = this.users.filter(u => u.id !== user.id);
    }
}

module.exports = new UserPool();
