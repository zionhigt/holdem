
class RoomWhiteList{

	constructor(roomId)
	{
		this.id = roomId;
		this.whiteList = [];
	}

	getWhiteList()
	{
		return this.whiteList;
	}

	addUser(userId)
	{
		this.whiteList.push(userId);
	}

	removeUser(userId)
	{
		const userIndexInList = this.whiteList.indexOf(userId);
		if(userIndexInList != -1)
		{
			this.whiteList.splice(userIndexInList, 1);
		}

	}

}

module.exports = RoomWhiteList;