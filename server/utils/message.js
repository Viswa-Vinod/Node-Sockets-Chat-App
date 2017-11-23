var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: new Date().getTime()
	};
};

const BaseURL = "https://www.google.com/maps?q=";
var generateLocationMsg = (from, lat, long) => {
	return {
		from,
		url: `${BaseURL}${lat},${long}`,
		createdAt: new Date().getTime()
	};
};

module.exports = { generateMessage, generateLocationMsg };
