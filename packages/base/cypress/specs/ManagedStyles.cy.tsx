import { createStyle, hasStyle, updateStyle, removeStyle, createOrUpdateStyle } from "../../src/ManagedStyles.js";
import { setTheme } from "../../src/config/Theme.js";
import { getCurrentRuntimeIndex } from "../../src/Runtimes.js";
import TestGeneric from "../../test/test-elements/Generic.js";
import "../../test/assets/Themes.js";

describe("ManagedStyles", () => {
	describe("Map-based sheet tracking (Safari-safe)", () => {
		it("hasStyle returns false before createStyle and true after", () => {
			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style", "val1").should("equal", false);

			cy.wrap({ createStyle }).invoke("createStyle", ":root { --test: 1; }", "test-style", "val1");

			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style", "val1").should("equal", true);

			cy.document().its("adoptedStyleSheets").then(sheets => {
				// eslint-disable-next-line
				const sheet = [...sheets].find(sh => (sh as Record<string, any>)._ui5StyleId === "test-style|val1");
				expect(sheet).to.exist;
			});
		});

		it("removeStyle removes the sheet and hasStyle returns false", () => {
			cy.wrap({ createStyle }).invoke("createStyle", ":root { --test: 2; }", "test-style-remove", "val2");

			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style-remove", "val2").should("equal", true);

			cy.document().its("adoptedStyleSheets").then(sheets => {
				// eslint-disable-next-line
				const sheet = [...sheets].find(sh => (sh as Record<string, any>)._ui5StyleId === "test-style-remove|val2");
				expect(sheet).to.exist;
			});

			cy.wrap({ removeStyle }).invoke("removeStyle", "test-style-remove", "val2");

			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style-remove", "val2").should("equal", false);

			cy.document().its("adoptedStyleSheets").then(sheets => {
				// eslint-disable-next-line
				const sheet = [...sheets].find(sh => (sh as Record<string, any>)._ui5StyleId === "test-style-remove|val2");
				expect(sheet).to.not.exist;
			});
		});

		it("updateStyle changes the sheet content", () => {
			cy.wrap({ createStyle }).invoke("createStyle", ":root { --test-update: old; }", "test-style-update", "val3");

			cy.wrap({ updateStyle }).invoke("updateStyle", ":root { --test-update: new; }", "test-style-update", "val3");

			cy.document().its("adoptedStyleSheets").then(sheets => {
				// eslint-disable-next-line
				const sheet = [...sheets].find(sh => (sh as Record<string, any>)._ui5StyleId === "test-style-update|val3");
				expect(sheet).to.exist;
				expect(sheet!.cssRules[0].cssText).to.include("--test-update: new");
			});
		});

		it("createOrUpdateStyle creates when absent and updates when present", () => {
			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style-cou", "val4").should("equal", false);

			cy.wrap({ createOrUpdateStyle }).invoke("createOrUpdateStyle", ":root { --cou: 1; }", "test-style-cou", "val4");

			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style-cou", "val4").should("equal", true);

			cy.wrap({ createOrUpdateStyle }).invoke("createOrUpdateStyle", ":root { --cou: 2; }", "test-style-cou", "val4");

			cy.document().its("adoptedStyleSheets").then(sheets => {
				// eslint-disable-next-line
				const sheet = [...sheets].find(sh => (sh as Record<string, any>)._ui5StyleId === "test-style-cou|val4");
				expect(sheet).to.exist;
				expect(sheet!.cssRules[0].cssText).to.include("--cou: 2");
			});
		});
	});

	describe("Theme change updates adoptedStyleSheets correctly", () => {
		it("sheet content reflects the new theme after setTheme", () => {
			const currentRuntime = getCurrentRuntimeIndex();
			const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

			cy.mount(<TestGeneric />);

			cy.wrap({ setTheme }).invoke("setTheme", "sap_horizon");

			cy.document().its("adoptedStyleSheets").then(sheets => {
				// eslint-disable-next-line
				const sheet = [...sheets].find(sh => (sh as Record<string, any>)._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`);
				expect(sheet).to.exist;
				expect(sheet!.cssRules[0].cssText).to.include("--var1: grey");
			});

			cy.wrap({ setTheme }).invoke("setTheme", "sap_fiori_3_hcb");

			cy.document().its("adoptedStyleSheets").then(sheets => {
				// eslint-disable-next-line
				const matches = [...sheets].filter(sh => (sh as Record<string, any>)._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`);
				// Same sheet updated in place — no duplicates
				expect(matches).to.have.length(1);
				expect(matches[0].cssRules[0].cssText).to.include("--var1: yellow");
			});
		});

		it("switching themes does not accumulate duplicate sheets in adoptedStyleSheets", () => {
			const currentRuntime = getCurrentRuntimeIndex();
			const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

			cy.mount(<TestGeneric />);

			cy.wrap({ setTheme }).invoke("setTheme", "sap_horizon");
			cy.wrap({ setTheme }).invoke("setTheme", "sap_fiori_3");
			cy.wrap({ setTheme }).invoke("setTheme", "sap_fiori_3_dark");

			cy.document().its("adoptedStyleSheets").then(sheets => {
				const sheetCount = sheets.length;

				cy.wrap({ setTheme }).invoke("setTheme", "sap_horizon");

				cy.document().its("adoptedStyleSheets").then(sheetsAfter => {
					expect(sheetsAfter.length).to.equal(sheetCount);
				});
			});
		});
	});
});
