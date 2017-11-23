var socket = io();
socket.on("connect", function() {
	console.log("connnected to server");
});

socket.on("disconnect", function() {
	console.log("disconnected from server");
});

socket.on("newMessage", function(message) {
	// console.log("new message", message);
	var formattedTime = moment(message.createdAt).format("h:mm a");

	var li = jQuery("<li></li>");

	li.text(`${message.from}: ${formattedTime}: ${message.text}`);
	jQuery("#messages").append(li);
});

socket.on("newLocationMsg", function(loc) {
	var li = jQuery("<li></li>");
	var a = jQuery('<a target="_blank">My Current Loc</a>');
	var formattedTime = moment(loc.createdAt).format("h:mm a");

	li.text(`${loc.from}: ${formattedTime}: `);
	a.attr("href", loc.url);
	li.append(a);
	jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(evt) {
	evt.preventDefault();
	var msgTxtBox = jQuery("[name='message']");
	socket.emit(
		"createMessage",
		{
			from: "User",
			text: msgTxtBox.val()
		},
		function(ack) {
			msgTxtBox.val("");
		}
	);
});

var locationBtn = jQuery("#send-location");
locationBtn.on("click", function() {
	if (!navigator.geolocation) {
		return alert("geolocation not supported by your browser");
	}

	locationBtn.attr("disabled", "disabled").text("Sending location...");
	navigator.geolocation.getCurrentPosition(
		function(position) {
			locationBtn.removeAttr("disabled").text("Send location");
			var { latitude, longitude } = position.coords;
			socket.emit("createLocationMsg", {
				latitude,
				longitude
			});
		},
		function() {
			locationBtn.removeAttr("disabled").text("Send location");
			alert("unable to fetch location");
		}
	);
});
