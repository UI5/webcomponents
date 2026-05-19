import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getIllustrationData } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

// Import only a single V4 TNT illustration (NOT AllIllustrations.js).
// The fix ensures this import also registers V5 loaders for Horizon themes.
import "@ui5/webcomponents-fiori/dist/illustrations/tnt/NoApplications.js";

describe("TNT illustration V5 loader registration", () => {
	after(() => {
		cy.wrap({ setTheme })
			.invoke("setTheme", "sap_horizon");
	});

	it("loads V5 illustration data under Horizon when a single V4 TNT illustration is imported", () => {
		// Set theme to Horizon so getCollection() returns "V5"
		cy.wrap({ setTheme })
			.invoke("setTheme", "sap_horizon")
			.then(() => {
				// getIllustrationData calls processName which looks for "tnt/V5/NoApplications" loader.
				// With the fix: V5 loader exists -> loads V5 data with sapContent_Illustrative_Color CSS vars.
				// Without the fix: no V5 loader -> falls back to V4 data with sapIllus_ CSS vars.
				return getIllustrationData("tnt/NoApplications");
			})
			.then((illustrationData) => {
				expect(illustrationData).to.not.be.undefined;
				const data = illustrationData as { sceneSvg: string; dialogSvg: string; spotSvg: string; };
				// V5 SVGs use --sapContent_Illustrative_Color* CSS variables
				expect(data.sceneSvg).to.include("sapContent_Illustrative_Color");
				// V4 SVGs use --sapIllus_* CSS variables — must NOT be present
				expect(data.sceneSvg).to.not.include("sapIllus_");
			});
	});
});
