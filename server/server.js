const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const { generateMessage, generateLocationMsg } = require("./utils/message");

io.on("connection", socket => {
	console.log("new user connected");
	socket.emit(
		"newMessage",
		generateMessage("Admin", "Welcome to the chat app")
	);
	socket.broadcast.emit(
		"newMessage",
		generateMessage("Admin", "New User Joined")
	);
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
		console.log("client disconnected");
	});
});

const publicPath = path.join(__dirname, "..", "/public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
server.listen(port, () => {
	console.log("server listening on ", port);
});
