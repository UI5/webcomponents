import { registerThemePropertiesLoader } from "../../src/AssetRegistry.js";
import { setTheme } from "../../src/config/Theme.js";
import TestGeneric from "../../test/test-elements/Generic.js";

describe("Custom themes can be registered", () => {
	it("Tests that theme parameters are changed on theme change", () => {
		const newTheme = "my_custom_theme";
		const var1 = "--var1: #555555";

		cy.mount(<TestGeneric />);

		cy.wrap({ registerThemePropertiesLoader })
			.invoke("registerThemePropertiesLoader", "@ui5/webcomponents-base-test", newTheme, () => Promise.resolve(`:root{ ${var1}; }`));

		cy.wrap({ setTheme })
			.invoke("setTheme", newTheme);

		cy.document()
			.its("adoptedStyleSheets")
			.then(adoptedStyleSheets => {
				return adoptedStyleSheets.find(sh => {
					try { return sh.cssRules[0]?.cssText?.includes(var1); } catch { return false; }
				});
			})
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", var1);
	});
});
