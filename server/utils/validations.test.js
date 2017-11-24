const expect = require("chai").expect;
const { isRealString } = require("./validations");

describe("validations", () => {
	it("should reject string with non-string values", () => {
		var str = 3,
			realStr = isRealString(str);
		expect(realStr).to.be.false;
	});

	it("should reject string with only spaces", () => {
		var str = "  ",
			realStr = isRealString(str);
		expect(realStr).to.be.false;
	});

	it("should allow strings with non-space chars", () => {
		var str = "  lotr lotr",
			realStr = isRealString(str);
		expect(realStr).to.be.true;
	});
});
