exports.connect = (req, res, next) => {
	setTimeout(()=>{
		
	}, 10000);

	req.socket.on('rooms', ()=>{
		console.log("emited");
		req.socket.emit('FromAPI', req.session.email);
	})
	
};

