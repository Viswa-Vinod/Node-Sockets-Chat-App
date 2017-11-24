var socket = io();

function scrollToBottom() {
	//selectors
	var messages = jQuery("#messages");
	var newMsg = messages.children("li:last-child");
	//heights
	var clientHeight = messages.prop("clientHeight");
	var scrollTop = messages.prop("scrollTop");
	var scrollHeight = messages.prop("scrollHeight");
	var newMsgHeight = newMsg.innerHeight();
	var lastMsgHeight = newMsg.prev().innerHeight();

	if (
		clientHeight + scrollTop + newMsgHeight + lastMsgHeight >=
		scrollHeight
	) {
		messages.scrollTop(scrollHeight);
	}
}
socket.on("connect", function() {
	var params = jQuery.deparam(window.location.search);
	socket.emit("join", params, function(err) {
		if (err) {
			alert(err);
			window.location.href = "/";
		} else {
			console.log("no error in joining room");
		}
	});
});

socket.on("disconnect", function() {
	console.log("disconnected from server");
});

socket.on("updateUserList", function(users) {
	var ol = jQuery("<ol></ol>");
	users.forEach(user => {
		ol.append(jQuery("<li></li>").text(user));
	});

	jQuery("#users").html(ol);
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
	scrollToBottom();
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
	scrollToBottom();
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
