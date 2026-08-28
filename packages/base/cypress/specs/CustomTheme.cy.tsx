import { registerThemePropertiesLoader } from "../../src/AssetRegistry.js";
import { setTheme } from "../../src/config/Theme.js";
import { getCurrentRuntimeIndex } from "../../src/Runtimes.js";
import TestGeneric from "../../test/test-elements/Generic.js";

describe("Custom themes can be registered", () => {
	it("Tests that theme parameters are changed on theme change", () => {
		const newTheme = "my_custom_theme";
		const var1 = "--var1: #555555";
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.mount(<TestGeneric />);

		cy.wrap({ getCurrentRuntimeIndex })
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.wrap({ registerThemePropertiesLoader })
			.invoke("registerThemePropertiesLoader", "@ui5/webcomponents-base-test", newTheme, () => Promise.resolve(`:root{ ${var1}; }`));

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
			.should("include", var1);
	});
});
