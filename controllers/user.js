const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Cookies = require('cookies')
const rndKey = require('random-key');

exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10)
		.then(hash => {
			User.createUser([req.body.email, hash])
				.then(user => {
					res.status(201).json({ message: 'User created !' });
				})
				.catch(err => {
					if (err.code == 'ER_DUP_ENTRY') {
						res.status(403).json({ error: "Adresse email déja utilisée" })

					}
					else {
						res.status(500).json({ err })

					}
					console.log(err)
				});
		})
		.catch(error => res.status(500).json({ error }));

};

exports.delAcount = (req, res) => {
	User.deleteUser(req.session.user.email)
		.then(() => {

			res.status(200).json({ message: "Compte supprimer" });
		})
		.catch(error => { console.log(error); res.status(500).json({ error }) });
}
exports.signin = io => {
	return (req, res, next) => {
	if(!req.body.email){res.status(401).json({error: "No email found !"})}
	User.searchUser([req.body.email])
		.then(user => {
			if (user.length > 0) {
				bcrypt.compare(req.body.password, user[0].password)
					.then(valide => {
						if (!valide) {
							res.status(401).json({ error: "Mot de passe incorecte" })
						}
						console.log("done")
						// req.session.user = user[0];
						// console.log(Object.keys(req.socket))
						// req.sessionID = user[0].id;
						// req.socket.join('mainRoom');
						const token = jwt.sign(
							{ userId: user[0].id },
							process.env.SECRET_TOKEN,
							{ expiresIn: '24h' }
						)


						
						req.session.user = user[0];
						delete req.session.user.password;
						req.session.socketToken = req.body.socketToken;
						// res.status(200).json({ userId: user[0].id, roomkey: req.session.user.roomkey });
						// req.session.save(() => {
							// })
							// .then()
							// .catch(error => res.status(302).json({ error }))
							
						io.users[req.session.socketToken] = {
							email: req.body.email,
							score: 0,
							isPlaying: false
						}
						io.playersQueue.push(req.session.user.id);
						io.playersQueue.updateAbleToPlay();
						const cookie = new Cookies(req, res).set('access_token', token, {
							path: '/',
							maxAge: 86400000,
								httpOnly: false,
								sameSite: 'lax',
								secure: false
							}
						);
						io.emit("salon", io.users)
						res.status(200).json({userId: user[0].id});
					})
					.catch(error => res.status(500).json({ error }));
				}
		})
		.catch(error => { console.log(error); res.status(403).json({ error: "Aucuns utilisateur n'a été trouvé !" }) })
}
}

exports.signout = (req, res) => {
	if (!req.session.user) {
		res.status(401).json({ message: "Aucune session en cour !" });
	}
	else {
		req.session.destroy();
		delete req.session;
		res.status(200).json({ message: "Aurevoir !" });
	}
};

exports.getUserProfil = (req, res) => {
	if (!req.session.profil) {
		User.getProfil(req.session.user.id)
			.then(profil => {
				req.session.profil = profil[0];
				req.session.profil.isActive = 1;
				res.status(200).json(profil);
			})
			.catch(error => { console.log(error); res.status(500).json({ error }) });

	}
	else {
		res.status(200).json(req.session.profil);
	}
};

exports.setUserProfil = (req, res) => {

	if (!req.session.profil) {
		User.getProfil(req.session.user.id)
			.then(profil => {
				req.session.profil = profil[0];
				rq.session.profil.isActive = 1;
			})
			.catch(error => { console.log(error); res.status(500).json({ error }) });

	}
	const body = JSON.parse(req.body.body)
	let profil = body;
	Object.keys(body).forEach(key => {
		if (body[key] === req.session.profil[key] || body[key] == "") {
			delete profil[key]
		}
	});
	if (req.file != undefined) {
		const imagePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
		profil = {
			...profil,
			picture: imagePath
		}
		const filename = req.session.profil.picture.split('/images/')[1]
		fs.unlink(`images/${filename}`, () => { });
	}
	User.updateProfil(profil, req.session.profil.id)
		.then(() => {

			User.getProfil(req.session.user.id)
				.then(profil => {
					req.session.profil = profil[0];
					res.status(200).json(profil);
				})
				.catch(error => { console.log(error); res.status(500).json({ error }) });
		})
		.catch(error => { console.log(error); res.status(500).json({ error }) });

};

exports.getConnected = (req, res) => {
	User.getConnectedUsers()
		.then(users => {
			res.status(200).json(users);
		})

		.catch(error => { console.log(error); res.status(500).json({ error }) })
}
