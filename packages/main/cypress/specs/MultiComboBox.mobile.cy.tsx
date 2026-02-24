import { SHOW_SELECTED_BUTTON } from "../../src/generated/i18n/i18n-defaults.js";
import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";

describe("MultiComboBox mobile general interaction", () => {
    beforeEach(() => {
        cy.ui5SimulateDevice("phone");

        cy.mount(
            <MultiComboBox placeholder="Select options">
                <MultiComboBoxItem text="Item 1" selected />
                <MultiComboBoxItem text="Item 2" selected />
                <MultiComboBoxItem text="Item 3" />
                <MultiComboBoxItem text="Item 4" selected />
            </MultiComboBox>
        );
        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .as("input");

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("respPopover");
    });
    it("Should render properly the mobile picker", () => {
        cy.get("@input")
            .realClick();

        cy.get<ResponsivePopover>("@respPopover")
            .ui5ResponsivePopoverOpened();

        cy.get("@respPopover")
            .find("[ui5-input]")
            .should("be.visible");

        cy.get("@respPopover")
            .find(".ui5-responsive-popover-close-btn")
            .should("be.visible");

        cy.get("@respPopover")
            .find("[ui5-toggle-button]")
            .should("be.visible");

        cy.get("@respPopover")
            .find(".ui5-responsive-popover-footer")
            .find("[ui5-button]")
            .should("be.visible");
    });

    it("Should close the mobile picker dialog when pressing the close button", () => {
        cy.get("@input")
            .realClick();

        cy.get<ResponsivePopover>("@respPopover")
            .ui5ResponsivePopoverOpened();

        cy.get("@respPopover")
            .find(".ui5-responsive-popover-close-btn")
            .realClick();

        cy.get<ResponsivePopover>("@respPopover")
            .ui5ResponsivePopoverClosed();
    });

    it("Should collapse the tokenizer when the picker is closed", () => {

        cy.get("@input")
            .realClick();

        cy.get<ResponsivePopover>("@respPopover")
            .ui5ResponsivePopoverOpened();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .as("tokenizer");

        cy.get("@respPopover")
            .find(".ui5-responsive-popover-close-btn")
            .realClick();

        cy.get("@tokenizer")
            .should("not.have.attr", "expanded");
    });

    it("Should close the mobile picker dialog when pressing the OK button", () => {
        cy.get("@input")
            .realClick();

        cy.get<ResponsivePopover>("@respPopover")
            .ui5ResponsivePopoverOpened();

        cy.get("@respPopover")
            .find(".ui5-responsive-popover-footer")
            .find("[ui5-button]")
            .realClick();

        cy.get<ResponsivePopover>("@respPopover")
            .ui5ResponsivePopoverClosed();
    });

    it("Should open the picker with preselected items only when n-more is clicked", () => {
        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .realClick();

        cy.get<ResponsivePopover>("@respPopover")
            .ui5ResponsivePopoverOpened();

        cy.get("@respPopover")
            .find("[ui5-toggle-button]")
            .should("have.attr", "pressed");

        cy.get("@respPopover")
            .find("[ui5-list]")
            .find("slot")
            .should("have.length", 3);
    });

    it("Should show all items again when the toggle selected items is unpressed", () => {
        cy.get("@input")
            .realClick();

        cy.get("@respPopover")
            .find("[ui5-toggle-button]")
            .realClick();

        cy.get("@respPopover")
            .find("[ui5-list]")
            .find("slot")
            .should("have.length", 3);

        cy.get("@respPopover")
            .find("[ui5-toggle-button]")
            .realClick();

        cy.get("@respPopover")
            .find("[ui5-list]")
            .find("slot")
            .should("have.length", 4);
    });

    it("Should propagate the placeholder to the internal input", () => {
        cy.mount(
            <MultiComboBox id="mcb" placeholder="Select options">
                <MultiComboBoxItem text="Item 1" />
            </MultiComboBox>
        );
        cy.get("#mcb")
            .shadow()
            .find("input")
            .should("have.attr", "placeholder", "Select options");

        cy.get("#mcb")
            .shadow()
            .find("input")
            .realClick();

        cy.get("#mcb")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find("[ui5-input]")
            .should("have.attr", "placeholder", "Select options");
    });
});

describe("Typeahead", () => {
    beforeEach(() => {
        cy.ui5SimulateDevice("phone");
    });

    it("Should autocomplete the first matched suggestion item", () => {
        cy.mount(
            <MultiComboBox>
                <MultiComboBoxItem text="Cosy" />
                <MultiComboBoxItem text="Compact" />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .as("input");

        cy.get("@input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find("[ui5-input]")
            .as("respPopoverInput")
            .realClick()
            .realType("c");

        cy.get("@respPopoverInput")
            .should("have.value", "Cosy");
    });

    it("Should not perform typeahead when it is disabled", () => {
        cy.mount(
            <MultiComboBox noTypeahead>
                <MultiComboBoxItem text="Cosy" />
                <MultiComboBoxItem text="Compact" />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .as("input");

        cy.get("@input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find("[ui5-input]")
            .as("respPopoverInput")
            .realClick()
            .realType("c");

        cy.get("@respPopoverInput")
            .should("have.value", "c");
    });

    it("Should not change the value of MultiComboBox when readonly", () => {
        cy.mount(
            <MultiComboBox readonly style={{ width: "50%" }}>
                <MultiComboBoxItem text="Cosy" selected />
                <MultiComboBoxItem text="Compact" selected />
                <MultiComboBoxItem text="Some text" />
                <MultiComboBoxItem text="Comfortable" selected />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .as("input");

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("respPopover")
            .find("[ui5-input]")
            .as("respPopoverInput")
            .realClick()
            .realType("test");

        cy.get("@respPopover")
            .find(".ui5-responsive-popover-footer")
            .find("[ui5-button]")
            .realClick();

        cy.get<ResponsivePopover>("@respPopover")
            .ui5ResponsivePopoverClosed();

        cy.get("[ui5-multi-combobox]")
            .should("have.prop", "value", "");
    });
});

describe("Items selection", () => {
    beforeEach(() => {
        cy.ui5SimulateDevice("phone");
    });


    it("Should close the picker and create token when item is pressed in the picker", () => {
        cy.mount(
            <MultiComboBox placeholder="Select options">
                <MultiComboBoxItem text="Cosy" />
                <MultiComboBoxItem text="Compact" />
                <MultiComboBoxItem text="Some text" />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .as("input");

        cy.get("@input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .find("[ui5-mcb-item]")
            .eq(0)
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .find("[ui5-token]")
            .as("token");

        cy.get("@token")
            .should("have.length", 1);

        cy.get("@token")
            .shadow()
            .find(".ui5-token--text")
            .should("have.text", "Cosy");
    });

    it("Should create token when item is selected in the picker and ok button is pressed", () => {
        cy.mount(
            <MultiComboBox>
                <MultiComboBoxItem text="Cosy" />
                <MultiComboBoxItem text="Compact" selected />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .find("[ui5-mcb-item]")
            .eq(0)
            .shadow()
            .find("[ui5-checkbox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-responsive-popover-footer")
            .find("[ui5-button]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .find("[ui5-token]")
            .as("token");

        cy.get("@token")
            .should("have.length", 2);
    });

    it("Should not create token when item is selected in the picker and the 'Close' button is pressed", () => {
        cy.mount(
            <MultiComboBox>
                <MultiComboBoxItem text="Cosy" selected />
                <MultiComboBoxItem text="Compact" />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .find("[ui5-mcb-item]")
            .eq(1)
            .shadow()
            .find("[ui5-checkbox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-responsive-popover-close-btn")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .find("[ui5-token]")
            .should("have.length", 1);
    });

    it("Should not allow deselection when readonly", () => {
        cy.mount(
            <MultiComboBox readonly>
                <MultiComboBoxItem text="Compact" selected />
                <MultiComboBoxItem text="Cosy" selected />
                <MultiComboBoxItem text="Some text" selected />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .realClick();


        cy.get("[ui5-multi-combobox]")
            .find("[ui5-mcb-item]")
            .eq(0)
            .shadow()
            .find("[ui5-checkbox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-responsive-popover-footer")
            .find("[ui5-button]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .find("[ui5-token]")
            .should("have.length", 3);
    });

    it("Should not allow additional selection when readonly", () => {
        cy.mount(
            <MultiComboBox readonly>
                <MultiComboBoxItem text="Compact" selected />
                <MultiComboBoxItem text="Cosy" />
                <MultiComboBoxItem text="Condensed" selected />
                <MultiComboBoxItem text="Some text" selected />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find("[ui5-toggle-button]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .find("[ui5-mcb-item]")
            .eq(1)
            .shadow()
            .find("[ui5-checkbox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-responsive-popover-footer")
            .find("[ui5-button]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .find("[ui5-token]")
            .should("have.length", 3);
    });

    it("Should select all items when clicking select all", () => {
        cy.mount(
            <MultiComboBox showSelectAll>
                <MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
                <MultiComboBoxItem text="Compact"></MultiComboBoxItem>
                <MultiComboBoxItem text="Some text"></MultiComboBoxItem>
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-mcb-select-all-checkbox")
            .shadow()
            .find(".ui5-checkbox-root")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-responsive-popover-footer")
            .find("[ui5-button]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .find("[ui5-token]")
            .should("have.length", 3);
    });

    it("Select all should not be checked if all items are not selected", () => {
        cy.mount(
            <MultiComboBox showSelectAll>
                <MultiComboBoxItem text="Cosy" selected></MultiComboBoxItem>
                <MultiComboBoxItem text="Compact"></MultiComboBoxItem>
                <MultiComboBoxItem text="Some text"></MultiComboBoxItem>
            </MultiComboBox>
        );


        cy.get("[ui5-multi-combobox]")
            .realClick();


        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-responsive-popover-close-btn")
            .as("closeBtn")

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-mcb-select-all-checkbox")
            .as("showSelectAllCheckbox");

        cy.get("@showSelectAllCheckbox")
            .shadow()
            .find(".ui5-checkbox-root")
            .realClick();

        cy.get("@closeBtn")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .realClick();

        cy.get("@showSelectAllCheckbox")
            .should("not.have.a.property", "checked");
    });

    it("Should not close the dialog on checkbox click", () => {
        cy.mount(
            <MultiComboBox>
                <MultiComboBoxItem text="Compact"></MultiComboBoxItem>
                <MultiComboBoxItem text="Some text"></MultiComboBoxItem>
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .find("[ui5-mcb-item]")
            .eq(1)
            .shadow()
            .find("[ui5-checkbox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find<ResponsivePopover>("[ui5-responsive-popover]")
            .ui5ResponsivePopoverOpened();
    });

    it("Should disable the toggle button when there are no selected items", () => {
        cy.mount(
            <MultiComboBox>
                <MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
                <MultiComboBoxItem text="Compact"></MultiComboBoxItem>
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find<ResponsivePopover>("[ui5-responsive-popover]")
            .as("respPopover")
            .ui5ResponsivePopoverOpened();

        cy.get("@respPopover")
            .find("[ui5-toggle-button]")
            .should("have.attr", "disabled");
    });

    it("Should enable the toggle button when there is selected item", () => {
        cy.mount(
            <MultiComboBox>
                <MultiComboBoxItem text="Cosy" selected></MultiComboBoxItem>
                <MultiComboBoxItem text="Compact"></MultiComboBoxItem>
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find<ResponsivePopover>("[ui5-responsive-popover]")
            .as("respPopover")
            .ui5ResponsivePopoverOpened();

        cy.get("@respPopover")
            .find("[ui5-toggle-button]")
            .should("not.have.attr", "disabled");
    });

    it("Should show only selected items on n-more click and toggle the button", () => {
        cy.mount(
            <MultiComboBox placeholder="Select options">
                <MultiComboBoxItem text="Item 1" selected />
                <MultiComboBoxItem text="Item 2" selected />
                <MultiComboBoxItem text="Item 3" />
                <MultiComboBoxItem text="Item 4" selected />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find<ResponsivePopover>("[ui5-responsive-popover]")
            .as("respPopover")
            .ui5ResponsivePopoverOpened();

        cy.get("@respPopover")
            .find("[ui5-toggle-button]")
            .should("have.attr", "pressed");

        cy.get("@respPopover")
            .find("[ui5-list]")
            .find("slot")
            .should("have.length", 3);
    });

    it("Shows all items matching 'I' after clicking N-more and typing in the popover input", () => {
        cy.mount(
            <MultiComboBox placeholder="Select options">
                <MultiComboBoxItem text="Item 1" selected />
                <MultiComboBoxItem text="Item 2" />
                <MultiComboBoxItem text="Item 3" />
                <MultiComboBoxItem text="Item 4" selected />
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find<ResponsivePopover>("[ui5-responsive-popover]")
            .as("respPopover")
            .ui5ResponsivePopoverOpened();

        cy.get("@respPopover")
            .find("[ui5-toggle-button]")
            .should("have.attr", "pressed");

        cy.get("@respPopover")
            .find("[ui5-list]")
            .find("slot")
            .should("have.length", 2);

        cy.get("@respPopover")
            .find("[ui5-input]")
            .realClick()
            .realType("I");

        cy.get("@respPopover")
            .find("[ui5-toggle-button]")
            .should("not.have.attr", "pressed");

        cy.get("@respPopover")
            .find("[ui5-list]")
            .find("slot")
            .should("have.length", 4);
    });
});

describe("Value state header", () => {
    beforeEach(() => {
        cy.ui5SimulateDevice("phone");
    });

    it("Should show value state header inside mobile dialog", () => {
        cy.mount(
            <MultiComboBox noValidation valueState="Negative">
                <MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
                <MultiComboBoxItem text="Compact"></MultiComboBoxItem>
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-icon]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("respPopover");

        cy.get("@respPopover")
            .find(".ui5-valuestatemessage-header")
            .should("be.visible");

        cy.get("@respPopover")
            .find("[ui5-input]")
            .should("have.attr", "value-state", "Negative");
    });
});

describe("Eventing", () => {
    beforeEach(() => {
        cy.ui5SimulateDevice("phone");

        cy.mount(
            <MultiComboBox>
                <MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
                <MultiComboBoxItem text="Compact"></MultiComboBoxItem>
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .invoke("on", "selection-change", cy.spy().as("selectionChangeSpy"));

    });

    it("Should fire selection change event when the item inside the picker (not the checkbox) is pressed", () => {

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .find("[ui5-mcb-item]")
            .eq(0)
            .realClick();

        cy.get("@selectionChangeSpy")
            .should("have.been.calledOnce");
    });

    it("Should fire selection change event when items are selected and the 'OK' button is pressed", () => {

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .find("[ui5-mcb-item]")
            .eq(0)
            .shadow()
            .find("[ui5-checkbox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-responsive-popover-footer")
            .find("[ui5-button]")
            .realClick();

        cy.get("@selectionChangeSpy")
            .should("be.calledOnce");
    });

    it("Should not fire selection change event when items are selected and the 'Close' button is pressed", () => {

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .find("[ui5-mcb-item]")
            .eq(0)
            .shadow()
            .find("[ui5-checkbox]")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find(".ui5-responsive-popover-close-btn")
            .realClick();

        cy.get("@selectionChangeSpy")
            .should("not.have.been.called");
    });
});

describe("Validation", () => {
    beforeEach(() => {
        cy.ui5SimulateDevice("phone");
    });

    it("Should set the error state to error if input not corresponding to item", () => {
        cy.mount(
            <MultiComboBox value="com">
                <MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
                <MultiComboBoxItem text="Compact"></MultiComboBoxItem>
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("respPopover");

        cy.get("@respPopover")
            .find("[ui5-input]")
            .realClick()
            .realType("m");

        cy.get("@respPopover")
            .find(".ui5-valuestatemessage-header")
            .should("be.visible");

        cy.get("@respPopover")
            .find("[ui5-input]")
            .and("have.attr", "value-state", "Negative");
    });
});

describe("Accessibility", () => {
    beforeEach(() => {
        cy.ui5SimulateDevice("phone");
    });

    it("Show selected toggle button should has accessibleName attribute", () => {
        cy.mount(
            <MultiComboBox>
                <MultiComboBoxItem text="Cosy" selected></MultiComboBoxItem>
                <MultiComboBoxItem text="Compact"></MultiComboBoxItem>
            </MultiComboBox>
        );

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("input")
            .realClick();

        cy.get("[ui5-multi-combobox]")
            .shadow()
            .find("[ui5-responsive-popover]")
            .find("[ui5-toggle-button]")
            .should("have.attr", "accessible-name", SHOW_SELECTED_BUTTON.defaultText);

    });
});