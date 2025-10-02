import { assert } from "chai";

const getVisibleItems = async (combo) => {
	const items = await combo.$$("ui5-mcb-item");
	const filteredItems = await Promise.all(items.map(async item => {
			return (await item.getProperty("_isVisible")) ? item : null;
	}));

	// filter out null values
	return filteredItems.filter(item => item !== null);
};

const getVisibleGroupItems = async (combo) => {
	const items = await combo.$$("ui5-mcb-item-group");
	const assignedItems = await Promise.all(items.map(async item => {
		return (await item.getProperty("assignedSlot")) ? item : null;
	}));

	return assignedItems.filter(item => item !== null);
};

describe("MultiComboBox general interaction", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
		await browser.setWindowSize(1920, 1080);
	});

	describe("keyboard handling", () => {
		it("should copy a token with CTRL+C and paste it with CTRL+V", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "c"]);
			await input.click();
			await input.keys(["Control", "v"]);

			assert.strictEqual(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
			assert.ok(await mcb2.getProperty("open"), "Popover should be open");

			await input.keys(["Control", "v"]);

			assert.equal(await mcb2.getProperty("value"), "CondensedCondensed", "Pasting second time should append the as text");
		});

		it("should not be able to paste token with CTRL+V in read only multi combo box", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#readonly-value-state-mcb");
			const input = await mcb2.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "c"]);
			await input.click();
			await input.keys(["Control", "v"]);

			const mcb2Tokens = await mcb2.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await mcb2.getProperty("value"), "", "Token is not pasted into the second control");
			assert.equal(mcb2Tokens.length, 0, "No token was created.");
		});

		it("should cut a token with CTRL+X and paste it with CTRL+V", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "x"]);

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 2, "One of the tokens is cut from the control");

			await input.click();
			await input.keys(["Control", "v"]);

			assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
		});

		it("should cut a token with SHIFT+DELETE and paste it with SHIFT+INSERT", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Shift", "Delete"]);

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 2, "One of the tokens is cut from the control");

			await input.click();
			await input.keys(["Shift", "Insert"]);

			assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
		});

		it("should copy a token with CTRL+INSERT and paste it with SHIFT+INSERT", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "Insert"]);
			await input.click();
			await input.keys(["Shift", "Insert"]);

			assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
		});
	});
});
