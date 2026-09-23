import Select from "../../src/Select.js";
import Option from "../../src/Option.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";
import {
	SELECT_DIALOG_CANCEL_BUTTON,
	SELECT_POPOVER_ACCESSIBLE_NAME_PREFIX,
	SELECT_LISTBOX_LABEL,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("Select mobile general interaction", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("ResponsivePopover accessible name should match the expected title text", () => {
		cy.mount(
			<Select id="select">
				<Option value="option1">Option 1</Option>
				<Option value="option2">Option 2</Option>
			</Select>
		);

		// Open the popover
		cy.get("#select").realClick();
		const expectedAccessibleName = `${SELECT_POPOVER_ACCESSIBLE_NAME_PREFIX.defaultText} ${SELECT_LISTBOX_LABEL.defaultText}`;

		cy.get("#select")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "accessible-name", expectedAccessibleName);
	});

	it("should focus the selected option when popover opens", () => {
		cy.mount(
			<Select id="select" value="option2">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
				<Option id="opt3" value="option3">Option 3</Option>
			</Select>
		);
        cy.get("#select").realClick();

		cy.get("#opt2").should("have.attr", "focused");
		cy.get("#opt2").shadow()
            .find(".ui5-li-root")
            .should("be.focused");
	});

	it("Changes selection in Dialog", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Condensed");

		cy.get("@select").realClick();

		cy.get("@select").realPress("ArrowUp");
		cy.get("@select").realPress("ArrowUp");

		cy.get("@select").realPress("Enter");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Cozy");

		cy.get("@changeStub").should("have.been.calledOnce");

		cy.get("@select").should("have.prop", "value", "Cozy");
	});
});

describe("Select - mobile popover Cancel button", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("renders only the Cancel button in the footer (no X in header)", () => {
		cy.mount(
			<Select>
				<Option>Option 1</Option>
				<Option>Option 2</Option>
			</Select>
		);

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		// Header has no close button anymore.
		cy.get("@popover")
			.find("[slot=header] .ui5-responsive-popover-close-btn")
			.should("not.exist");

		// Footer renders exactly one Cancel button.
		cy.get("@popover")
			.find(".ui5-responsive-popover-footer [ui5-button]")
			.should("have.length", 1)
			.and("have.class", "ui5-responsive-popover-close-btn")
			.and("contain.text", SELECT_DIALOG_CANCEL_BUTTON.defaultText);
	});

	it("closes the mobile picker when the Cancel button is pressed", () => {
		cy.mount(
			<Select>
				<Option>Option 1</Option>
				<Option>Option 2</Option>
			</Select>
		);

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find(".ui5-responsive-popover-footer [ui5-button]")
			.realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();
	});
});
