const expect = require("chai").expect;
const { generateMessage } = require("./message");

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
