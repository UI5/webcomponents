import AITextArea from "../../src/TextArea.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";

describe("Basic", () => {
	describe("Initialization", () => {
		it("should render with default properties", () => {
			cy.mount(<AITextArea />);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.should("exist")
				.should("have.prop", "loading", false)
				.should("have.prop", "actionText", "")
				.should("have.prop", "currentVersionIndex", 1)
				.should("have.prop", "totalVersions", 1);

			cy.get("@textarea")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("exist");
		});

		it("should set initial value as a property", () => {
			cy.mount(<AITextArea value="AI initial value" />);

			cy.get("[ui5-ai-textarea]")
				.should("have.prop", "value", "AI initial value");
		});
	});

	describe("Loading States", () => {
		it("should display non-loading state correctly", () => {
			cy.mount(<AITextArea loading={false} />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", false);
		});

		it("should display loading state correctly", () => {
			cy.mount(
				<AITextArea
					loading={true}
					actionText="Generating content..."
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", true)
				.should("have.prop", "actionText", "Generating content...");
		});

		it("should display single result correctly", () => {
			cy.mount(
				<AITextArea
					loading={false}
					actionText="Generated text"
					currentVersionIndex={1}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", false)
				.should("have.prop", "actionText", "Generated text")
				.should("have.prop", "currentVersionIndex", 1)
				.should("have.prop", "totalVersions", 1);
		});

		it("should display multiple results correctly", () => {
			cy.mount(
				<AITextArea
					loading={false}
					actionText="Generated text"
					currentVersionIndex={2}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", false)
				.should("have.prop", "actionText", "Generated text")
				.should("have.prop", "currentVersionIndex", 2)
				.should("have.prop", "totalVersions", 3);
		});
	});

	describe("Version Navigation", () => {
		it("should fire version-change event with backwards=true for previous version", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<AITextArea
					loading={false}
					currentVersionIndex={2}
					totalVersions={3}
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("not.be.disabled")
				.realClick();

			cy.get("@onVersionChange")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.equal", {
					backwards: true
				});
		});

		it("should fire version-change event with backwards=false for next version", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<AITextArea
					loading={false}
					currentVersionIndex={1}
					totalVersions={3}
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("not.be.disabled")
				.realClick();

			cy.get("@onVersionChange")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.equal", {
					backwards: false
				});
		});

		it("should disable previous button when at first version", () => {
			cy.mount(
				<AITextArea
					loading={false}
					currentVersionIndex={1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});

		it("should disable next button when at last version", () => {
			cy.mount(
				<AITextArea
					loading={false}
					currentVersionIndex={3}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.shadow()
				.find("ui5-button")
				.should("have.attr", "disabled");
		});

		it("should sync textarea content after version navigation", () => {
			const initialValue = "Version 1 content";
			const newValue = "Version 2 content";

			cy.mount(
				<AITextArea
					value={initialValue}
					loading={false}
					currentVersionIndex={1}
					totalVersions={2}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.invoke("prop", "value", newValue);

			cy.get("@textarea")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
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
				.find("[ui5-ai-writing-assistant]")
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
					loading={true}
					onStopGeneration={onStopGeneration}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
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
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("be.focused");
		});

		it("should handle Ctrl+Shift+Z for previous version when multiple versions exist", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<AITextArea
					loading={false}
					currentVersionIndex={2}
					totalVersions={3}
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.focus()
				.realPress(['Control', 'Shift', 'z']);

			cy.get("@onVersionChange")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.equal", {
					backwards: true
				});
		});

		it("should handle Ctrl+Shift+Y for next version when multiple versions exist", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<AITextArea
					loading={false}
					currentVersionIndex={1}
					totalVersions={3}
					onVersionChange={onVersionChange}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.focus()
				.realPress(['Control', 'Shift', 'y']);

			cy.get("@onVersionChange")
				.should("have.been.calledOnce")
				.its("firstCall.args.0.detail")
				.should("deep.equal", {
					backwards: false
				});
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
				.should("have.attr", "readonly");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "readonly");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.should("have.value", "Readonly content");
		});

		it("should support disabled mode", () => {
			cy.mount(<AITextArea value="Disabled content" disabled />);

			cy.get("[ui5-ai-textarea]")
				.should("have.attr", "disabled");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "disabled");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
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
				.should("have.been.called");

			cy.get("@onChange")
				.its("firstCall.args.0")
				.should("have.property", "target")
				.and("have.property", "value", "test");
		});
	});

	describe("Busy State", () => {
		it("should show busy indicator when loading", () => {
			cy.mount(<AITextArea loading={true} />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("ui5-busy-indicator")
				.should("have.attr", "active");
		});

		it("should hide busy indicator when not loading", () => {
			cy.mount(<AITextArea loading={false} />);

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
				.should("have.attr", "aria-label")
				.and("not.be.empty");
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
					loading={true}
					actionText="Generating content..."
				/>
			);

			// Verify that the loading state content is announced via aria-live region
			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[aria-live='polite']")
				.should("contain.text", "Generating content...");
		});
	});

	describe("Error Handling", () => {
		it("should handle invalid loading state gracefully", () => {
			cy.mount(<AITextArea loading={"invalid" as any} />);

			cy.get("[ui5-ai-textarea]")
				.should("exist");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("exist");
		});

		it("should handle invalid version indices gracefully", () => {
			cy.mount(
				<AITextArea
					loading={false}
					currentVersionIndex={-1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.should("exist");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("exist");
		});

		it("should handle zero total versions", () => {
			cy.mount(
				<AITextArea
					loading={false}
					currentVersionIndex={1}
					totalVersions={0}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.should("exist");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.should("not.exist");
		});
	});
});
