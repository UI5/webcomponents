import { getAnimationMode } from "../../src/config/AnimationMode.js";
import { getCalendarType } from "../../src/config/CalendarType.js";
import { getDefaultFontLoading } from "../../src/config/Fonts.js";
import TestGeneric from "../../test/test-elements/Generic.js";
import { getFirstDayOfWeek, getLegacyDateCalendarCustomizing } from "../../src/config/FormatSettings.js";
import { getLanguage } from "../../src/config/Language.js";
import { getNoConflict } from "../../src/config/NoConflict.js";
import { getTheme } from "../../src/config/Theme.js";
import { getThemeRoot } from "../../src/config/ThemeRoot.js";
import { getEnableDefaultTooltips } from "../../src/config/Tooltips.js";
import { resetConfiguration } from "../../src/InitialConfiguration.js";
import applyTheme from "../../src/theming/applyTheme.js";

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

describe("Configuration script with themeRoot", () => {
	describe("Valid absolute themeRoot with allowed origin", () => {
		before(() => {
			// Add meta tag to allow the origin
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "https://example.com";
					$el.document.head.append(metaTag);
				});

			cy.window()
				.then($el => {
					const scriptElement = document.createElement("script");
					scriptElement.type = "application/json";
					scriptElement.setAttribute("data-ui5-config", "true");
					scriptElement.innerHTML = JSON.stringify({
						theme: "custom_theme",
						themeRoot: "https://example.com/themes",
					});
					return $el.document.head.append(scriptElement);
				});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.mount(<TestGeneric />);
		});

		afterEach(() => {
			cy.window()
				.then($el => {
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");
					scriptElement?.remove();
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
				});
		});

		it("should return raw themeRoot from configuration", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://example.com/themes");
		});

		it("should create link in DOM with validated URL", () => {
			// Apply theme to trigger link creation
			cy.wrap({ applyTheme, getTheme })
				.invoke("getTheme")
				.then(theme => {
					return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
				});

			cy.get("link[sap-ui-webcomponents-theme='custom_theme']")
				.should("exist")
				.and("have.attr", "href")
				.and("equal", "https://example.com/themes/UI5/Base/baseLib/custom_theme/css_variables.css");
		});
	});

	describe("Invalid absolute themeRoot without allowed origin", () => {
		before(() => {
			cy.window()
				.then($el => {
					const scriptElement = document.createElement("script");
					scriptElement.type = "application/json";
					scriptElement.setAttribute("data-ui5-config", "true");
					scriptElement.innerHTML = JSON.stringify({
						theme: "custom_theme",
						themeRoot: "https://unauthorized.com/themes",
					});
					return $el.document.head.append(scriptElement);
				});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.mount(<TestGeneric />);
		});

		afterEach(() => {
			cy.window()
				.then($el => {
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");
					scriptElement?.remove();
				});
		});

		it("should return raw themeRoot from configuration", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://unauthorized.com/themes");
		});

		it("should not create link in DOM due to validation failure", () => {
			cy.get("link[sap-ui-webcomponents-theme='custom_theme']")
				.should("not.exist");
		});
	});

	describe("Relative themeRoot with meta tag", () => {
		before(() => {
			// Relative URLs require meta tag to be present
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "*";
					$el.document.head.append(metaTag);
				});

			cy.window()
				.then($el => {
					const scriptElement = document.createElement("script");
					scriptElement.type = "application/json";
					scriptElement.setAttribute("data-ui5-config", "true");
					scriptElement.innerHTML = JSON.stringify({
						theme: "custom_theme",
						themeRoot: "./themes",
					});
					return $el.document.head.append(scriptElement);
				});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.mount(<TestGeneric />);
		});

		afterEach(() => {
			cy.window()
				.then($el => {
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");
					scriptElement?.remove();
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
				});
		});

		it("should return raw relative themeRoot", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "./themes");
		});

		it("should create link with resolved URL", () => {
			// Apply theme to trigger link creation
			cy.wrap({ applyTheme, getTheme })
				.invoke("getTheme")
				.then(theme => {
					return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
				});

			cy.get("link[sap-ui-webcomponents-theme='custom_theme']")
				.should("exist")
				.and("have.attr", "href")
				.then(href => {
					return href.includes("/themes/UI5/Base/baseLib/custom_theme/css_variables.css");
				})
				.should("be.true");
		});
	});

	describe("Wildcard allowed origins", () => {
		before(() => {
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "*";
					$el.document.head.append(metaTag);
				});

			cy.window()
				.then($el => {
					const scriptElement = document.createElement("script");
					scriptElement.type = "application/json";
					scriptElement.setAttribute("data-ui5-config", "true");
					scriptElement.innerHTML = JSON.stringify({
						theme: "custom_theme",
						themeRoot: "https://any-domain.com/themes",
					});
					return $el.document.head.append(scriptElement);
				});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.mount(<TestGeneric />);
		});

		afterEach(() => {
			cy.window()
				.then($el => {
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");
					scriptElement?.remove();
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
				});
		});

		it("should return raw themeRoot", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://any-domain.com/themes");
		});

		it("should create link with wildcard-allowed origin", () => {
			// Apply theme to trigger link creation
			cy.wrap({ applyTheme, getTheme })
				.invoke("getTheme")
				.then(theme => {
					return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
				});

			cy.get("link[sap-ui-webcomponents-theme='custom_theme']")
				.should("exist")
				.and("have.attr", "href")
				.and("equal", "https://any-domain.com/themes/UI5/Base/baseLib/custom_theme/css_variables.css");
		});
	});

	describe("Multiple allowed origins", () => {
		before(() => {
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "https://example.com, https://cdn.example.net, https://themes.example.org";
					$el.document.head.append(metaTag);
				});

			cy.window()
				.then($el => {
					const scriptElement = document.createElement("script");
					scriptElement.type = "application/json";
					scriptElement.setAttribute("data-ui5-config", "true");
					scriptElement.innerHTML = JSON.stringify({
						theme: "custom_theme",
						themeRoot: "https://cdn.example.net/ui5-themes",
					});
					return $el.document.head.append(scriptElement);
				});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.mount(<TestGeneric />);
		});

		afterEach(() => {
			cy.window()
				.then($el => {
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");
					scriptElement?.remove();
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
				});
		});

		it("should return raw themeRoot", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://cdn.example.net/ui5-themes");
		});

		it("should create link matching one of multiple origins", () => {
			// Apply theme to trigger link creation
			cy.wrap({ applyTheme, getTheme })
				.invoke("getTheme")
				.then(theme => {
					return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
				});

			cy.get("link[sap-ui-webcomponents-theme='custom_theme']")
				.should("exist")
				.and("have.attr", "href")
				.and("equal", "https://cdn.example.net/ui5-themes/UI5/Base/baseLib/custom_theme/css_variables.css");
		});
	});

	describe("Same-origin absolute URL", () => {
		before(() => {
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "https://example.com";
					$el.document.head.append(metaTag);

					const currentOrigin = window.location.origin;
					const scriptElement = document.createElement("script");
					scriptElement.type = "application/json";
					scriptElement.setAttribute("data-ui5-config", "true");
					scriptElement.innerHTML = JSON.stringify({
						theme: "custom_theme",
						themeRoot: `${currentOrigin}/themes`,
					});
					return $el.document.head.append(scriptElement);
				});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.mount(<TestGeneric />);
		});

		afterEach(() => {
			cy.window()
				.then($el => {
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");
					scriptElement?.remove();
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
				});
		});

		it("should return raw same-origin themeRoot", () => {
			cy.window().then(win => {
				cy.wrap({ getThemeRoot })
					.invoke("getThemeRoot")
					.should("equal", `${win.location.origin}/themes`);
			});
		});

		it("should create link for same-origin URL", () => {
			// Apply theme to trigger link creation
			cy.wrap({ applyTheme, getTheme })
				.invoke("getTheme")
				.then(theme => {
					return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
				});

			cy.get("link[sap-ui-webcomponents-theme='custom_theme']")
				.should("exist")
				.and("have.attr", "href")
				.then(href => {
					return href.endsWith("/themes/UI5/Base/baseLib/custom_theme/css_variables.css");
				})
				.should("be.true");
		});
	});
});
