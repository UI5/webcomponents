import AITextArea from "../../src/AITextArea.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";

describe("AITextArea Component", () => {
	describe("Initialization", () => {
		it("should render with Initial properties", () => {
			cy.mount(<AITextArea />);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.should("exist")
				.should("have.prop", "assistantState", "Initial")
				.should("have.prop", "actionText", "")
				.should("have.prop", "currentVersionIndex", 1)
				.should("have.prop", "totalVersions", 1);

			cy.get("@textarea")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.should("exist");
		});

		it("should set initial value as a property", () => {
			cy.mount(<AITextArea value="AI initial value" />);

			cy.get("[ui5-ai-textarea]")
				.should("have.prop", "value", "AI initial value");
		});
	});

	describe("Assistant States", () => {
		it("should display Initial state correctly", () => {
			cy.mount(<AITextArea assistantState="Initial" />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.should("have.prop", "assistantState", "Initial");
		});

		it("should display Loading state correctly", () => {
			cy.mount(
				<AITextArea
					assistantState="Loading"
					actionText="Generating content..."
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.should("have.prop", "assistantState", "Loading")
				.should("have.prop", "actionText", "Generating content...");
		});

		it("should display single result correctly", () => {
			cy.mount(
				<AITextArea
					assistantState="Initial"
					actionText="Generated text"
					currentVersionIndex={1}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.should("have.prop", "assistantState", "Initial")
				.should("have.prop", "actionText", "Generated text")
				.should("have.prop", "currentVersionIndex", 1)
				.should("have.prop", "totalVersions", 1);
		});

		it("should display multiple results correctly", () => {
			cy.mount(
				<AITextArea
					assistantState="Initial"
					actionText="Generated text"
					currentVersionIndex={2}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.should("have.prop", "assistantState", "Initial")
				.should("have.prop", "actionText", "Generated text")
				.should("have.prop", "currentVersionIndex", 2)
				.should("have.prop", "totalVersions", 3);
		});
	});

	describe("Version Navigation", () => {
		it("should fire previous-version-click event with proper event details", () => {
			const onPreviousVersionClick = cy.spy().as("onPreviousVersionClick");

			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={2}
					totalVersions={3}
					onPreviousVersionClick={onPreviousVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("not.be.disabled")
				.realClick();

			cy.get("@onPreviousVersionClick")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.include", {
					currentIndex: 2,
					totalVersions: 3
				});
		});

		it("should fire next-version-click event with proper event details", () => {
			const onNextVersionClick = cy.spy().as("onNextVersionClick");

			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={3}
					onNextVersionClick={onNextVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("not.be.disabled")
				.realClick();

			cy.get("@onNextVersionClick")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.include", {
					currentIndex: 1,
					totalVersions: 3
				});
		});

		it("should disable previous button when at first version", () => {
			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("be.disabled");
		});

		it("should disable next button when at last version", () => {
			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={3}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("be.disabled");
		});

		it("should sync textarea content after version navigation", () => {
			const initialValue = "Version 1 content";
			const newValue = "Version 2 content";

			cy.mount(
				<AITextArea
					value={initialValue}
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={2}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.invoke("prop", "value", newValue);

			cy.get("@textarea")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.realClick();

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", newValue);
		});
	});

	describe("Menu Integration", () => {
		it("should handle menu slot correctly", () => {
			cy.mount(
				<AITextArea>
					<Menu slot="menu" id="test-menu">
						<MenuItem text="Generate text" />
					</Menu>
				</AITextArea>
			);

			cy.get("[ui5-ai-textarea]")
				.find("ui5-menu[slot='menu']")
				.should("exist");
		});

		it("should open menu when generate button is clicked", () => {
			const onOpen = cy.spy().as("onOpen");

			cy.mount(
				<AITextArea>
					<Menu
						slot="menu"
						id="test-menu"
						onOpen={onOpen}
					>
						<MenuItem text="Generate text" />
					</Menu>
				</AITextArea>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onOpen").should("have.been.called");
		});
	});

	describe("Stop Generation", () => {
		it("should fire stop-generation event", () => {
			const onStopGeneration = cy.spy().as("onStopGeneration");

			cy.mount(
				<AITextArea
					assistantState="Loading"
					onStopGeneration={onStopGeneration}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.realClick();

			cy.get("@onStopGeneration").should("have.been.calledOnce");
		});
	});

	describe("Keyboard Shortcuts", () => {
		it("should handle Shift+F4 to focus AI button", () => {
			cy.mount(<AITextArea />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.focus()
				.realPress(['Shift', 'F4']);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("be.focused");
		});

		it("should handle Ctrl+Shift+Z for previous version when multiple versions exist", () => {
			const onPreviousVersionClick = cy.spy().as("onPreviousVersionClick");

			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={2}
					totalVersions={3}
					onPreviousVersionClick={onPreviousVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.focus()
				.realPress(['Control', 'Shift', 'z']);

			cy.get("@onPreviousVersionClick").should("have.been.calledOnce");
		});

		it("should handle Ctrl+Shift+Y for next version when multiple versions exist", () => {
			const onNextVersionClick = cy.spy().as("onNextVersionClick");

			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={3}
					onNextVersionClick={onNextVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.focus()
				.realPress(['Control', 'Shift', 'y']);

			cy.get("@onNextVersionClick").should("have.been.calledOnce");
		});
	});

	describe("TextArea Integration", () => {
		it("should inherit TextArea functionality", () => {
			cy.mount(<AITextArea value="Test content" />);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "Test content")
				.type(" additional text");

			cy.get("@textarea")
				.should("have.prop", "value")
				.and("include", "Test content")
				.and("include", "additional text");
		});

		it("should support readonly mode", () => {
			cy.mount(<AITextArea value="Readonly content" readonly />);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.should("have.attr", "readonly");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.attr", "readonly")
				.should("have.value", "Readonly content");
		});

		it("should support disabled mode", () => {
			cy.mount(<AITextArea value="Disabled content" disabled />);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.should("have.attr", "disabled");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.attr", "disabled")
				.should("have.value", "Disabled content");
		});
	});

	describe("Event Handling", () => {
		it("should handle input events", () => {
			const onInput = cy.spy().as("onInput");

			cy.mount(<AITextArea onInput={onInput} />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.type("Hello");

			cy.get("@onInput").should("have.callCount", 5);
		});

		it("should handle change events", () => {
			const onChange = cy.spy().as("onChange");

			cy.mount(<AITextArea onChange={onChange} />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.type("test")
				.blur();

			cy.get("@onChange")
				.should("have.been.called")
				.its("firstCall.args.0.detail.value")
				.should("include", "test");
		});
	});

	describe("Busy State", () => {
		it("should show busy indicator when in Loading state", () => {
			cy.mount(<AITextArea assistantState="Loading" />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("ui5-busy-indicator")
				.should("have.attr", "active");
		});

		it("should hide busy indicator when not in Loading state", () => {
			cy.mount(<AITextArea assistantState="Initial" />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("ui5-busy-indicator")
				.should("not.have.attr", "active");
		});
	});

	describe("Accessibility", () => {
		it("should have proper ARIA attributes", () => {
			cy.mount(<AITextArea value="Test content" />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label");
		});

		it("should support custom accessible name", () => {
			cy.mount(<AITextArea accessibleName="Custom AI TextArea" />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", "Custom AI TextArea");
		});

		it("should announce AI actions to screen readers", () => {
			cy.mount(
				<AITextArea
					assistantState="Loading"
					actionText="Generating content..."
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "title", "AI Writing Assistant (Shift + F4)");
		});
	});

	describe("Error Handling", () => {
		it("should handle invalid assistant state gracefully", () => {
			cy.mount(<AITextArea assistantState={"InvalidState" as any} />);

			cy.get("[ui5-ai-textarea]")
				.should("exist");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.should("exist");
		});

		it("should handle invalid version indices gracefully", () => {
			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={-1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.should("exist");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.should("exist");
		});

		it("should handle zero total versions", () => {
			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={0}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.should("exist");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("not.exist");
		});
	});

	describe("State Transitions", () => {
		it("should handle state transition from Initial to Loading", () => {
			cy.mount(<AITextArea assistantState="Initial" />);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.should("have.prop", "assistantState", "Initial");

			cy.get("@textarea")
				.invoke("prop", "assistantState", "Loading")
				.invoke("prop", "actionText", "Generating...");

			cy.get("@textarea")
				.should("have.prop", "assistantState", "Loading")
				.should("have.prop", "actionText", "Generating...");
		});

		it("should handle state transition from Loading to single result", () => {
			cy.mount(
				<AITextArea
					assistantState="Loading"
					actionText="Generating..."
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.invoke("prop", "assistantState", "Initial")
				.invoke("prop", "actionText", "Generated text")
				.invoke("prop", "currentVersionIndex", 1)
				.invoke("prop", "totalVersions", 1);

			cy.get("@textarea")
				.should("have.prop", "assistantState", "Initial")
				.should("have.prop", "actionText", "Generated text")
				.should("have.prop", "currentVersionIndex", 1)
				.should("have.prop", "totalVersions", 1);
		});

		it("should handle state transition from single to multiple results", () => {
			cy.mount(
				<AITextArea
					assistantState="Initial"
					actionText="Generated text"
					currentVersionIndex={1}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.invoke("prop", "assistantState", "Initial")
				.invoke("prop", "actionText", "Multiple results")
				.invoke("prop", "currentVersionIndex", 2)
				.invoke("prop", "totalVersions", 3);

			cy.get("@textarea")
				.should("have.prop", "assistantState", "Initial")
				.should("have.prop", "currentVersionIndex", 2)
				.should("have.prop", "totalVersions", 3);

			cy.get("@textarea")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.should("exist");
		});
	});

	describe("Focus Management", () => {
		it("should manage focus when navigating versions", () => {
			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={2}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.shadow()
				.find("[ui5-ai-textarea-toolbar]")
				.shadow()
				.find("[ui5-ai-textarea-versioning]")
				.as("versioning");

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.as("nextButton")
				.should("not.be.disabled")
				.realClick();

			cy.get("@textarea")
				.invoke("prop", "currentVersionIndex", 3);

			cy.get("@versioning")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("be.focused");
		});

		it("should maintain focus on textarea after keyboard shortcuts", () => {
			const onNextVersionClick = cy.spy().as("onNextVersionClick");

			cy.mount(
				<AITextArea
					assistantState="Initial"
					currentVersionIndex={1}
					totalVersions={3}
					onNextVersionClick={onNextVersionClick}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.focus()
				.realPress(['Control', 'Shift', 'y']);

			cy.get("@onNextVersionClick").should("have.been.calledOnce");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.should("be.focused");
		});
	});
});
