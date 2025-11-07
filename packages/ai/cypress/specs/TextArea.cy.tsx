import TextArea from "../../src/TextArea.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";
import { 
	WRITING_ASSISTANT_BUTTON_TOOLTIP,
	WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME,
	WRITING_ASSISTANT_TOOLBAR_ACCESSIBLE_NAME,
 } from "../../src/generated/i18n/i18n-defaults.js";

describe("Basic", () => {
	describe("Initialization", () => {
		it("should render with default properties", () => {
			cy.mount(<TextArea />);

			cy.get("[ui5-ai-textarea]")
				.as("textarea")
				.should("exist")
				.should("have.prop", "loading", false)
				.should("have.prop", "promptDescription", "")
				.should("have.prop", "currentVersion", 0)
				.should("have.prop", "totalVersions", 0);

			cy.get("@textarea")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("exist");
		});

		it("should set initial value as a property", () => {
			cy.mount(<TextArea value="AI initial value" />);

			cy.get("[ui5-ai-textarea]")
				.should("have.prop", "value", "AI initial value");
		});
	});

	describe("Loading States", () => {
		it("should display non-loading state correctly", () => {
			cy.mount(<TextArea loading={false} />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", false);
		});

		it("should display loading state correctly", () => {
			cy.mount(
				<TextArea
					loading={true}
					promptDescription="Generating content..."
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", true)
				.should("have.prop", "promptDescription", "Generating content...");
		});

		it("should display single result correctly", () => {
			cy.mount(
				<TextArea
					loading={false}
					promptDescription="Generated text"
					currentVersion={0}
					totalVersions={1}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", false)
				.should("have.prop", "promptDescription", "Generated text")
				.should("have.prop", "currentVersion", 0)
				.should("have.prop", "totalVersions", 1);
		});

		it("should display multiple results correctly", () => {
			cy.mount(
				<TextArea
					loading={false}
					promptDescription="Generated text"
					currentVersion={1}
					totalVersions={3}
				/>
			);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("have.prop", "loading", false)
				.should("have.prop", "promptDescription", "Generated text")
				.should("have.prop", "currentVersion", 1)
				.should("have.prop", "totalVersions", 3);
		});
	});

	describe("Version Navigation", () => {
		it("should fire version-change event with backwards=true for previous version", () => {
			const onVersionChange = cy.spy().as("onVersionChange");

			cy.mount(
				<TextArea
					loading={false}
					currentVersion={2}
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
				<TextArea
					loading={false}
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
				<TextArea
					loading={false}
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
				<TextArea
					loading={false}
					currentVersion={3}
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
				<TextArea
					value={initialValue}
					loading={false}
					currentVersion={0}
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
				<TextArea>
					<Menu slot="menu" id="test-menu">
						<MenuItem text="Generate text" />
					</Menu>
				</TextArea>
			);

			cy.get("[ui5-ai-textarea]")
				.find("ui5-menu[slot='menu']")
				.should("exist");
		});

		it("should open menu when generate button is clicked", () => {
			const onOpen = cy.spy().as("onOpen");

			cy.mount(
				<TextArea>
					<Menu
						slot="menu"
						id="test-menu"
						onOpen={onOpen}
					>
						<MenuItem text="Generate text" />
					</Menu>
				</TextArea>
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
				<TextArea
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
			cy.mount(<TextArea />);

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
				<TextArea
					loading={false}
					currentVersion={1}
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
				<TextArea
					loading={false}
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
			cy.mount(<TextArea value="Test content" />);

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
			cy.mount(<TextArea value="Readonly content" readonly />);

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
			cy.mount(<TextArea value="Disabled content" disabled />);

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

			cy.mount(<TextArea onInput={onInput} />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.type("Hello");

			cy.get("@onInput").should("have.callCount", 5);
		});

		it("should handle change events", () => {
			const onChange = cy.spy().as("onChange");

			cy.mount(<TextArea onChange={onChange} />);

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
			cy.mount(<TextArea loading={true} />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("ui5-busy-indicator")
				.should("have.attr", "active");
		});

		it("should hide busy indicator when not loading", () => {
			cy.mount(<TextArea loading={false} />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("ui5-busy-indicator")
				.should("not.have.attr", "active");
		});
	});

	describe("Accessibility", () => {
		it("should have proper ARIA attributes", () => {
			cy.mount(<TextArea value="Test content" />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label")
				.and("not.be.empty");
		});

		it("should support custom accessible name", () => {
			cy.mount(<TextArea accessibleName="Custom AI TextArea" />);

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", "Custom AI TextArea");
		});

		it("should announce AI actions to screen readers", () => {
			cy.mount(
				<TextArea
					loading={true}
					promptDescription="Generating content..."
				/>
			);

			// Verify that the loading state content is announced via aria-live region
			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[aria-live='polite']")
				.should("contain.text", "Generating content...");
		});

		it("should have translatable accessibility attributes from WritingAssistant", () => {
			cy.mount(
				<TextArea
					loading={false}
					currentVersion={1}
					totalVersions={3}
				/>
			);

			// Verify that the integrated WritingAssistant has translatable attributes
			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("ui5-toolbar")
				.should("have.attr", "accessible-name", TextArea.i18nBundle.getText(WRITING_ASSISTANT_TOOLBAR_ACCESSIBLE_NAME));

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("#ai-menu-btn")
				.should("have.attr", "accessible-name", TextArea.i18nBundle.getText(WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME))
				.should("have.attr", "tooltip",  TextArea.i18nBundle.getText(WRITING_ASSISTANT_BUTTON_TOOLTIP));

			// Verify versioning tooltips are translatable
			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="previous"]')
				.should("have.attr", "tooltip", "Previous Version");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.shadow()
				.find("[ui5-ai-versioning]")
				.shadow()
				.find('[data-ui5-versioning-button="next"]')
				.should("have.attr", "tooltip", "Next Version");
		});
	});

	describe("Error Handling", () => {
		it("should handle invalid loading state gracefully", () => {
			cy.mount(<TextArea loading={"invalid" as any} />);

			cy.get("[ui5-ai-textarea]")
				.should("exist");

			cy.get("[ui5-ai-textarea]")
				.shadow()
				.find("[ui5-ai-writing-assistant]")
				.should("exist");
		});

		it("should handle invalid version indices gracefully", () => {
			cy.mount(
				<TextArea
					loading={false}
					currentVersion={-1}
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
				<TextArea
					loading={false}
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
