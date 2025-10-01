import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";
import ComboBoxItemGroup from "../../src/ComboBoxItemGroup.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";
import { COMBOBOX_DIALOG_OK_BUTTON, COMBOBOX_DIALOG_CANCEL_BUTTON } from "../../src/generated/i18n/i18n-defaults.js";

describe("Basic mobile picker rendering and interaction", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should render properly the mobile picker", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
				<ComboBoxItem text="Australia" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover").find("[ui5-input]").should("be.visible");
		cy.get("@popover").find(".ui5-responsive-popover-close-btn").should("be.visible");
		cy.get("@popover").find(".ui5-responsive-popover-footer [ui5-button]").should("be.visible");
	});

	it("Should close the mobile picker dialog when pressing the close button", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover").find(".ui5-responsive-popover-close-btn").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();
	});

	it("Should close the mobile picker dialog when pressing the OK button", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover").find(".ui5-responsive-popover-footer [ui5-button]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();
	});

	it("Should propagate the placeholder to the internal input", () => {
		cy.mount(
			<ComboBox placeholder="Test placeholder">
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.should("have.attr", "placeholder", "Test placeholder");
	});

	it("Should open and close the mobile picker with value state", () => {
		cy.mount(
			<ComboBox valueState="Negative">
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover").find("[ui5-input]").shadow().find("input").realType("A");

		cy.get("@popover").should("have.attr", "open");

		cy.get("@popover").find("[ui5-input]").shadow().find("input").realPress("Escape");
		cy.realPress("Escape");

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();
	});

	it("checks OK and Cancel button text in dialog on mobile device", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="England" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");
		
		cy.get("@popover")
			.find(".ui5-responsive-popover-footer")
			.find("[ui5-button]")
			.eq(0)
			.should("have.text", COMBOBOX_DIALOG_OK_BUTTON.defaultText);

		cy.get("@popover")
			.find(".ui5-responsive-popover-footer")
			.find("[ui5-button]")
			.eq(1)
			.should("have.text", COMBOBOX_DIALOG_CANCEL_BUTTON.defaultText);
	});
});

describe("Eventing", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should fire change event with correct parameters on item press", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Canada" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]").find("[ui5-cb-item]").eq(1).realClick();

		cy.get("@changeSpy").should('have.been.calledOnce');
		cy.get("@changeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Bulgaria";
		}));

		cy.get("[ui5-combobox]").should("have.prop", "value", "Bulgaria");
	});

	it("Should fire input event with correct parameters when typing in internal input", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
				<ComboBoxItem text="Australia" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.invoke('on', 'input', cy.spy().as('inputSpy'));

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.shadow()
			.find("input")
			.realType("ABC");

		cy.get("@inputSpy").should('have.been.called');

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] .ui5-responsive-popover-close-btn")
			.realClick();
	});

	it("Should not fire change event when pressing the picker's Close button", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.as("dialogInput")
			.invoke('prop', 'value', '');

		cy.get("@dialogInput").shadow().find("input").type("A");

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] .ui5-responsive-popover-close-btn")
			.realClick();

		cy.get("@changeSpy").should('not.have.been.called');
		cy.get("[ui5-combobox]").should("have.prop", "value", "");
	});

	it("Should fire change event when pressing the picker's OK button", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.as("dialogInput")
			.invoke('prop', 'value', '');

		cy.get("@dialogInput").shadow().find("input").type("A");

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] .ui5-responsive-popover-footer [ui5-button]")
			.realClick();

		cy.get("@changeSpy").should('have.been.calledOnce');
	});

	it("When select an item, then open the dialog again and delete the text, then press OK button, the value should be deleted", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find("[ui5-input]")
			.as("dialogInput")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@dialogInput").invoke('prop', 'value', '');
		cy.get("@dialogInput").shadow().find("input").realType("A");

		cy.get("@popover")
			.find(".ui5-responsive-popover-footer [ui5-button]")
			.as("okBtn")
			.realClick();

		cy.get("[ui5-combobox]").should("have.prop", "value", "Algeria");

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("@dialogInput").shadow().find("input").clear();

		cy.get("@okBtn").realClick();

		cy.get("[ui5-combobox]").should("have.prop", "value", "");
	});

	it("Should set clear icon to dialog's input", () => {
		cy.mount(
			<ComboBox showClearIcon>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").shadow().find("input").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.should("have.prop", "showClearIcon", true);
	});
});

describe("Typeahead", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should autocomplete the first matched suggestion item", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Canada" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.shadow()
			.find("input")
			.realClick();

		cy.realType("Bu");

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.should("have.prop", "value", "Bulgaria");
	});

	it("Should not perform typeahead when it is disabled", () => {
		cy.mount(
			<ComboBox noTypeahead>
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Brazil" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.as("dialogInput")
			.shadow()
			.find("input")
			.type("b");

		cy.get("@dialogInput").should("have.prop", "value", "b");
	});
});

describe("Picker filtering", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should filter items", () => {
		cy.mount(
			<ComboBox valueState="Critical">
				<ComboBoxItemGroup headerText="Group A">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Argentina" />
					<ComboBoxItem text="Australia" />
					<ComboBoxItem text="Austria" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group B">
					<ComboBoxItem text="Bahrain" />
					<ComboBoxItem text="Belgium" />
					<ComboBoxItem text="Brazil" />
					<ComboBoxItem text="Bulgaria" />
					<ComboBoxItem text="Bosnia" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 9);

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.realType("B");

		cy.get("[ui5-combobox]")
			.find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 5);
	});

	it("Should filter group header list items", () => {
		cy.mount(
			<ComboBox valueState="Critical">
				<ComboBoxItemGroup headerText="Group A">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Argentina" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group B">
					<ComboBoxItem text="Bahrain" />
					<ComboBoxItem text="Belgium" />
					<ComboBoxItem text="Brazil" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group C">
					<ComboBoxItem text="Canada" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.find("[ui5-cb-item-group]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 3);

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-input]")
			.realType("B");

		cy.get("[ui5-combobox]")
			.find("[ui5-cb-item-group]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 1);
	});
});

describe("Value state header", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should show value state header inside mobile dialog", () => {
		cy.mount(
			<ComboBox valueState="Critical">
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover] .ui5-valuestatemessage-header")
			.should("be.visible");
	});
});
