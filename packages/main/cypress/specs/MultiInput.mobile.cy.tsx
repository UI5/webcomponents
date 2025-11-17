import MultiInput from "../../src/MultiInput.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import "../../src/features/InputSuggestions.js";

describe("Multi Input on mobile device", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("should return old value if dialog is cancelled and change should not be called", () => {
		const onChange = cy.spy().as("onChange");

		cy.mount(
			<MultiInput showSuggestions={true} onChange={onChange} value="test"></MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.as("multiInput");

		cy.get("@multiInput")
			.realClick();

		cy.get("@multiInput")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.wait(500);

		cy.get("@multiInput")
			.shadow().find(".ui5-input-inner-phone").realClick();

		cy.get("@multiInput")
			.shadow().find(".ui5-input-inner-phone").realType("b");

		// press cancel
		cy.get("@multiInput")
			.shadow()
			.find(".ui5-responsive-popover-close-btn")
			.realClick();

		cy.get("@multiInput")
			.should("have.value", "test");
		cy.get("@onChange").should("not.have.been.called");
	});
});
