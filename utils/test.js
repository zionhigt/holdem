const WhiteList = require('./rooms_whitelist.js');

const roomId = "testRoom";
const userIds = [0, 1, 2, 3];

const whiteList = new WhiteList(roomId);

userIds.forEach(u => {
	whiteList.addUser(u);
});

console.log(whiteList.getWhiteList())
whiteList.removeUser(2);
console.log(whiteList.getWhiteList())
whiteList.addUser(2);
console.log(whiteList.getWhiteList())