import { registerThemePropertiesLoader } from "../../src/AssetRegistry.js";
import { boot } from "../../src/Boot.js";
import { hasStyle } from "../../src/ManagedStyles.js";

describe("Framework boot", () => {
	it("Tests theme loading, when registered after 'attachBoot' and 'boot'", () => {
		cy.wrap({ boot })
			.invoke("boot");

		cy.wrap({ registerThemePropertiesLoader })
			.invoke("registerThemePropertiesLoader", "@ui5/webcomponents-theming", "sap_horizon", () => {
				return Promise.resolve(`:root{ --customCol: #fff; --customBg: #000; }`);
			});

		cy.wrap({ hasStyle })
			.invoke("hasStyle", "data-ui5-theme-properties", "@ui5/webcomponents-theming")
			.should("be.true");
	});

	it("Tests theme loading, when registered after boot + theme props are registered for the base theme of an external theme", () => {
		const baseTheme = "sap_horizon"
		const customTheme = "my_custom_theme";
		const customThemeStyles = `.sapThemeMetaData-Base-baseLib{background-image: url('data:text/plain;utf-8,{"Path": "Base.baseLib.${customTheme}.css_variables", "PathPattern": "/%frameworkId%/%libId%/%themeId%/%fileId%.css", "Extends": ["${baseTheme}"], "Tags": ["Fiori_3","LightColorScheme"], "FallbackThemeId": "${baseTheme}", "Engine": {"Name": "theming-engine", "Version": "16.1.10"}, "Version": { "Build": "11.32.2.20251030081249", "Source": "11.32.2"}}');}`;
		const dataPropAttr = `data-ui5-component-properties-0`;

		// Append meta style and config script to the head setting the custom theme
		cy.window()
			.then($el => {
				const style = document.createElement("style");
				style.innerHTML = customThemeStyles;
				return $el.document.head.append(style);
			})
			.then($el => {
				const scriptElement = document.createElement("script");
				scriptElement.type = "application/json";
				scriptElement.setAttribute("data-ui5-config", "true");
				scriptElement.innerHTML = JSON.stringify({
					"theme": customTheme,
				});
				return $el.document.head.append(scriptElement);
			});


		// Trigger boot
		cy.wrap({ boot })
			.invoke("boot");

		// After boot, register theme properties loader for the base theme
		cy.wrap({ registerThemePropertiesLoader })
			.invoke("registerThemePropertiesLoader", "@ui5/webcomponents-test", baseTheme, () => {
				return Promise.resolve(`:root{--_ui5_internal_var: #ccc }`);
			});

		// Assert - theme properties for the base theme are loaded
		cy.document().should(($doc) => {
			const adoptedStyleSheets = $doc.adoptedStyleSheets;
			const sheet = adoptedStyleSheets.find(sh => (sh as any)._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-test`);

			expect(sheet, "stylesheet should exist").to.exist;
			expect(sheet!.cssRules, "cssRules should exist").to.exist;
			expect(sheet!.cssRules.length, "cssRules should have at least one rule").to.be.greaterThan(0);
			expect(sheet!.cssRules[0].cssText, "the custom variable should exist").to.include("--_ui5_internal_var: #ccc");
		});
	});
});
