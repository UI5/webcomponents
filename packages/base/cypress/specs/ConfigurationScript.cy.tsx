import { getAnimationMode } from "../../src/config/AnimationMode.js";
import { getCalendarType } from "../../src/config/CalendarType.js";
import { getDefaultFontLoading } from "../../src/config/Fonts.js";
import TestGeneric from "../../test/test-elements/Generic.js";
import { getFirstDayOfWeek, getLegacyDateCalendarCustomizing } from "../../src/config/FormatSettings.js";
import { getLanguage } from "../../src/config/Language.js";
import { getNoConflict } from "../../src/config/NoConflict.js";
import { getTheme } from "../../src/config/Theme.js";
import { getEnableDefaultTooltips } from "../../src/config/Tooltips.js";
import { resetConfiguration } from "../../src/InitialConfiguration.js";

describe("Configuration script", () => {
	const configurationObject = {
		"theme": "sap_horizon_hcb",
		"animationMode": "basic",
		"rtl": true,
		"language": "ja",
		"calendarType": "Japanese",
		"formatSettings": {
			"firstDayOfWeek": 0,
			"legacyDateCalendarCustomizing": [
				{
					"dateFormat": "A",
					"islamicMonthStart": "14351201",
					"gregDate": "20140925",
				},
				{
					"dateFormat": "A",
					"islamicMonthStart": "14360101",
					"gregDate": "20141024",
				},
				{
					"dateFormat": "A",
					"islamicMonthStart": "14360201",
					"gregDate": "20141123",
				},
			],
		},
		"noConflict": {
			"events": ["selection-change", "header-click"],
		},
		"defaultFontLoading": false,
		"enableDefaultTooltips": false,
	};

	before(() => {
		cy.window()
			.then($el => {
				const scriptElement = document.createElement("script");
				scriptElement.type = "application/json";
				scriptElement.setAttribute("data-ui5-config", "true");
				scriptElement.innerHTML = JSON.stringify(configurationObject);
				return $el.document.head.append(scriptElement);
			})


		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);

		cy.mount(<TestGeneric />);
		cy.get("script[data-ui5-config]")
			.should("exist")
			.then($el => {
				return $el.get(0)?.innerHTML;
			})
			.should("equal", JSON.stringify(configurationObject));
	});

	after(() => {
		cy.window()
			.then($el => {
				const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");

				scriptElement?.remove();
			})
	})

	it("getLanguage", () => {
		cy.wrap({ getLanguage })
			.invoke("getLanguage")
			.should("equal", configurationObject.language);
	});

	it("getCalendarType", () => {
		cy.wrap({ getCalendarType })
			.invoke("getCalendarType")
			.should("equal", configurationObject.calendarType);
	});

	it("getFirstDayOfWeek", () => {
		cy.wrap({ getFirstDayOfWeek })
			.invoke("getFirstDayOfWeek")
			.should("equal", configurationObject.formatSettings.firstDayOfWeek);
	});

	it("getLegacyDateCalendarCustomizing", () => {
		cy.wrap({ getLegacyDateCalendarCustomizing })
			.invoke("getLegacyDateCalendarCustomizing")
			.should("deep.equal", configurationObject.formatSettings.legacyDateCalendarCustomizing);
	});

	it("getAnimationMode", () => {
		cy.wrap({ getAnimationMode })
			.invoke("getAnimationMode")
			.should("equal", configurationObject.animationMode);
	});

	it("getEnableDefaultTooltips", () => {
		cy.wrap({ getTheme })
			.invoke("getTheme")
			.should("equal", configurationObject.theme);
	});

	it("getNoConflict", () => {
		cy.wrap({ getNoConflict })
			.invoke("getNoConflict")
			.should("deep.equal", configurationObject.noConflict)
			.its("events")
			.should("deep.equal", configurationObject.noConflict.events);
	});

	it("getDefaultFontLoading", () => {
		cy.wrap({ getDefaultFontLoading })
			.invoke("getDefaultFontLoading")
			.should("equal", false);
	});

	it("getEnableDefaultTooltips", () => {
		cy.wrap({ getEnableDefaultTooltips })
			.invoke("getEnableDefaultTooltips")
			.should("equal", false);
	});
});
