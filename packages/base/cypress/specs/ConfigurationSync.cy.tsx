import { fireConfigChange, attachConfigChange, getSharedValue } from "../../src/config/ConfigurationSync.js";
import { setTheme, getTheme } from "../../src/config/Theme.js";
import { setLanguage, getLanguage } from "../../src/config/Language.js";
import { setThemeRoot, getThemeRoot } from "../../src/config/ThemeRoot.js";
import EventProvider from "../../src/EventProvider.js";
import getSharedResource from "../../src/getSharedResource.js";

describe("ConfigurationSync", () => {
	describe("Shared value storage", () => {
		it("fireConfigChange stores values readable via getSharedValue", () => {
			fireConfigChange("testSetting", "testValue");

			cy.wrap({ getSharedValue })
				.invoke("getSharedValue", "testSetting")
				.should("equal", "testValue");
		});

		it("getSharedValue returns undefined for unknown settings", () => {
			cy.wrap({ getSharedValue })
				.invoke("getSharedValue", "nonExistent")
				.should("equal", undefined);
		});
	});

	describe("Skip-guard", () => {
		it("handler is NOT called when the same runtime fires", () => {
			const handler = cy.stub().as("handler");
			attachConfigChange("skipTest", handler);

			fireConfigChange("skipTest", "value");

			cy.get("@handler").should("not.have.been.called");
		});
	});

	describe("Cross-runtime handler", () => {
		it("handler is called only for its own setting name", () => {
			const handlerA = cy.stub().as("handlerA");
			const handlerB = cy.stub().as("handlerB");
			attachConfigChange("settingA", handlerA);
			attachConfigChange("settingB", handlerB);

			// Simulate a cross-runtime fire by calling the shared EventProvider directly,
			// bypassing the skip-guard that fireConfigChange sets for the current runtime.
			const ep = getSharedResource("ConfigChange.eventProvider", new EventProvider());
			ep.fireEvent("configChange", { name: "settingA", value: "cross-value" });

			cy.get("@handlerA").should("have.been.calledOnce").and("have.been.calledWith", "cross-value");
			cy.get("@handlerB").should("not.have.been.called");
		});
	});

	describe("Theme integration", () => {
		it("setTheme stores value in shared map", () => {
			cy.wrap({ setTheme })
				.invoke("setTheme", "sap_horizon_hcb");

			cy.wrap({ getSharedValue })
				.invoke("getSharedValue", "theme")
				.should("equal", "sap_horizon_hcb");
		});
	});

	describe("Language integration", () => {
		it("setLanguage stores value in shared map", () => {
			cy.wrap({ setLanguage })
				.invoke("setLanguage", "de");

			cy.wrap({ getSharedValue })
				.invoke("getSharedValue", "language")
				.should("equal", "de");
		});
	});

	describe("ThemeRoot integration", () => {
		before(() => {
			// Setup meta tag for themeRoot validation
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "https://sync-example.com";
					$el.document.head.append(metaTag);
				});
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

		it("setThemeRoot updates current themeRoot", () => {
			cy.wrap({ setThemeRoot })
				.invoke("setThemeRoot", "https://sync-example.com/themes");

			cy.wrap({ getThemeRoot })
				.invoke("getThemeRoot")
				.should("equal", "https://sync-example.com/themes");
		});
	});

	describe("ThemeRoot cross-runtime sync", () => {
		before(() => {
			cy.window()
				.then($el => {
					const metaTag = document.createElement("meta");
					metaTag.name = "sap-allowed-theme-origins";
					metaTag.content = "https://cross-runtime.com";
					$el.document.head.append(metaTag);
				});
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

		it("themeRoot changes propagate across runtimes", () => {
			const newThemeRoot = "https://cross-runtime.com/themes";

			// Simulate setting themeRoot in one runtime
			fireConfigChange("themeRoot", newThemeRoot);

			// Verify it's stored in shared values
			cy.wrap({ getSharedValue })
				.invoke("getSharedValue", "themeRoot")
				.should("equal", newThemeRoot);
		});

		it("themeRoot handler receives cross-runtime changes", () => {
			const handler = cy.stub().as("themeRootHandler");
			const crossRuntimeValue = "https://cross-runtime.com/updated";

			attachConfigChange("themeRoot", handler);

			// Simulate cross-runtime fire by calling EventProvider directly
			const ep = getSharedResource("ConfigChange.eventProvider", new EventProvider());
			ep.fireEvent("configChange", { name: "themeRoot", value: crossRuntimeValue });

			cy.get("@themeRootHandler")
				.should("have.been.calledOnce")
				.and("have.been.calledWith", crossRuntimeValue);
		});
	});

	describe("Multiple configuration sync", () => {
		it("multiple config changes maintain separate values", () => {
			fireConfigChange("theme", "sap_horizon_dark");
			fireConfigChange("language", "fr");
			fireConfigChange("themeRoot", "https://multi.com/themes");

			cy.wrap({ getSharedValue })
				.invoke("getSharedValue", "theme")
				.should("equal", "sap_horizon_dark");

			cy.wrap({ getSharedValue })
				.invoke("getSharedValue", "language")
				.should("equal", "fr");

			cy.wrap({ getSharedValue })
				.invoke("getSharedValue", "themeRoot")
				.should("equal", "https://multi.com/themes");
		});
	});
});
