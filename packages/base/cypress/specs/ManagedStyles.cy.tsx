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
		});

		it("removeStyle removes the sheet and hasStyle returns false", () => {
			cy.wrap({ createStyle }).invoke("createStyle", ":root { --test: 2; }", "test-style-remove", "val2");

			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style-remove", "val2").should("equal", true);

			cy.wrap({ removeStyle }).invoke("removeStyle", "test-style-remove", "val2");

			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style-remove", "val2").should("equal", false);
		});

		it("updateStyle changes the sheet content", () => {
			cy.wrap({ createStyle }).invoke("createStyle", ":root { --test-update: old; }", "test-style-update", "val3");

			cy.wrap({ updateStyle }).invoke("updateStyle", ":root { --test-update: new; }", "test-style-update", "val3");

			cy.document().its("adoptedStyleSheets").then(sheets => {
				// Find the sheet by iterating — without expando reliance
				const match = [...sheets].find(sh => {
					try { return sh.cssRules[0]?.cssText?.includes("--test-update: new"); } catch { return false; }
				});
				expect(match).to.exist;
			});
		});

		it("createOrUpdateStyle creates when absent and updates when present", () => {
			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style-cou", "val4").should("equal", false);

			cy.wrap({ createOrUpdateStyle }).invoke("createOrUpdateStyle", ":root { --cou: 1; }", "test-style-cou", "val4");

			cy.wrap({ hasStyle }).invoke("hasStyle", "test-style-cou", "val4").should("equal", true);

			cy.wrap({ createOrUpdateStyle }).invoke("createOrUpdateStyle", ":root { --cou: 2; }", "test-style-cou", "val4");

			cy.document().its("adoptedStyleSheets").then(sheets => {
				const match = [...sheets].find(sh => {
					try { return sh.cssRules[0]?.cssText?.includes("--cou: 2"); } catch { return false; }
				});
				expect(match).to.exist;
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
				const match = [...sheets].find(sh => {
					try { return sh.cssRules[0]?.cssText?.includes("--var1"); } catch { return false; }
				});
				expect(match).to.exist;
				expect(match!.cssRules[0].cssText).to.include("--var1: grey");
			});

			cy.wrap({ setTheme }).invoke("setTheme", "sap_fiori_3_hcb");

			cy.document().its("adoptedStyleSheets").then(sheets => {
				// Same sheet should now have updated content — number of sheets should not grow
				const matches = [...sheets].filter(sh => {
					try { return sh.cssRules[0]?.cssText?.includes("--var1"); } catch { return false; }
				});
				// Only one sheet for this package (no duplicates)
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
