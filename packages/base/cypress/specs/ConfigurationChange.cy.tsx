import "../../test/test-elements/Accessor.js";
import { setTheme, getTheme } from "../../src/config/Theme.js";
import { setThemeRoot, getThemeRoot } from "../../src/config/ThemeRoot.js";
import { setNoConflict, getNoConflict } from "../../src/config/NoConflict.js";

describe("Some configuration options can be changed at runtime", () => {
	it("Tests that theme can be changed", () => {
		const newTheme = "sap_horizon_hcb";

		cy.wrap({ setTheme })
			.invoke("setTheme", newTheme);

		cy.wrap({ getTheme })
			.invoke("getTheme")
			.should("equal", newTheme);
	});

	it("Tests that noConflict can be changed", () => {
		const noConflictObject = { events: ["selection-change"] };

		cy.wrap({ setNoConflict })
			.invoke("setNoConflict", noConflictObject);

		cy.wrap({ getNoConflict })
			.invoke("getNoConflict")
			.should("deep.equal", noConflictObject)
			.its("events")
			.should("deep.equal", noConflictObject.events);
	});

	it("Tests that theme root is applied", () => {
		const newThemeRoot = "https://example.com/";

		cy.wrap({ setThemeRoot })
			.invoke("setThemeRoot", newThemeRoot);

		cy.wrap({ getThemeRoot })
			.invoke("getThemeRoot")
			.should("deep.equal", newThemeRoot);
	});
});

describe("ThemeRoot validation at runtime", () => {
	describe("Valid themeRoot with allowed origin", () => {
		before(() => {
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "https://runtime-example.com";
					$el.document.head.append(metaTag);
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		it("should set raw themeRoot", () => {
			cy.wrap({ setThemeRoot })
				.invoke("setThemeRoot", "https://runtime-example.com/themes");

			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://runtime-example.com/themes");

			// Verify link is created in DOM
			cy.wrap({ getTheme })
				.invoke("getTheme")
				.then(theme => {
					cy.get(`link[sap-ui-webcomponents-theme="${theme}"]`)
						.should("exist")
						.and("have.attr", "href")
						.then(href => {
							return href.includes("https://runtime-example.com/themes/UI5/Base/baseLib/");
						})
						.should("be.true");
				});
		});
	});

	describe("Invalid themeRoot without meta tag", () => {
		after(() => {
			cy.window()
				.then($el => {
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		it("should set themeRoot but log warning", () => {
			const consoleWarnStub = cy.stub().as("consoleWarn");

			cy.window().then(win => {
				cy.stub(win.console, "warn").callsFake(consoleWarnStub);
			});

			cy.wrap({ setThemeRoot })
				.invoke("setThemeRoot", "https://unauthorized-runtime.com/themes");

			// The themeRoot should be set in the internal state
			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://unauthorized-runtime.com/themes");

			// But validation should fail and log a warning
			cy.get("@consoleWarn").should("have.been.called");

			// Verify link is NOT created in DOM
			cy.get("link[sap-ui-webcomponents-theme]")
				.should("not.exist");
		});
	});

	describe("Relative themeRoot at runtime", () => {
		before(() => {
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "*";
					$el.document.head.append(metaTag);
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		it("should set raw relative path", () => {
			cy.wrap({ setThemeRoot })
				.invoke("setThemeRoot", "./custom-themes");

			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "./custom-themes");

			// Verify link is created with resolved URL
			cy.wrap({ getTheme })
				.invoke("getTheme")
				.then(theme => {
					cy.get(`link[sap-ui-webcomponents-theme="${theme}"]`)
						.should("exist")
						.and("have.attr", "href")
						.then(href => {
							return href.includes("/custom-themes/UI5/Base/baseLib/");
						})
						.should("be.true");
				});
		});
	});

	describe("Same themeRoot not re-applied", () => {
		before(() => {
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "https://same-root.com";
					$el.document.head.append(metaTag);
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		it("should not reprocess when setting the same themeRoot", () => {
			const themeRoot = "https://same-root.com/themes";

			cy.wrap({ setThemeRoot })
				.invoke("setThemeRoot", themeRoot)
				.should("not.equal", undefined);

			// Setting again should return undefined (no-op)
			cy.wrap({ setThemeRoot })
				.invoke("setThemeRoot", themeRoot)
				.should("equal", undefined);
		});
	});

	describe("ThemeRoot with wildcard origin", () => {
		before(() => {
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "*";
					$el.document.head.append(metaTag);
				});
		});

		after(() => {
			cy.window()
				.then($el => {
					const metaTag = $el.document.head.querySelector("[name='sap-allowed-theme-origins']");
					metaTag?.remove();
					const link = $el.document.head.querySelector("link[sap-ui-webcomponents-theme]");
					link?.remove();
				});
		});

		it("should allow any origin with wildcard", () => {
			cy.wrap({ setThemeRoot })
				.invoke("setThemeRoot", "https://any-wildcard-domain.com/themes");

			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://any-wildcard-domain.com/themes");

			// Verify link is created with wildcard-allowed origin
			cy.wrap({ getTheme })
				.invoke("getTheme")
				.then(theme => {
					cy.get(`link[sap-ui-webcomponents-theme="${theme}"]`)
						.should("exist")
						.and("have.attr", "href")
						.and("include", "https://any-wildcard-domain.com/themes/UI5/Base/baseLib/");
				});
		});
	});
});
