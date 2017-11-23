const moment = require("moment");

var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: moment().valueOf()
	};
};

const BaseURL = "https://www.google.com/maps?q=";
var generateLocationMsg = (from, lat, long) => {
	return {
		from,
		url: `${BaseURL}${lat},${long}`,
		createdAt: moment().valueOf()
	};
};

module.exports = { generateMessage, generateLocationMsg };
