import { setTheme } from "../../src/config/Theme.js";
import { getCurrentRuntimeIndex } from "../../src/Runtimes.js";
import { hasStyle } from "../../src/ManagedStyles.js";
import "../../test/test-elements/Accessor.js";
import "../../test/assets/Themes.js";

const findThemeSheet = (adoptedStyleSheets: ReadonlyArray<CSSStyleSheet>) => {
	return adoptedStyleSheets.find(sh => {
		try { return sh.cssRules[0]?.cssText?.includes("--var1"); } catch { return false; }
	});
};

describe("Theming works", () => {
	it("Tests that the parameters for the default theme are embedded on boot", () => {
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.wrap({ getCurrentRuntimeIndex })
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.wrap({ hasStyle })
			.invoke("hasStyle", dataPropAttr, "@ui5/webcomponents-base-test")
			.should("equal", true);

		cy.document()
			.its("adoptedStyleSheets")
			.then(findThemeSheet)
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", "--var1: grey");
	});

	it("Tests that the parameters are updated when the theme changes to sap_fiori_3_hcb", () => {
		const newTheme = "sap_fiori_3_hcb";
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.wrap({ getCurrentRuntimeIndex })
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.wrap({ setTheme })
			.invoke("setTheme", newTheme);

		cy.wrap({ hasStyle })
			.invoke("hasStyle", dataPropAttr, "@ui5/webcomponents-base-test")
			.should("equal", true);

		cy.document()
			.its("adoptedStyleSheets")
			.then(findThemeSheet)
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", "--var1: yellow");
	});

	it("Tests that an unknown theme falls back to the default theme parameters", () => {
		const unknownTheme = "sap_unknown_theme";
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.wrap({ getCurrentRuntimeIndex })
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.wrap({ setTheme })
			.invoke("setTheme", unknownTheme);

		cy.wrap({ hasStyle })
			.invoke("hasStyle", dataPropAttr, "@ui5/webcomponents-base-test")
			.should("equal", true);

		cy.document()
			.its("adoptedStyleSheets")
			.then(findThemeSheet)
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", "--var1: grey");
	});
});
