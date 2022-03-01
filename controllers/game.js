exports.lauchedDice = (io) => {
	return (req, res, next) => {
		if(io.playersQueue.getTop() === io.users[req.session.user.id]) {
			io.users[req.session.user.id].score += req.body.score;
			io.playersQueue.nextPlayer(req.session.user.id);
		}
		io.emit("salon", io.users);
		res.status(200).json({ message: "Lancés" });
	}
}
exports.joinGame = (io, game) => {
	return (req, res, next) => {
		// if (io.playersQueue.getTop() === io.users[req.session.socketToken]) {
		// 	io.users[req.session.socketToken].score += req.body.score;
		// 	io.playersQueue.nextPlayer(req.session.socketToken);
		// }

		req.session.user.games = {};	
		const player = game.addPlayer(req.session.user);
		io.emit("salon", player);
		res.status(200).json({message: "Partie rejointe"});
	}
}

exports.startGame = (io, game) => {
	return (req, res) => {
		game.start();
		res.status(200).json({message: "Partie lancée"});
	}
}