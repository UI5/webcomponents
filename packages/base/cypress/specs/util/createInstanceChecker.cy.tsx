import createInstanceChecker from "../../../src/util/createInstanceChecker.js";

interface MyItem {
	isMyItem: boolean;
}

const isInstanceOfMyItem = createInstanceChecker<MyItem>("isMyItem");

describe("createInstanceChecker", () => {
	it("returns false for undefined", () => {
		expect(isInstanceOfMyItem(undefined)).to.equal(false);
	});

	it("returns false for null", () => {
		expect(isInstanceOfMyItem(null)).to.equal(false);
	});

	it("returns false when the marker property is missing", () => {
		expect(isInstanceOfMyItem({})).to.equal(false);
	});

	it("returns false when the marker property is not strictly true", () => {
		expect(isInstanceOfMyItem({ isMyItem: false })).to.equal(false);
		expect(isInstanceOfMyItem({ isMyItem: 1 })).to.equal(false);
		expect(isInstanceOfMyItem({ isMyItem: "true" })).to.equal(false);
	});

	it("returns true when the marker property is strictly true", () => {
		expect(isInstanceOfMyItem({ isMyItem: true })).to.equal(true);
	});
});
