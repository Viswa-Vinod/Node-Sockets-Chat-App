var socket = io();
socket.on("connect", function() {
	console.log("connnected to server");
});

socket.on("disconnect", function() {
	console.log("disconnected from server");
});

socket.on("newMessage", function(message) {
	var formattedTime = moment(message.createdAt).format("h:mm a");
	var template = jQuery("#msg-template").html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery("#messages").append(html);
});

socket.on("newLocationMsg", function(loc) {
	var template = jQuery("#loc-msg-template").html();
	var formattedTime = moment(loc.createdAt).format("h:mm a");
	var html = Mustache.render(template, {
		from: loc.from,
		url: loc.url,
		createdAt: formattedTime
	});

	jQuery("#messages").append(html);
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
