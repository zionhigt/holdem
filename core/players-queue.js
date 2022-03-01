class PlayersQueue{
    constructor(users){
        this.users = users;
        this.stack = Object.keys(users);
    }
    
    push(playerToken){
        if(this.users[playerToken]) {
            this.users[playerToken].isPlaying = false;
            this.stack.push(playerToken);
        }
        return
    }

    removeTop(){
        this.stack.splice(0, 1);
        return
    }
    
    getTop(){
        return this.users[this.stack[0]];
    }

    updateAbleToPlay(){
        this.stack.forEach(function(token, index){
            this.users[token].isPlaying = false;
        }.bind(this));
        
        this.users[this.stack[0]].isPlaying = true;
        return this.users;
    }

    nextPlayer(token){
        if(token === this.stack[0]) {
            this.removeTop();
            this.push(token);
            
        }
        console.log(this.stack)
        return this.updateAbleToPlay();
    }

    setToken(oldToken, newToken){
        const player = this.users[oldToken];
        delete this.users[oldToken];
        console.log(this.users);
        this.users[newToken] = player;
        const indexOfOld = this.stack.indexOf(oldToken);
        this.stack.splice(indexOfOld, 1, newToken);
        console.log(this.users);
    }
}

module.exports = PlayersQueue;