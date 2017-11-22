var socket = io();
socket.on("connect", function() {
	console.log("connnected to server");
});

socket.on("disconnect", function() {
	console.log("disconnected from server");
});

socket.on("newMessage", function(message) {
	console.log("new message", message);
});

socket.on("welcomeMsg", function(welcome) {
	console.log("welcomeMsg", welcome);
});

socket.on("newUserJoined", function(newUserInfo) {
	console.log("newUserJoined", newUserInfo);
});
