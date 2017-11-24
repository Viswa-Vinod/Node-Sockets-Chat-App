class Users {
	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		var user = { id, name, room };
		this.users.push(user);

		return user;
	}

	removeUser(id) {
		var removedUser = this.users.filter(user => user.id === id)[0];

		if (removedUser) {
			this.users = this.users.filter(user => user.id !== id);
		}

		return removedUser;
	}

	getUser(id) {
		return this.users.filter(user => user.id === id)[0];
	}

	getUserList(room) {
		return this.users
			.filter(user => user.room === room)
			.map(user => user.name);
	}

	alreadyExists(name, room) {
		return this.users.filter(user => {
			return user.name === name && user.room === room;
		}).length > 0
			? true
			: false;
	}

	getRoomsList() {
		var rooms = [];

		this.users.map(user => {
			if (rooms.indexOf(user.room) == -1) rooms.push(user.room);
		});

		return rooms.length > 0 ? rooms : null;
	}
}

module.exports = { Users };
