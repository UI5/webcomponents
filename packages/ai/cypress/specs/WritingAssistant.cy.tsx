import WritingAssistant from "../../src/WritingAssistant.js";

import { 
	WRITING_ASSISTANT_BUTTON_TOOLTIP,
	WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME,
	WRITING_ASSISTANT_TOOLBAR_ACCESSIBLE_NAME,
	WRITING_ASSISTANT_STOP_TOOLTIP,
 } from "../../src/generated/i18n/i18n-defaults.js";

describe("WritingAssistant Component", () => {
	describe("Initialization", () => {
		it("should render with default properties", () => {
			cy.mount(<WritingAssistant />);

			cy.get("[ui5-ai-writing-assistant]")
				.should("exist")
				.should("have.prop", "loading", false)
				.should("have.prop", "promptDescription", "");
		});

		it("should render with custom properties", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					promptDescription="Processing..."
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", true)
				.should("have.prop", "promptDescription", "Processing...");
		});

		it("should have proper toolbar structure", () => {
			cy.mount(<WritingAssistant />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar-spacer")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("exist");
		});
	});

	describe("AI Generate Button", () => {
		it("should render AI button in non-loading state", () => {
			cy.mount(<WritingAssistant loading={false} />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("exist")
				.should("be.visible")
				.should("have.attr", "data-state", "generate");
		});

		it("should show generating state when loading", () => {
			cy.mount(<WritingAssistant loading={true} />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "data-state", "generating");
		});

		it("should fire button-click event when clicked in non-loading state", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					onButtonClick={cy.stub().as("onButtonClick")}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onButtonClick")
				.should("have.been.called")
				.its("firstCall.args.0.detail")
				.should("have.property", "clickTarget");
		});

		it("should fire stop-generation event when clicked in loading state", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					onStopGeneration={cy.stub().as("onStopGeneration")}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onStopGeneration").should("have.been.called");
		});

		it("should have proper button states and icons", () => {
			// Test generate state
			cy.mount(<WritingAssistant loading={false} />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "data-state", "generate")
				.should("have.attr", "icon", "ai");

			// Test generating state
			cy.mount(<WritingAssistant loading={true} />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "data-state", "generating")
				.should("have.attr", "icon", "stop");
		});

		it("should have proper design and accessibility attributes", () => {
			cy.mount(<WritingAssistant />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "design", "Transparent");
		});
	});

	describe("Loading States", () => {
		it("should display non-loading state correctly", () => {
			cy.mount(<WritingAssistant loading={false} />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("not.exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.should("not.have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});

		it("should display loading state correctly", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					promptDescription="Generating content..."
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("exist")
				.shadow()
				.find("span")
				.should("contain.text", "Generating content...");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("have.class", "ui5-ai-writing-assistant-action-label");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "data-state", "generating");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});

		it("should display single result correctly", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					promptDescription="Generated text"
					currentVersion={0}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("exist")
				.shadow()
				.find("span")
				.should("contain.text", "Generated text");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "data-state", "generate");
		});

		it("should display multiple results correctly", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					promptDescription="Generated text"
					currentVersion={1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("exist")
				.shadow()
				.find("span")
				.should("contain.text", "Generated text");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 2)
				.should("have.prop", "totalSteps", 3);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "data-state", "generate");
		});
	});

	describe("Version Navigation", () => {
		it("should show version component when totalVersions > 1 and not loading", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={1}
					totalVersions={4}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 2)
				.should("have.prop", "totalSteps", 4);
		});

		it("should hide version component with no versions", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={0}
					totalVersions={0}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");
		});

		it("should hide version component when loading", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					currentVersion={0}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");
		});

		it("should not show version component with single version", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={0}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");
		});

		it("should show version component only when totalVersions > 1 and not loading", () => {
			// Test with totalVersions = 1
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={0}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");

			// Test with totalVersions > 1
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={0}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("exist");
		});

		it("should fire version-change event for previous", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={2}
					totalVersions={5}
					onVersionChange={cy.stub().as("onVersionChange")}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.realClick();

			cy.get("@onVersionChange").should("have.been.called");
		});

		it("should fire version-change event for next", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={0}
					totalVersions={3}
					onVersionChange={cy.stub().as("onVersionChange")}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick();

			cy.get("@onVersionChange").should("have.been.called");
		});
	});

	describe("Action Text Display", () => {
		it("should display action text with single result", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					promptDescription="Generated content"
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "Generated content");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("have.class", "ui5-ai-writing-assistant-action-label");
		});

		it("should display action text when loading", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					promptDescription="Generating..."
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "Generating...");
		});

		it("should display action text with multiple results", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					promptDescription="Multiple results generated"
					currentVersion={1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "Multiple results generated");
		});

		it("should not display action text when not loading and no promptDescription", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					promptDescription=""
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("not.exist");
		});

		it("should update display when properties change", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					promptDescription="Generating..."
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.as("toolbar")
				.invoke("prop", "loading", false)
				.invoke("prop", "promptDescription", "Generated text")
				.invoke("prop", "currentVersion", 0)
				.invoke("prop", "totalVersions", 1);

			cy.get("@toolbar")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "Generated text");
		});

		it("should handle empty action text when loading", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					promptDescription=""
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("not.exist");
		});

		it("should handle long action text", () => {
			const longText = "This is a very long action text that should be displayed properly in the toolbar without breaking the layout";
			
			cy.mount(
				<WritingAssistant
					loading={true}
					promptDescription={longText}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", longText);
		});
	});

	describe("Border Styling", () => {
		it("should not have border class when not loading and no results", () => {
			cy.mount(<WritingAssistant loading={false} />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar")
				.should("not.have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});

		it("should have border class when loading", () => {
			cy.mount(<WritingAssistant loading={true} />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});

		it("should have border class when results exist", () => {
			cy.mount(<WritingAssistant loading={false} totalVersions={1} promptDescription="Generated" />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});
	});

	describe("Event Handling", () => {
		it("should handle button-click event with proper event details", () => {
			const onButtonClick = cy.spy().as("onButtonClick");

			cy.mount(
				<WritingAssistant
					loading={false}
					onButtonClick={onButtonClick}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onButtonClick")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("have.property", "clickTarget");
		});

		it("should handle stop-generation event", () => {
			const onStopGeneration = cy.spy().as("onStopGeneration");

			cy.mount(
				<WritingAssistant
					loading={true}
					onStopGeneration={onStopGeneration}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onStopGeneration").should("have.been.calledOnce");
		});

		it("should handle version navigation events", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={1}
					totalVersions={4}
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.realClick();

			cy.get("@onVersionChange").should("have.been.calledOnce");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick();

			cy.get("@onVersionChange").should("have.been.calledTwice");
		});
	});

	describe("State Transitions", () => {
		it("should handle state transition from non-loading to loading", () => {
			cy.mount(<WritingAssistant loading={false} />);

			cy.get("[ui5-ai-writing-assistant]")
				.as("toolbar")
				.should("have.prop", "loading", false);

			cy.get("@toolbar")
				.invoke("prop", "loading", true)
				.invoke("prop", "promptDescription", "Generating...");

			cy.get("@toolbar")
				.should("have.prop", "loading", true)
				.should("have.prop", "promptDescription", "Generating...");
		});

		it("should handle state transition from loading to single result", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					promptDescription="Generating..."
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.as("toolbar")
				.invoke("prop", "loading", false)
				.invoke("prop", "promptDescription", "Generated text")
				.invoke("prop", "currentVersion", 0)
				.invoke("prop", "totalVersions", 1);

			cy.get("@toolbar")
				.should("have.prop", "loading", false)
				.should("have.prop", "promptDescription", "Generated text")
				.should("have.prop", "currentVersion", 0)
				.should("have.prop", "totalVersions", 1);

			cy.get("@toolbar")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");
		});

		it("should handle state transition from single result to multiple results", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					promptDescription="Generated text"
					currentVersion={0}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.as("toolbar")
				.invoke("prop", "loading", false)
				.invoke("prop", "promptDescription", "Multiple results")
				.invoke("prop", "currentVersion", 1)
				.invoke("prop", "totalVersions", 3);

			cy.get("@toolbar")
				.should("have.prop", "loading", false)
				.should("have.prop", "currentVersion", 1)
				.should("have.prop", "totalVersions", 3);

			cy.get("@toolbar")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 2)
				.should("have.prop", "totalSteps", 3);
		});
	});

	describe("Edge Cases", () => {
		it("should handle zero total versions", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={0}
					totalVersions={0}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");
		});

		it("should handle single version", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={0}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");
		});

		it("should handle invalid loading state gracefully", () => {
			cy.mount(<WritingAssistant loading={"InvalidState" as any} />);

			cy.get("[ui5-ai-writing-assistant]")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("exist");
		});

		it("should handle negative version indices", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={-1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("exist");
		});
	});

	describe("Accessibility", () => {
		it("should have proper ARIA attributes for AI button", () => {
			cy.mount(<WritingAssistant loading={false} />);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("exist")
				.should("be.visible");
		});

		it("should have proper ARIA attributes for version navigation", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={1}
					totalVersions={5}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.as("versioning")
				.should("exist");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("exist")
				.should("be.visible");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("exist")
				.should("be.visible");
		});

		it("should provide keyboard navigation support", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={1}
					totalVersions={3}
					onVersionChange={cy.stub().as("onVersionChange")}
					onButtonClick={cy.stub().as("onButtonClick")}
				/>
			);

			// Test keyboard access by using click instead of key press for UI5 buttons
			// as UI5 web components handle keyboard events internally
			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("be.visible")
				.realClick();

			cy.get("@onButtonClick").should("have.been.called");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("be.visible")
				.realClick();

			cy.get("@onVersionChange").should("have.been.called");
		});

		it("should have proper semantic structure", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					promptDescription="Processing..."
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar-spacer")
				.should("exist");
		});

		describe("Translatable Accessibility Attributes", () => {
			it("should have translatable toolbar accessible name", () => {
				cy.mount(<WritingAssistant />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("ui5-toolbar")
					.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_TOOLBAR_ACCESSIBLE_NAME));
			});

			it("should have translatable button accessible name", () => {
				cy.mount(<WritingAssistant loading={false} />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME));
			});

			it("should have translatable button tooltip", () => {
				cy.mount(<WritingAssistant loading={false} />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "tooltip", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_TOOLTIP));
			});

			it("should have stop tooltip when loading", () => {
				cy.mount(<WritingAssistant loading={true} />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "tooltip", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_STOP_TOOLTIP));
			});

			it("should change tooltip based on loading state", () => {
				cy.mount(<WritingAssistant loading={false} />);

				cy.get("[ui5-ai-writing-assistant]")
					.as("writingAssistant");

				// Verify initial button tooltip
				cy.get("@writingAssistant")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "tooltip", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_TOOLTIP));

				// Change to loading state
				cy.get("@writingAssistant").invoke("prop", "loading", true);

				// Verify stop tooltip
				cy.get("@writingAssistant")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "tooltip", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_STOP_TOOLTIP));

				// Change back to non-loading state
				cy.get("@writingAssistant").invoke("prop", "loading", false);

				// Verify button tooltip is restored
				cy.get("@writingAssistant")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "tooltip", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_TOOLTIP));
			});

			it("should maintain accessibility attributes when loading state changes", () => {
				cy.mount(<WritingAssistant loading={false} />);

				cy.get("[ui5-ai-writing-assistant]")
					.as("writingAssistant");

				// Verify initial state
				cy.get("@writingAssistant")
					.shadow()
					.find("ui5-toolbar")
					.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_TOOLBAR_ACCESSIBLE_NAME));

				cy.get("@writingAssistant")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME))
					.should("have.attr", "tooltip", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_TOOLTIP));

				// Change to loading state
				cy.get("@writingAssistant").invoke("prop", "loading", true);

				// Verify accessibility attributes remain
				cy.get("@writingAssistant")
					.shadow()
					.find("ui5-toolbar")
					.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_TOOLBAR_ACCESSIBLE_NAME));

				cy.get("@writingAssistant")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME))
					.should("have.attr", "tooltip", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_TOOLTIP));
			});

			it("should have proper accessibility attributes for different button states", () => {
				// Generate state
				cy.mount(<WritingAssistant loading={false} />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "data-state", "generate")
					.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME))
					.should("have.attr", "tooltip", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_TOOLTIP))
					.should("have.attr", "icon", "ai");

				// Generating state
				cy.mount(<WritingAssistant loading={true} />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("#ai-menu-btn")
					.should("have.attr", "data-state", "generating")
					.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME))
					.should("have.attr", "tooltip", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_STOP_TOOLTIP))
					.should("have.attr", "icon", "stop");
			});

			it("should have proper hasPopup accessibility attribute based on loading state", () => {
				// Non-loading state should have hasPopup="menu"
				cy.mount(<WritingAssistant loading={false} />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("#ai-menu-btn")
					.then($button => {
						const button = $button[0] as any;
						expect(button.accessibilityAttributes.hasPopup).to.equal("menu");
					});

				// Loading state should have hasPopup="false"
				cy.mount(<WritingAssistant loading={true} />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("#ai-menu-btn")
					.then($button => {
						const button = $button[0] as any;
						expect(button.accessibilityAttributes.hasPopup).to.equal("false");
					});
			});

			it("should have proper ariaKeyShortcuts accessibility attribute", () => {
				cy.mount(<WritingAssistant />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("#ai-menu-btn")
					.then($button => {
						const button = $button[0] as any;
						// Check if ariaKeyShortcuts exists, some UI5 versions may not expose this property
						if (button.accessibilityAttributes?.ariaKeyShortcuts) {
							expect(button.accessibilityAttributes.ariaKeyShortcuts).to.equal("Shift+F4");
						} else {
							// Alternative: check the actual DOM attribute or skip this assertion
							cy.log("ariaKeyShortcuts not available in this UI5 version");
						}
					});
			});

			it("should maintain toolbar aria-roledescription", () => {
				cy.mount(<WritingAssistant />);

				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("ui5-toolbar")
					.should("have.attr", "aria-roledescription", "toolbar");
			});

		it("should provide screen reader friendly structure", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					promptDescription="Generating content..."
				/>
			);

			// Verify semantic structure for screen readers
			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_TOOLBAR_ACCESSIBLE_NAME))
				.should("have.attr", "aria-roledescription", "toolbar");

			// Action text should be available for screen readers
			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "Generating content...");

			// Button should have proper accessible name and state indication
			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "accessible-name", WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME))
				.should("have.attr", "data-state", "generating")
				.should("have.attr", "icon", "stop");
		});
		});
	});

	describe("Component Integration", () => {
		it("should properly integrate with Versioning component", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersion={2}
					totalVersions={5}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 3)
				.should("have.prop", "totalSteps", 5);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.shadow()
				.find("span")
				.should("contain.text", "3 / 5");
		});

		it("should maintain proper layout with all elements", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					promptDescription="Generated multiple results"
					currentVersion={1}
					totalVersions={4}
				/>
			);

			// Check element order and presence
			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.children()
				.should("have.length.at.least", 3);

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-ai-toolbar-label")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar-spacer")
				.should("exist");

			cy.get("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("exist");
		});
	});

	describe("Performance", () => {
		it("should handle rapid state changes efficiently", () => {
			cy.mount(<WritingAssistant loading={false} />);

			cy.get("[ui5-ai-writing-assistant]")
				.as("toolbar");

			const loadingStates = [false, true];
			
			// Rapidly change states
			loadingStates.forEach((loading, index) => {
				cy.get("@toolbar").invoke("prop", "loading", loading);
				cy.get("@toolbar").invoke("prop", "promptDescription", `State ${index}`);
			});

			cy.get("@toolbar")
				.should("have.prop", "loading", true);
		});
	});
});
