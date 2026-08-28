import { setTheme } from "../../src/config/Theme.js";
import { getCurrentRuntimeIndex } from "../../src/Runtimes.js";
import "../../test/test-elements/Accessor.js";
import "../../test/assets/Themes.js";

describe("Theming works", () => {
	it("Tests that the parameters for the default theme are embedded on boot", () => {
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.wrap({ getCurrentRuntimeIndex })
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.document()
			.its("adoptedStyleSheets")
			.then(adoptedStyleSheets => {
				// eslint-disable-next-line
				return adoptedStyleSheets.find(sh => (sh as Record<string, any>)._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`);
			})
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", "--var1: grey");
	});

	it("Tests that the parameters for the default theme are embedded on boot", () => {
		const newTheme = "sap_fiori_3_hcb";
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.wrap({ getCurrentRuntimeIndex })
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.wrap({ setTheme })
			.invoke("setTheme", newTheme);

		cy.document()
			.its("adoptedStyleSheets")
			.then(adoptedStyleSheets => {
				// eslint-disable-next-line
				return adoptedStyleSheets.find(sh => (sh as Record<string, any>)._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`);
			})
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", "--var1: yellow");
	});

	it("Tests that the parameters for the default theme are embedded on boot", () => {
		const unknownTheme = "sap_unknown_theme";
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.wrap({ getCurrentRuntimeIndex })
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.wrap({ setTheme })
			.invoke("setTheme", unknownTheme);

		cy.document()
			.its("adoptedStyleSheets")
			.then(adoptedStyleSheets => {
				// eslint-disable-next-line
				return adoptedStyleSheets.find(sh => (sh as Record<string, any>)._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`);
			})
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", "--var1: grey");
	});
});
