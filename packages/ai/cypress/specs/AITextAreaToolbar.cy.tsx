import AITextAreaToolbar from "../../src/AITextAreaToolbar.js";

describe("AITextAreaToolbar Component", () => {
	describe("Initialization", () => {
		it("should render with default properties", () => {
			cy.mount(<AITextAreaToolbar />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.should("exist")
				.should("have.prop", "assistantState", "Initial")
				.should("have.prop", "actionText", "")
				.should("have.prop", "currentVersionIndex", 1)
				.should("have.prop", "totalVersions", 1);
		});

		it("should render with custom properties", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					actionText="Processing..."
					currentVersionIndex={3}
					totalVersions={5}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.should("have.prop", "assistantState", "Loading")
				.should("have.prop", "actionText", "Processing...")
				.should("have.prop", "currentVersionIndex", 3)
				.should("have.prop", "totalVersions", 5);
		});

		it("should have proper toolbar structure", () => {
			cy.mount(<AITextAreaToolbar />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar-spacer")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("exist");
		});
	});

	describe("AI Generate Button", () => {
		it("should render AI button in Initial state", () => {
			cy.mount(<AITextAreaToolbar assistantState="Initial" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("exist")
				.should("be.visible")
				.should("have.attr", "state", "generate")
				.should("have.attr", "title", "AI Writing Assistant (Shift + F4)");
		});

		it("should show generating state in Loading state", () => {
			cy.mount(<AITextAreaToolbar assistantState="Loading" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "state", "generating");
		});

		it("should fire generate-click event when clicked in Initial state", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					onGenerateClick={cy.stub().as("onGenerateClick")}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onGenerateClick").should("have.been.called");
		});

		it("should fire stop-generation event when clicked in Loading state", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					onStopGeneration={cy.stub().as("onStopGeneration")}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onStopGeneration").should("have.been.called");
		});

		it("should have proper button states and icons", () => {
			// Test generate state
			cy.mount(<AITextAreaToolbar assistantState="Initial" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "state", "generate");

			// Test generating state
			cy.mount(<AITextAreaToolbar assistantState="Loading" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "state", "generating");
		});

		it("should have proper design and accessibility attributes", () => {
			cy.mount(<AITextAreaToolbar />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "design", "Transparent")
				.should("have.attr", "title", "AI Writing Assistant (Shift + F4)");
		});
	});

	describe("Assistant States", () => {
		it("should display Initial state correctly", () => {
			cy.mount(<AITextAreaToolbar assistantState="Initial" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("not.exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar")
				.should("not.have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});

		it("should display Loading state correctly", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					actionText="Generating content..."
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("exist")
				.should("contain.text", "Generating content...")
				.should("have.class", "ui5-ai-writing-assistant-action-label");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "state", "generating");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});

		it("should display single result correctly", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					actionText="Generated text"
					currentVersionIndex={1}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("exist")
				.should("contain.text", "Generated text");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "state", "generate");
		});

		it("should display multiple results correctly", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					actionText="Generated text"
					currentVersionIndex={2}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("exist")
				.should("contain.text", "Generated text");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 2)
				.should("have.prop", "totalSteps", 3);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "state", "generate");
		});
	});

	describe("Version Navigation", () => {
		it("should show version component when totalVersions > 1", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={2}
					totalVersions={4}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 2)
				.should("have.prop", "totalSteps", 4);
		});

		it("should hide version component in Initial state with no versions", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={0}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");
		});

		it("should hide version component in Loading state", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					currentVersionIndex={1}
					totalVersions={0}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");
		});

		it("should not show version component with single version", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");
		});

		it("should show version component only when totalVersions > 1", () => {
			// Test with totalVersions = 1
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");

			// Test with totalVersions > 1
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("exist");
		});

		it("should fire previous-version-click event", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={3}
					totalVersions={5}
					onPreviousVersionClick={cy.stub().as("onPreviousVersionClick")}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.realClick();

			cy.get("@onPreviousVersionClick").should("have.been.called");
		});

		it("should fire next-version-click event", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={3}
					onNextVersionClick={cy.stub().as("onNextVersionClick")}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick();

			cy.get("@onNextVersionClick").should("have.been.called");
		});
	});

	describe("Action Text Display", () => {
		it("should display action text with single result", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					actionText="Generated content"
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "Generated content")
				.should("have.class", "ui5-ai-writing-assistant-action-label");
		});

		it("should display action text in Loading state", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					actionText="Generating..."
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "Generating...");
		});

		it("should display action text with multiple results", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					actionText="Multiple results generated"
					currentVersionIndex={2}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "Multiple results generated");
		});

		it("should not display action text in Initial state", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					actionText=""
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("not.exist");
		});

		it("should update display when properties change", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					actionText="Generating..."
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.as("toolbar")
				.invoke("prop", "assistantState", "Initial")
				.invoke("prop", "actionText", "Generated text")
				.invoke("prop", "currentVersionIndex", 1)
				.invoke("prop", "totalVersions", 1);

			cy.get("@toolbar")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "Generated text");
		});

		it("should handle empty action text", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					actionText=""
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("exist")
				.should("be.empty");
		});

		it("should handle long action text", () => {
			const longText = "This is a very long action text that should be displayed properly in the toolbar without breaking the layout";
			
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					actionText={longText}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", longText);
		});
	});

	describe("Border Styling", () => {
		it("should not have border class in Initial state with no results", () => {
			cy.mount(<AITextAreaToolbar assistantState="Initial" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar")
				.should("not.have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});

		it("should have border class in Loading state", () => {
			cy.mount(<AITextAreaToolbar assistantState="Loading" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});

		it("should have border class when results exist", () => {
			cy.mount(<AITextAreaToolbar assistantState="Initial" totalVersions={1} actionText="Generated" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar")
				.should("have.class", "ui5-ai-writing-assistant-footer-bar--with-border");
		});
	});

	describe("Event Handling", () => {
		it("should handle generate-click event with proper event details", () => {
			const onGenerateClick = cy.spy().as("onGenerateClick");

			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					onGenerateClick={onGenerateClick}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onGenerateClick")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("have.property", "clickTarget");
		});

		it("should handle stop-generation event", () => {
			const onStopGeneration = cy.spy().as("onStopGeneration");

			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					onStopGeneration={onStopGeneration}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onStopGeneration").should("have.been.calledOnce");
		});

		it("should handle version navigation events", () => {
			const onPreviousVersionClick = cy.spy().as("onPreviousVersionClick");
			const onNextVersionClick = cy.spy().as("onNextVersionClick");

			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={2}
					totalVersions={4}
					onPreviousVersionClick={onPreviousVersionClick}
					onNextVersionClick={onNextVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.realClick();

			cy.get("@onPreviousVersionClick").should("have.been.calledOnce");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick();

			cy.get("@onNextVersionClick").should("have.been.calledOnce");
		});
	});

	describe("State Transitions", () => {
		it("should handle state transition from Initial to Loading", () => {
			cy.mount(<AITextAreaToolbar assistantState="Initial" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.as("toolbar")
				.should("have.prop", "assistantState", "Initial");

			cy.get("@toolbar")
				.invoke("prop", "assistantState", "Loading")
				.invoke("prop", "actionText", "Generating...");

			cy.get("@toolbar")
				.should("have.prop", "assistantState", "Loading")
				.should("have.prop", "actionText", "Generating...");
		});

		it("should handle state transition from Loading to single result", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					actionText="Generating..."
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.as("toolbar")
				.invoke("prop", "assistantState", "Initial")
				.invoke("prop", "actionText", "Generated text")
				.invoke("prop", "currentVersionIndex", 1)
				.invoke("prop", "totalVersions", 1);

			cy.get("@toolbar")
				.should("have.prop", "assistantState", "Initial")
				.should("have.prop", "actionText", "Generated text")
				.should("have.prop", "currentVersionIndex", 1)
				.should("have.prop", "totalVersions", 1);

			cy.get("@toolbar")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");
		});

		it("should handle state transition from single result to multiple results", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					actionText="Generated text"
					currentVersionIndex={1}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.as("toolbar")
				.invoke("prop", "assistantState", "Initial")
				.invoke("prop", "actionText", "Multiple results")
				.invoke("prop", "currentVersionIndex", 2)
				.invoke("prop", "totalVersions", 3);

			cy.get("@toolbar")
				.should("have.prop", "assistantState", "Initial")
				.should("have.prop", "currentVersionIndex", 2)
				.should("have.prop", "totalVersions", 3);

			cy.get("@toolbar")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 2)
				.should("have.prop", "totalSteps", 3);
		});
	});

	describe("Edge Cases", () => {
		it("should handle zero total versions", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={0}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");
		});

		it("should handle single version", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");
		});

		it("should handle invalid assistant state gracefully", () => {
			cy.mount(<AITextAreaToolbar assistantState={"InvalidState" as any} />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("exist");
		});

		it("should handle negative version indices", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={-1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("exist");
		});
	});

	describe("Accessibility", () => {
		it("should have proper ARIA attributes for AI button", () => {
			cy.mount(<AITextAreaToolbar assistantState="Initial" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "title", "AI Writing Assistant (Shift + F4)");
		});

		it("should have proper ARIA attributes for version navigation", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={2}
					totalVersions={5}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.as("versioning");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("have.attr", "title")
				.and("include", "Previous Version");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("have.attr", "title")
				.and("include", "Next Version");
		});

		it("should provide keyboard navigation support", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={2}
					totalVersions={3}
					onPreviousVersionClick={cy.stub().as("onPreviousVersionClick")}
					onNextVersionClick={cy.stub().as("onNextVersionClick")}
					onGenerateClick={cy.stub().as("onGenerateClick")}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.focus()
				.realPress("Space");

			cy.get("@onGenerateClick").should("have.been.called");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.focus()
				.realPress("Enter");

			cy.get("@onPreviousVersionClick").should("have.been.called");
		});

		it("should have proper semantic structure", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Loading"
					actionText="Processing..."
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar-spacer")
				.should("exist");
		});
	});

	describe("Component Integration", () => {
		it("should properly integrate with Versioning component", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					currentVersionIndex={3}
					totalVersions={5}
				/>
			);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("exist")
				.should("have.prop", "currentStep", 3)
				.should("have.prop", "totalSteps", 5);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find("ui5-label")
				.should("contain.text", "3 / 5");
		});

		it("should maintain proper layout with all elements", () => {
			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					actionText="Generated multiple results"
					currentVersionIndex={2}
					totalVersions={4}
				/>
			);

			// Check element order and presence
			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar")
				.children()
				.should("have.length.at.least", 3);

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-label")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("ui5-toolbar-spacer")
				.should("exist");

			cy.get("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("exist");
		});
	});

	describe("Performance", () => {
		it("should handle rapid state changes efficiently", () => {
			cy.mount(<AITextAreaToolbar assistantState="Initial" />);

			cy.get("[ui5-ai-textarea-toolbar]")
				.as("toolbar");

			const states = ["Initial", "Loading"];
			
			// Rapidly change states
			states.forEach((state, index) => {
				cy.get("@toolbar").invoke("prop", "assistantState", state);
				cy.get("@toolbar").invoke("prop", "actionText", `State ${index}`);
			});

			cy.get("@toolbar")
				.should("have.prop", "assistantState", "Loading");
		});

		it("should not cause memory leaks with event handlers", () => {
			const onGenerateClick = cy.spy().as("onGenerateClick");

			cy.mount(
				<AITextAreaToolbar
					assistantState="Initial"
					onGenerateClick={onGenerateClick}
				/>
			);

			// Click multiple times
			for (let i = 0; i < 5; i++) {
				cy.get("[ui5-ai-textarea-toolbar]")
					.shadow()
					.find("#ai-menu-btn")
					.realClick();
			}

			cy.get("@onGenerateClick").should("have.callCount", 5);
		});
	});
});
