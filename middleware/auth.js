// authorization
const jwt = require('jsonwebtoken');

const getCookies = function (cookie) {
	console.log(cookie, "here")
	const cookies = cookie.split("; ");
	const cookiesLines = cookies.map(function (cookie, index) {
		const cookieKeyValue = cookie.split('=');
		const cookieKey = cookieKeyValue[0];
		const cookieValue = cookieKeyValue[1];
		const cookieLine = `"${cookieKey}": "${cookieValue}"`;
		return cookieLine;
	})
	return JSON.parse(`{${cookiesLines.join(",\r\n")}}`);
}

module.exports = (req, res, next) =>
{
	try
	{
		const token = req.headers.authorization.split(' ')[1];
		const tokenUserId = jwt.verify(token, 'RANDOM_TOKEN_SECRET').userId;
		if(tokenUserId && tokenUserId === req.body.userId)
		{
			next();
		}
		else
		{
			throw  "Not allowed";
		}
	}
	catch(error)
	{
		res.status(403).json({  error });
	}

}