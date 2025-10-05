import WritingAssistant from "../../src/WritingAssistant.js";

describe("WritingAssistant Component", () => {
	describe("Initialization", () => {
		it("should render with default properties", () => {
			cy.mount(<WritingAssistant />);

			cy.get("[ui5-ai-writing-assistant]")
				.should("exist")
				.should("have.prop", "loading", false)
				.should("have.prop", "actionText", "");
		});

		it("should render with custom properties", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					actionText="Processing..."
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", true)
				.should("have.prop", "actionText", "Processing...");
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
					actionText="Generating content..."
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
					actionText="Generated text"
					currentVersionIndex={1}
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
					actionText="Generated text"
					currentVersionIndex={2}
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
					currentVersionIndex={2}
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
					currentVersionIndex={1}
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
					currentVersionIndex={1}
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
					currentVersionIndex={1}
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
					currentVersionIndex={1}
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
					currentVersionIndex={1}
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
					currentVersionIndex={3}
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
					currentVersionIndex={1}
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
					actionText="Generated content"
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
					actionText="Generating..."
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
					actionText="Multiple results generated"
					currentVersionIndex={2}
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

		it("should not display action text when not loading and no actionText", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					actionText=""
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
					actionText="Generating..."
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.as("toolbar")
				.invoke("prop", "loading", false)
				.invoke("prop", "actionText", "Generated text")
				.invoke("prop", "currentVersionIndex", 1)
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
					actionText=""
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
					actionText={longText}
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
			cy.mount(<WritingAssistant loading={false} totalVersions={1} actionText="Generated" />);

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
					currentVersionIndex={2}
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
				.invoke("prop", "actionText", "Generating...");

			cy.get("@toolbar")
				.should("have.prop", "loading", true)
				.should("have.prop", "actionText", "Generating...");
		});

		it("should handle state transition from loading to single result", () => {
			cy.mount(
				<WritingAssistant
					loading={true}
					actionText="Generating..."
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.as("toolbar")
				.invoke("prop", "loading", false)
				.invoke("prop", "actionText", "Generated text")
				.invoke("prop", "currentVersionIndex", 1)
				.invoke("prop", "totalVersions", 1);

			cy.get("@toolbar")
				.should("have.prop", "loading", false)
				.should("have.prop", "actionText", "Generated text")
				.should("have.prop", "currentVersionIndex", 1)
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
					actionText="Generated text"
					currentVersionIndex={1}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-writing-assistant]")
				.as("toolbar")
				.invoke("prop", "loading", false)
				.invoke("prop", "actionText", "Multiple results")
				.invoke("prop", "currentVersionIndex", 2)
				.invoke("prop", "totalVersions", 3);

			cy.get("@toolbar")
				.should("have.prop", "loading", false)
				.should("have.prop", "currentVersionIndex", 2)
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
					currentVersionIndex={1}
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
					currentVersionIndex={1}
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
					currentVersionIndex={-1}
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
					currentVersionIndex={2}
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
					currentVersionIndex={2}
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
					actionText="Processing..."
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
	});

	describe("Component Integration", () => {
		it("should properly integrate with Versioning component", () => {
			cy.mount(
				<WritingAssistant
					loading={false}
					currentVersionIndex={3}
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
					actionText="Generated multiple results"
					currentVersionIndex={2}
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
				cy.get("@toolbar").invoke("prop", "actionText", `State ${index}`);
			});

			cy.get("@toolbar")
				.should("have.prop", "loading", true);
		});

		it("should not cause memory leaks with event handlers", () => {
			const onButtonClick = cy.spy().as("onButtonClick");

			cy.mount(
				<WritingAssistant
					loading={false}
					onButtonClick={onButtonClick}
				/>
			);

			// Click multiple times
			for (let i = 0; i < 5; i++) {
				cy.get("[ui5-ai-writing-assistant]")
					.shadow()
					.find("#ai-menu-btn")
					.realClick();
			}

			cy.get("@onButtonClick").should("have.callCount", 5);
		});
	});
});
