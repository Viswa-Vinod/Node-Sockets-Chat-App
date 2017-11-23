var socket = io();
socket.on("connect", function() {
	console.log("connnected to server");
});

socket.on("disconnect", function() {
	console.log("disconnected from server");
});

socket.on("newMessage", function(message) {
	console.log("new message", message);
	var li = jQuery("<li></li>");
	li.text(`${message.from}: ${message.text}`);
	jQuery("#messages").append(li);
});

// socket.on("welcomeMsg", function(welcome) {
// 	console.log("welcomeMsg", welcome);
// });

// socket.on("newUserJoined", function(newUserInfo) {
// 	console.log("newUserJoined", newUserInfo);
// });

jQuery("#message-form").on("submit", function(evt) {
	evt.preventDefault();
	socket.emit(
		"createMessage",
		{
			from: "User",
			text: jQuery("[name='message']").val()
		},
		function(ack) {
			console.log("got the ack", ack);
		}
	);
});
