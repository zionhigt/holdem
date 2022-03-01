const express = require('express');
const router = express.Router();

const gameCtrl = require('../controllers/game');
const sock = require('../controllers/sockController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');
const Game = require('../core/game')

const game = new Game();
module.exports = function(io){
    if(io){
        router.get('/game/join', gameCtrl.joinGame(io, game));
        router.get('/game/start', gameCtrl.startGame(io, game));
    }
    return router;
}