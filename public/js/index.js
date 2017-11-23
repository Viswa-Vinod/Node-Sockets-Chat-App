var socket = io();
socket.on("connect", function() {
	console.log("connnected to server");
});

socket.on("disconnect", function() {
	console.log("disconnected from server");
});

socket.on("newMessage", function(message) {
	// console.log("new message", message);
	var li = jQuery("<li></li>");

	li.text(`${message.from}: ${message.text}`);
	jQuery("#messages").append(li);
});

socket.on("newLocationMsg", function(loc) {
	var li = jQuery("<li></li>");
	var a = jQuery('<a target="_blank">My Current Loc</a>');
	li.text(`${loc.from}: `);
	a.attr("href", loc.url);
	li.append(a);
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

var locationBtn = jQuery("#send-location");
locationBtn.on("click", function() {
	if (!navigator.geolocation) {
		return alert("geolocation not supported by your browser");
	}
	navigator.geolocation.getCurrentPosition(
		function(position) {
			var { latitude, longitude } = position.coords;
			socket.emit("createLocationMsg", {
				latitude,
				longitude
			});
		},
		function() {
			alert("unable to fetch location");
		}
	);
});
