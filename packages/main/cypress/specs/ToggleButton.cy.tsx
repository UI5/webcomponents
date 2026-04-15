import { Key } from "@ui5/webcomponents-base/dist/thirdparty/preact/preact.module.js";
import { ModifierKey } from "../support/commands/common/types.js";
import ToggleButton from "../../src/ToggleButton.js";

function testClick(shouldPreventClick: boolean, pressedKey?: ModifierKey) {
	cy.mount(<ToggleButton>Toggle Button</ToggleButton>);

	cy.get("[ui5-toggle-button]").as("toggleButton");

	cy.get("@toggleButton")
		.then($button => {
			if (shouldPreventClick) {
				$button.get(0).addEventListener("click", (e) => e.preventDefault());
			}
			$button.get(0).addEventListener("click", cy.stub().as("clicked"));
		});

	cy.get("@toggleButton")
		.ui5ToggleButtonRealClick(shouldPreventClick, pressedKey);

	cy.get("@clicked")
		.should("have.been.calledOnce");

	if (pressedKey) {
		cy.get("@clicked")
			.should("be.calledWithMatch", {
				detail: {
					[pressedKey]: true
				},
			});
	}
}

describe("Toggle Button general interaction tests", () => {
	it("should toggle button to pressed state", () => {
		testClick(false);
	});

	it("should not toggle button to pressed state when click is prevented", () => {
		testClick(true);
	});

	it("should not fire click event on a disabled toggle button", () => {
		cy.mount(<ToggleButton disabled>Disabled Toggle Button</ToggleButton>);

		cy.get("[ui5-toggle-button]").as("toggleButton");

		cy.get("@toggleButton")
			.then($button => {
				$button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("@toggleButton")
			.realClick();

		cy.get("@clicked")
			.should("have.not.been.called")

		cy.get("@toggleButton")
			.should("not.have.attr", "pressed");
	});
});

describe("Toggle Button keyboard interaction tests", () => {
	function testKeyActionOnFocusedButton(key: Key) {
		cy.mount(<ToggleButton pressed>Toggle Button</ToggleButton>);

		cy.get("[ui5-toggle-button]").as("toggleButton");

		cy.get("@toggleButton")
			.realClick();

		cy.get("@toggleButton")
			.should("be.focused")
			.should("not.have.attr", "pressed");

		cy.realPress(key);

		cy.get("@toggleButton")
			.should("have.attr", "pressed");
	}

	it("should toggle button to pressed state on Space press", () => {
		testKeyActionOnFocusedButton("Space");
	});

	it("should toggle button to pressed state on Enter press", () => {
		testKeyActionOnFocusedButton("Enter");
	});

	it("should toggle button to pressed state on click with ctrl key pressed", () => {
		testClick(false, "ctrlKey");
	});

	it("should not toggle button to pressed state on click with ctrl key pressed when click is prevented", () => {
		testClick(true, "ctrlKey");
	});

	it("should toggle button to pressed state on click with alt key pressed", () => {
		testClick(false, "altKey");
	});

	it("should not toggle button to pressed state on click with alt key pressed when click is prevented", () => {
		testClick(true, "altKey");
	});

	it("should toggle button to pressed state on click with shift key pressed", () => {
		testClick(false, "shiftKey");
	});

	it("should not toggle button to pressed state on click with shift key pressed when click is prevented", () => {
		testClick(true, "shiftKey");
	});

	it("should toggle button to pressed state on click with meta key pressed", () => {
		testClick(false, "metaKey");
	});

	it("should not toggle button to pressed state on click with meta key pressed when click is prevented", () => {
		testClick(true, "metaKey");
	});

	it("Should toggle button to pressed state when SPACE + Shift are pressed", () => {
		cy.mount(<ToggleButton>Toggle Button</ToggleButton>);

		cy.get("[ui5-toggle-button]")
			.as("toggleButton");

		cy.get("@toggleButton")
			.shadow()
			.find(".ui5-button-root")
			.focus()
			.should("be.focused")
			.realPress(["Space", "Escape"]);
    

		cy.get("@toggleButton")
			.should("not.have.attr", "pressed");
	});

	it("Should toggle button to pressed state when SPACE + Escape are pressed", () => {
		cy.mount(<ToggleButton>Toggle Button</ToggleButton>);

		cy.get("[ui5-toggle-button]")
			.as("toggleButton");

		cy.get("@toggleButton")
			.shadow()
			.find(".ui5-button-root")
			.focus()
			.should("be.focused")
			.realPress(["Space", "Escape"]);
    

		cy.get("@toggleButton")
			.should("not.have.attr", "pressed");
	});
});
