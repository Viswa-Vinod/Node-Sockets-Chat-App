const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const { generateMessage, generateLocationMsg } = require("./utils/message");
const { isRealString } = require("./utils/validations");
const { Users } = require("./utils/users");

var users = new Users();

io.on("connection", socket => {
	console.log("new user connected");

	socket.on("join", (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback("name and room name are required");
		}

		socket.join(params.room);
		users.removeUser(socket.id);

		users.addUser(socket.id, params.name, params.room);
		io
			.to(params.room)
			.emit("updateUserList", users.getUserList(params.room));
		socket.emit(
			"newMessage",
			generateMessage("Admin", "Welcome to the chat app")
		);
		socket.broadcast
			.to(params.room)
			.emit(
				"newMessage",
				generateMessage("Admin", `${params.name} has joined`)
			);
		callback();
	});

	socket.on("createMessage", (createdMessage, ackCB) => {
		const { from, text } = createdMessage;
		io.emit("newMessage", generateMessage(from, text));
		ackCB();
	});

	socket.on("createLocationMsg", ({ latitude, longitude }) => {
		io.emit(
			"newLocationMsg",
			generateLocationMsg("Admin", latitude, longitude)
		);
	});
	socket.on("disconnect", () => {
		var user = users.removeUser(socket.id);
		if (user) {
			io
				.to(user.room)
				.emit("updateUserList", users.getUserList(user.room));
			io
				.to(user.room)
				.emit(
					"newMessage",
					generateMessage("Admin", `${user.name} has left the room`)
				);
		}
	});
});

const publicPath = path.join(__dirname, "..", "/public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
server.listen(port, () => {
	console.log("server listening on ", port);
});
