import { internals } from "../../src/Location.js";
import TestGeneric from "../../test/test-elements/Generic.js";
import { resetConfiguration } from "../../src/InitialConfiguration.js";
import { getLanguage } from "../../src/config/Language.js";
import { getCalendarType } from "../../src/config/CalendarType.js";
import { getTheme } from "../../src/config/Theme.js";
import { getAnimationMode } from "../../src/config/AnimationMode.js";
import AnimationMode from "../../src/types/AnimationMode.js";
import { getThemeRoot } from "../../src/config/ThemeRoot.js";
import applyTheme from "../../src/theming/applyTheme.js";

describe("Some settings can be set via SAP UI URL params", () => {
	before(() => {
		const searchParams = "sap-ui-rtl=true&sap-ui-language=ja&sap-ui-calendarType=Japanese&sap-ui-theme=sap_horizon_hcb&sap-ui-animationMode=basic";

		cy.stub(internals, "search").callsFake(() => {
			return searchParams;
		});

		cy.then(() => {
			return resetConfiguration(true);
		});

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(<TestGeneric />);
	});

	it("Tests that language is applied", () => {
		cy.wrap({ getLanguage })
			.invoke("getLanguage")
			.should("equal", "ja");
	});

	it("Tests that calendarType is applied", () => {
		cy.wrap({ getCalendarType })
			.invoke("getCalendarType")
			.should("equal", "Japanese");
	});

	it("Tests that theme is applied", () => {
		cy.wrap({ getTheme })
			.invoke("getTheme")
			.should("equal", "sap_horizon_hcb");
	});

	it("Tests that animationMode is applied", () => {
		cy.wrap({ getAnimationMode })
			.invoke("getAnimationMode")
			.should("equal", AnimationMode.Basic);
	});
});

describe("Different themeRoot configurations", () => {
	describe("Allowed theme root", () => {
		before(() => {
			const searchParams = "sap-ui-theme=sap_horizon_hcb@https://example.com";

			// All allowed theme roots need to be described inside the meta tag.
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "https://example.com";

					$el.document.head.append(metaTag);
				});

			cy.stub(internals, "search").callsFake(() => {
				return searchParams;
			});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.wrap(internals)
				.invoke("search")
				.should("be.equal", searchParams);

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
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
				});
		});

		it("should return raw themeRoot from URL parameter", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://example.com");
		});

		it("should extract theme without themeRoot part", () => {
			cy.wrap({ getTheme })
				.invoke("getTheme")
				.should("equal", "sap_horizon_hcb");
		});

		it("should create link in DOM with validated URL", () => {
			// Apply theme to trigger link creation
			cy.wrap({ applyTheme, getTheme })
				.invoke("getTheme")
				.then(theme => {
					return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
				});

			cy.get("link[sap-ui-webcomponents-theme='sap_horizon_hcb']")
				.should("exist")
				.and("have.attr", "href")
				.and("equal", "https://example.com/UI5/Base/baseLib/sap_horizon_hcb/css_variables.css");
		});
	});

	describe("Unallowed theme root", () => {
		before(() => {
			const searchParams = "sap-ui-theme=sap_horizon_hcb@https://another-example.com";

			cy.stub(internals, "search").callsFake(() => {
				return searchParams;
			});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.wrap(internals)
				.invoke("search")
				.should("be.equal", searchParams);

			cy.mount(<TestGeneric />);
		});

		afterEach(() => {
			cy.window()
				.then($el => {
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		it("should return raw themeRoot even if not allowed", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://another-example.com");
		});

		it("should not create link in DOM due to validation failure", () => {
			cy.get("link[sap-ui-webcomponents-theme='sap_horizon_hcb']")
				.should("not.exist");
		});
	});

	describe("Relative theme root", () => {
		before(() => {
			const searchParams = "sap-ui-theme=sap_horizon_hcb@./test";

			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "*";
					$el.document.head.append(metaTag);
				});

			cy.stub(internals, "search").callsFake(() => {
				return searchParams;
			});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.wrap(internals)
				.invoke("search")
				.should("be.equal", searchParams);

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
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
				});
		});

		it("should return raw relative themeRoot", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "./test");
		});

		it("should create link with resolved URL", () => {
			// Apply theme to trigger link creation
			cy.wrap({ applyTheme, getTheme })
				.invoke("getTheme")
				.then(theme => {
					return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
				});

			cy.get("link[sap-ui-webcomponents-theme='sap_horizon_hcb']")
				.should("exist")
				.and("have.attr", "href")
				.then(href => {
					return href.endsWith("/test/UI5/Base/baseLib/sap_horizon_hcb/css_variables.css");
				})
				.should("be.true");
		});
	});

	describe("Absolute path theme root", () => {
		before(() => {
			const searchParams = "sap-ui-theme=custom_theme@/absolute/path";

			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "*";
					$el.document.head.append(metaTag);
				});

			cy.stub(internals, "search").callsFake(() => {
				return searchParams;
			});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.wrap(internals)
				.invoke("search")
				.should("be.equal", searchParams);

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
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
				});
		});

		it("should return raw absolute path", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "/absolute/path");
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
					return href.endsWith("/absolute/path/UI5/Base/baseLib/custom_theme/css_variables.css");
				})
				.should("be.true");
		});
	});

	describe("ThemeRoot with trailing slash", () => {
		before(() => {
			const searchParams = "sap-ui-theme=custom_theme@https://cdn.example.com/themes/";

			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "https://cdn.example.com";
					$el.document.head.append(metaTag);
				});

			cy.stub(internals, "search").callsFake(() => {
				return searchParams;
			});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.wrap(internals)
				.invoke("search")
				.should("be.equal", searchParams);

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
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
				});
		});

		it("should return raw themeRoot with trailing slash", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://cdn.example.com/themes/");
		});

		it("should create link normalizing trailing slash", () => {
			// Apply theme to trigger link creation
			cy.wrap({ applyTheme, getTheme })
				.invoke("getTheme")
				.then(theme => {
					return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
				});

			cy.get("link[sap-ui-webcomponents-theme='custom_theme']")
				.should("exist")
				.and("have.attr", "href")
				.and("equal", "https://cdn.example.com/themes/UI5/Base/baseLib/custom_theme/css_variables.css");
		});
	});

	describe("Invalid URL format", () => {
		before(() => {
			const searchParams = "sap-ui-theme=custom_theme@not-a-valid-url";

			cy.stub(internals, "search").callsFake(() => {
				return searchParams;
			});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.wrap(internals)
				.invoke("search")
				.should("be.equal", searchParams);

			cy.mount(<TestGeneric />);
		});

		afterEach(() => {
			cy.window()
				.then($el => {
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		it("should return raw invalid URL value", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "not-a-valid-url");
		});

		it("should not create link due to invalid URL", () => {
			cy.get("link[sap-ui-webcomponents-theme='custom_theme']")
				.should("not.exist");
		});
	});

	describe("Legacy meta tag name support", () => {
		before(() => {
			const searchParams = "sap-ui-theme=custom_theme@https://legacy.example.com";

			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowedThemeOrigins"; // Old camelCase format
					metaTag.content = "https://legacy.example.com";
					$el.document.head.append(metaTag);
				});

			cy.stub(internals, "search").callsFake(() => {
				return searchParams;
			});

			cy.wrap({ resetConfiguration })
				.invoke("resetConfiguration", true);

			cy.wrap(internals)
				.invoke("search")
				.should("be.equal", searchParams);

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
					const metaTag = $el.document.head.querySelector("[name='sap-allowedThemeOrigins']");
					metaTag?.remove();
				});
		});

		it("should return raw themeRoot", () => {
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://legacy.example.com");
		});

		it("should support legacy sap-allowedThemeOrigins meta tag", () => {
			// Apply theme to trigger link creation
			cy.wrap({ applyTheme, getTheme })
				.invoke("getTheme")
				.then(theme => {
					return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
				});

			cy.get("link[sap-ui-webcomponents-theme='custom_theme']")
				.should("exist")
				.and("have.attr", "href")
				.and("equal", "https://legacy.example.com/UI5/Base/baseLib/custom_theme/css_variables.css");
		});
	});
});

describe("Some settings can be set via SAP URL params", () => {
	before(() => {
		const searchParams = "sap-language=bg&sap-theme=sap_fiori_3_dark";

		cy.stub(internals, "search").callsFake(() => {
			return searchParams;
		});

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(<TestGeneric />);
	});

	it("Tests that language is applied via sap-ui-language", () => {
		cy.wrap({ getLanguage })
			.invoke("getLanguage")
			.should("equal", "bg");
	});

	it("Tests that theme is applied via sap-ui-theme", () => {
		cy.wrap({ getTheme })
			.invoke("getTheme")
			.should("equal", "sap_fiori_3_dark");
	});
});

describe("Some settings can be set via SAP UI URL params", () => {
	before(() => {
		const searchParams = "sap-language=bg&sap-ui-language=de&sap-theme=sap_fiori_3_dark&sap-theme=sap_fiori_3_hcb";

		cy.stub(internals, "search").callsFake(() => {
			return searchParams;
		});

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(<TestGeneric />);
	});

	it("Tests that language is applied via sap-ui-language", () => {
		cy.wrap({ getLanguage })
			.invoke("getLanguage")
			.should("equal", "de");
	});

	it("Tests that theme is applied via sap-ui-theme", () => {
		cy.wrap({ getTheme })
			.invoke("getTheme")
			.should("equal", "sap_fiori_3_hcb");
	});
});
