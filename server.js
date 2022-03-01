const http = require('http');
const app = require('./app');
const server = function(io) {
	const application = app(io)
	const httpServer = http.createServer(application);
	httpServer.on('listening', () => {
		console.log(`Listening on ${bind}`);
	});

	httpServer.on("error", (error => {
		errorHandler(error);
	}));
	application.set('port', port);

	return httpServer;
};


const normalizePort = val => {
	const port = parseInt(val, 10);
	if(isNaN(port))
	{
		return val;
	}
	if(port >= 0)
	{
		return port;
	}

	return false;
};

const port = normalizePort(process.env.PORT || '3001');
const address = server().address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

const errorHandler = error => {
	if(error.syscall !== "listen")
	{
		throw error;
	}

	switch (error.code)
	{
		case 'EACCES':
			console.error(bind + ' required elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

exports.module = { server , port };