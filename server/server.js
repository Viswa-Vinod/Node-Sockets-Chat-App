const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

io.on("connection", socket => {
	console.log("new user connected");

	socket.on("createMessage", createdMessage => {
		console.log("createMessage", createdMessage);
		io.emit("newMessage", {
			from: createdMessage.from,
			text: createdMessage.text,
			createdAt: new Date().getTime()
		});
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
