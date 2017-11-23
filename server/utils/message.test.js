const expect = require("chai").expect;
const { generateMessage, generateLocationMsg } = require("./message");

describe("generateMessage", () => {
	it("should generate the correct message object", () => {
		var from = "Vinod",
			text = "How are you?",
			msgObj = generateMessage(from, text);

		expect(msgObj).to.include({ from, text });
		expect(msgObj.from).to.equal(from);
		expect(msgObj.text).to.equal(text);
		expect(msgObj.createdAt).to.be.a("number");
	});
});

describe("generateLocationMsg", () => {
	it("should generate the correct location object", () => {
		var from = "Vinod",
			lat = 123,
			long = 234,
			locObj = generateLocationMsg(from, lat, long),
			baseURL = "https://www.google.com/maps?q=",
			url = `${baseURL}${lat},${long}`;

		expect(locObj).to.include({ from, url });
		expect(locObj.url).to.equal(url);
		expect(locObj.createdAt).to.be.a("number");
	});
});
