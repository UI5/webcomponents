import { fireConfigChange, attachConfigChange, getSharedValue } from "../../src/config/ConfigurationSync.js";
import { setTheme, getTheme } from "../../src/config/Theme.js";
import { setLanguage, getLanguage } from "../../src/config/Language.js";
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
});
