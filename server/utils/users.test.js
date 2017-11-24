const expect = require("chai").expect;

const { Users } = require("./users");

describe("Users", () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [
			{
				id: 1,
				name: "Mike",
				room: "Node course"
			},
			{
				id: 2,
				name: "Vinod",
				room: "Node course"
			},
			{
				id: 3,
				name: "Akshay",
				room: "JS course"
			}
		];
	});

	it("should add new user", () => {
		var users = new Users();
		var user = { id: 123, name: "Vinod", room: "A" };
		var addedUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).to.deep.equal([user]);
	});

	it("should remove a user", () => {
		expect(users.removeUser(1)).to.deep.equal({
			id: 1,
			name: "Mike",
			room: "Node course"
		});
	});

	it("should not remove a user", () => {
		expect(users.removeUser(10)).to.be.undefined;
	});

	it("should find user", () => {
		expect(users.getUser(1)).to.deep.equal({
			id: 1,
			name: "Mike",
			room: "Node course"
		});
	});

	it("should not find user", () => {
		expect(users.getUser(10)).to.be.undefined;
	});

	it("should return names for node course", () => {
		var userList = users.getUserList("Node course");

		expect(userList).to.deep.equal(["Mike", "Vinod"]);
	});

	it("should return names for JS course", () => {
		var userList = users.getUserList("JS course");

		expect(userList).to.deep.equal(["Akshay"]);
	});
});
