const express = require('express');
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game');
const rndKey = require("random-key");
const cookieParser = require("cookie-parser");

const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const DB = require('./models/DataBase');
const sessionStore = new MySQLStore(DB.options);

application = function(io){
	const app = express();
	app.use(session({
		key: 'session_cookie_name',
		secret: 'session_cookie_secret',
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
		cookie: { path: '/', _expires: null, originalMaxAge: 86400000, httpOnly: true, sameSite: 'lax', secure: false }
	}));
	
	app.use((req, res, next)=>{
		res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.113:3001');
		res.setHeader('Access-Control-Allow-Headers', 'x-www-urlencode, x-Content-Type,  Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		next();
	});
	app.use(cookieParser());
	app.use(express.urlencoded({extended: true}));
	app.use(express.json());
	
	app.use('/images', express.static(path.join(__dirname, 'images')));
	app.use('/', express.static(path.join(__dirname, "public")))
	///////////// Joining routes ///////////////////////
	// app.use('/', (req, res, next) => {
	// 	if(req.method != "OPTIONS") {
	// 		console.log(req.session)
			
	// 	}
	// 	next();
	// });
	app.use('/api/auth', userRoutes.module(io));
	app.use('/api/', gameRoutes(io));
	return app;
}




module.exports = application;