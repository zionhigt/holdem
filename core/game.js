const Dealer = require('./dealer');
const Deck = require("./deck");
const Table = require('./players-queue');

class Game{
    constructor(){
        this.id = "Partie";
        this.deck = new Deck();
        this.dealer = new Dealer(this.deck);
        this.frame = {
            flop: [],
            turn: [],
            river: []
        }
        this.players = [];
        this.isStarted = false;
        this.status = "waiting";
        this.table;

    }

    start() {
        this.isStarted = true;
        this.table = new Table(this.players);
        this.dealer.deck.shuffler();
    }

    addPlayer(player) {
        if(!this.isStarted) {
            player.games[this.id] = {
                walet: 2500,
                cards: []
            };
            this.players.push(player);
        }
        return player;
    }


}

module.exports = Game;