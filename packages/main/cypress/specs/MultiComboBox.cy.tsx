import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import MultiComboBoxItemGroup from "../../src/MultiComboBoxItemGroup.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import Button from "../../src/Button.js";
import Link from "../../src/Link.js";
import Input from "../../src/Input.js";
import { MULTIINPUT_SHOW_MORE_TOKENS, TOKENIZER_ARIA_CONTAIN_ONE_TOKEN, TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS, TOKENIZER_ARIA_CONTAIN_TOKEN, TOKENIZER_SHOW_ALL_ITEMS, VALUE_STATE_ERROR, VALUE_STATE_TYPE_ERROR, VALUE_STATE_TYPE_SUCCESS, VALUE_STATE_TYPE_WARNING, VALUE_STATE_WARNING } from "../../src/generated/i18n/i18n-defaults.js";

describe("Security", () => {
	it("Tests setting malicious text to items", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="<script>alert('XSS')</script>"></MultiComboBoxItem>
				<MultiComboBoxItem text="<b onmouseover=alert('XSS')></b>"></MultiComboBoxItem>
				<MultiComboBoxItem text="Albania<button onClick='alert(1)'>alert</button>"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-mcb-item]")
			.eq(0)
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");

		cy.get("[ui5-mcb-item]")
			.eq(1)
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");

		cy.get("[ui5-mcb-item]")
			.eq(2)
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});

describe("General", () => {
	it("Focus State", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realPress("ArrowLeft");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-token]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.should("not.have.attr", "focused");

		cy.get("@mcb")
			.realPress("ArrowRight");

		cy.get("[ui5-multi-combobox]")
			.should("have.attr", "focused");
	});

	it("Open all items popover on nmore click", () => {
		cy.mount(
			<MultiComboBox style="width: 100px">
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("moreButton");

		cy.get("@moreButton")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();
	});

	it("Tokenizer collapse/expand behavior", () => {
		cy.mount(
			<><MultiComboBox noValidation={true} style="width: 100px">
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox><Button id="dummyButton"></Button></>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.should("be.focused");

		cy.get("@mcb")
			.realPress("Space");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.should("have.attr", "expanded");

		cy.get("#dummyButton")
			.as("button")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@tokenizer")
			.should("not.have.attr", "expanded");
	});

	it("Tokenizer expanded/collapsed state should not be triggered when the suggestions are opened from a selected token", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected={true} text="Ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer");

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.eq(2)
			.as("firstToken")
			.realClick();

		cy.get("@firstToken")
			.should("be.focused");

		cy.get("@firstToken")
			.realPress("F4");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@tokenizer")
			.should("have.attr", "expanded");
	});

	it("Tests if tokenizer is collapsed after focusout of the Popover", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected={true} text="Ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.should("be.focused");

		cy.get("@mcb")
			.realPress("Tab");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.should("not.have.attr", "expanded");
	});

	it("Placeholder setting", () => {
		cy.mount(
			<MultiComboBox placeholder="Placeholder">
				<MultiComboBoxItem selected={true} text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.attr", "placeholder", "");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.invoke('on', 'ui5-token-delete', cy.spy().as('tokenDelete'));

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.should("not.exist");

		cy.get("@input")
			.should("have.attr", "placeholder", "Placeholder");
	});

	it("Should be able to delete long tokens", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="This is a token with ridicilously long long long text which should be deletable when the 'x' icon is clicked"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()
			.should("be.focused");

		cy.realType("t{enter}");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.invoke('on', 'ui5-token-delete', cy.spy().as('tokenDelete'));

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.should("exist")
			.and("have.length", 1);

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");
	});

	it("Should delete token when clicking on token decline icon - regression test for long token deletion fix", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="This is an extremely long token text that will definitely trigger the problematic code path in the deletion flow and should be properly deletable"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.invoke('on', 'ui5-token-delete', cy.spy().as('tokenDelete'));

		// The first token is the long one and should be hidden in the n-more, so we target the second token
		cy.get("@tokenizer")
			.find("[ui5-token]")
			.eq(1)
			.as("token")
			.should("exist");

		cy.get("@token")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.calledOnce")
			.should("have.been.calledWithMatch", Cypress.sinon.match(event => {
				return event.detail.tokens.length === 1;
			}));

		cy.get("@token")
			.should("not.exist");
	});

	it("Autocomplete (typeahead)", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "Cosy");

		cy.get<HTMLInputElement>("@input")
			.then(input => {
				return input.get(0).selectionEnd - input.get(0).selectionStart;
			})
			.should("be.equal", 3);
	});

	it("No autocomplete (no-typeahead)", () => {
		cy.mount(
			<MultiComboBox noTypeahead={true}>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "C");

		cy.get<HTMLInputElement>("@input")
			.then(input => {
				return input.get(0).selectionEnd - input.get(0).selectionStart;
			})
			.should("be.equal", 0);
	});

	it("Should reset typeahead on item navigation and restore it on focus input", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("I");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "Item 1");

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("@input")
			.should("have.value", "I");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.should("be.focused");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.as("firstItem")
			.realPress("ArrowUp");

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@input")
			.should("have.value", "Item 1");
	});

	it("Text selection on focus", () => {
		cy.mount(
			<>
				<Button id="dummyButton"></Button>
				<MultiComboBox noValidation={true} value="123">
					<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
					<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
				</MultiComboBox>
			</>
		);

		cy.get("#dummyButton")
			.realClick();

		cy.get("#dummyButton")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realPress("Tab");

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.then(input => {
				return input.get(0).selectionEnd - input.get(0).selectionStart;
			})
			.should("be.equal", 3);
	});

	it("Delete a token and update selection", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.invoke('on', 'ui5-token-delete', cy.spy().as('tokenDelete'));

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.should("not.exist")
	});

	it("Delete a token and update selection - group case", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.invoke('on', 'ui5-token-delete', cy.spy().as('tokenDelete'));

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.should("not.exist")
	});

	it("Select All items", () => {
		cy.mount(
			<MultiComboBox noValidation={true} showSelectAll={true} onSelectionChange={cy.stub().as("selectionChangeEvent")}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find(".ui5-mcb-select-all-checkbox")
			.realClick();

		cy.get("@selectionChangeEvent")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledWithMatch", Cypress.sinon.match(event => {
				return event.detail.items.length === 2;
			}));
	});

	it("Select All functionality + N-more integration", () => {
		cy.mount(
			<><MultiComboBox style="width: 100px" noValidation={true} showSelectAll={true}>
				<MultiComboBoxItem selected={true} text="Very Very Very Very long Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 3"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 5"></MultiComboBoxItem>
			</MultiComboBox><Button>Dummy Button</Button></>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find(".ui5-mcb-select-all-checkbox")
			.should("not.have.attr", "checked");

		// focus the dummy button to close the popover
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("moreButton");

		cy.get("@moreButton")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find(".ui5-mcb-select-all-checkbox")
			.should("have.attr", "checked");
	});

	it("Tokenizer expansion on dynamically added tokens", () => {
		const addTokens = () => {
			const mcb = document.getElementById("mcb");

			["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"].forEach(text => {
				const item = document.createElement("ui5-mcb-item") as MultiComboBoxItem;
				item.text = text;
				item.selected = true;

				mcb.appendChild(item);
			});
		};
		cy.mount(
			<><MultiComboBox id="mcb" style="width:50%"></MultiComboBox><Button id="addButton" onClick={addTokens}></Button></>
		);

		cy.get("#addButton")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverClosed();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("ui5-token:not([overflows])")
			.should("have.length.greaterThan", 0);
	});

	it("Value State Popup should not be opened on readonly input", () => {
		cy.mount(
			<MultiComboBox valueState="Critical" readonly={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("ui5-popover")
			.should("not.have.attr", "open");
	});

	it("Value State Popup should be closed, when suggestions popover is opened", () => {
		cy.mount(
			<MultiComboBox style="width: 100px" valueState="Critical">
				<MultiComboBoxItem selected={true} text="1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realPress("F4");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("ui5-popover")
			.should("not.have.attr", "open");
	});

	it("Should check clear icon availability", () => {
		cy.mount(
			<MultiComboBox showClearIcon={true}>
				<MultiComboBoxItem text="1"></MultiComboBoxItem>
				<MultiComboBoxItem text="12"></MultiComboBoxItem>
				<MultiComboBoxItem text="3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.should("have.prop", "_effectiveShowClearIcon", false);

		cy.realType("1");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.should("have.prop", "_effectiveShowClearIcon", true);
	});

	it("Tests two-column layout", () => {
		cy.mount(
			<MultiComboBox open={true}>
				<MultiComboBoxItem text="1" additionalText="BG"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(0)
			.shadow()
			.find(".ui5-li-additional-text")
			.should("have.text", "BG");
	});

	it("N-more translation", () => {
		cy.mount(
			<MultiComboBox style="width: 100px">
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.then((mcb) => {
				const el = mcb[0];
				const resourceBundle = (el.constructor as any).i18nBundle;

				cy.get("[ui5-multi-combobox]")
					.as("mcb")
					.shadow()
					.find("[ui5-tokenizer]")
					.shadow()
					.find(".ui5-tokenizer-more-text")
					.should("have.text", resourceBundle.getText(TOKENIZER_SHOW_ALL_ITEMS.defaultText, 2));
			})
	});

	it("N-items translation", () => {
		cy.mount(
			<MultiComboBox style="width: 100%">
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.then((mcb) => {
				const el = mcb[0];
				const resourceBundle = (el.constructor as any).i18nBundle;

				cy.get("[ui5-multi-combobox]")
					.as("mcb")
					.shadow()
					.find("[ui5-tokenizer]")
					.shadow()
					.find(".ui5-tokenizer-more-text")
					.should("have.text", resourceBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS.defaultText, 1));
			})
	});
});

describe("MultiComboBox Truncated Tokens", () => {
	it("Should truncate token when single token is in the multicombobox and open popover on click", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.eq(0)
			.as("token")
			.should("exist")
			.and("have.length", 1);

		cy.get("@token")
			.should("have.prop", "singleToken", true);

		cy.get("@token")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@token")
			.should("have.prop", "singleToken", true);

		cy.get("@token")
			.should("have.prop", "selected", true);

		cy.get("@token")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@token")
			.should("have.prop", "selected", false);

		cy.get("@token")
			.should("have.prop", "focused", true);
	});

	it("Should close truncation popover and deselect selected tokens when clicked outside the component", () => {
		cy.mount(
			<>
				<Button id="dummyButton"></Button>
				<MultiComboBox>
					<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long text"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				</MultiComboBox>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.eq(0)
			.as("token")
			.should("exist")
			.and("have.length", 1);

		cy.get("@token")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@token")
			.should("have.prop", "selected", true);

		cy.get("#dummyButton")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@token")
			.should("have.prop", "selected", false);
	});

	it("Should close truncation popover and deselect selected tokens when clicked in input field", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.eq(0)
			.as("token")
			.should("exist")
			.and("have.length", 1);

		cy.get("@token")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@token")
			.should("have.prop", "selected", true);

		cy.get("@mcb")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@token")
			.should("have.prop", "selected", false);
	});
});

describe("Selection and filtering", () => {
	it("Select and deselect first item", () => {
		cy.mount(
			<MultiComboBox onSelectionChange={cy.stub().as("selectionChangeEvent")}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.as("firstItem")
			.should("not.have.attr", "selected");

		cy.get("@firstItem")
			.shadow()
			.find("[ui5-checkbox]")
			.as("checkbox")
			.realClick();

		cy.get("@firstItem")
			.should("have.attr", "selected");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledWithMatch", Cypress.sinon.match(event => {
				return event.detail.items[0].text === "Item 1";
			}));

		cy.get("@checkbox")
			.realClick();

		cy.get("@firstItem")
			.should("not.have.attr", "selected");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledTwice");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledWithMatch", Cypress.sinon.match(event => {
				return event.detail.items.length === 0;
			}));
	});

	it("Focus restore after item click", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.should("have.attr", "focused");
	});

	it("Opens all items popover when start typing and filters items", () => {
		cy.mount(
			<MultiComboBox noTypeahead={true}>
				<MultiComboBoxItem text="1"></MultiComboBoxItem>
				<MultiComboBoxItem text="12"></MultiComboBoxItem>
				<MultiComboBoxItem text="3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("12");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 1);

		cy.get("@mcb")
			.realPress("Backspace");

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 2);
	});

	it("When item is clicked, the popover should be closed and the value in the input should be removed", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.should("have.value", "Cosy");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.as("firstItem")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.should("have.value", "");

		cy.get("@mcb")
			.should("have.attr", "focused");
	});

	it("When item's checkbox is clicked, the popover should not be closed and the value in the input should be kept", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "Cosy");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.shadow()
			.find("[ui5-checkbox]")
			.as("checkbox")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.should("have.value", "C");
	});

	it("Clicking n more prefilters items before opening the popover", () => {
		cy.mount(
			<MultiComboBox noValidation={true} showSelectAll={true} style="width: 100px">
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("moreButton");

		cy.get("@moreButton")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 2);

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 3);
	});

	it("Filtering of items when nmore popover is open and user types in the input field", () => {
		cy.mount(
			<MultiComboBox style="width: 100px">
				<MultiComboBoxItem selected={true} text="Ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("moreButton");

		cy.get("@moreButton")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 3);

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("I");

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 2);

		cy.get("@popover")
			.find("[ui5-list] slot")
			.eq(1)
			.should("not.have.attr", "selected");
	});

	it("Should make a selection on ENTER", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "Cosy");

		cy.get("@mcb")
			.realPress("Enter")

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@input")
			.should("have.value", "");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("exist")
			.and("have.length", 1);
	});
});

describe("Validation & Value State", () => {
	const handleInput = (e: Event) => {
		(e.target as MultiComboBox).valueState = (e.target as MultiComboBox).value.length ? "Negative" : "Information";
	}

	it("Should be able to change value states upon typing", () => {
		cy.mount(
			<MultiComboBox noValidation={true} onInput={handleInput}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		// add event listener
		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()
			.should("be.focused");

		cy.realType("f");

		cy.get("@mcb")
			.shadow()
			.find(".ui5-valuestatemessage--error")

		cy.realPress("Backspace");

		cy.get("@mcb")
			.shadow()
			.find(".ui5-valuestatemessage--information")

		cy.realPress("f");

		cy.get("@mcb")
			.shadow()
			.find(".ui5-valuestatemessage--information")
			.should("not.exist");
	});

	it("Built in validation by typing a non existing option", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="112"></MultiComboBoxItem>
				<MultiComboBoxItem text="12"></MultiComboBoxItem>
				<MultiComboBoxItem text="3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("1");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "112");

		cy.realType("4");

		cy.get("@input")
			.should("have.value", "14");

		cy.get("@mcb")
			.should("have.attr", "value-state", "Negative");
	});

	it("Invalid input persists - no automatic clearing", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("InvalidText");

		cy.get("@mcb")
			.should("have.attr", "value-state", "Negative");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "InvalidText");

		// Wait to test that the value state persists after some time
		cy.wait(2500)

		cy.get("@input")
			.should("have.value", "InvalidText");

		cy.get("@mcb")
			.should("have.attr", "value-state", "Negative");
	});

	it("Value state resets when valid entry is entered after invalid input", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		// Type invalid text
		cy.realType("xyz");

		cy.get("@mcb")
			.should("have.attr", "value-state", "Negative");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "xyz");

		// Clear and type valid text
		cy.get("@input")
			.clear();

		cy.realType("Item");

		cy.get("@mcb")
			.should("have.attr", "value-state", "None");

		cy.get("@input")
			.should("have.value", "Item 1");
	});

	it("Value state resets when input is cleared after invalid entry", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		// Type invalid text
		cy.realType("InvalidValue");

		cy.get("@mcb")
			.should("have.attr", "value-state", "Negative");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "InvalidValue");

		// Clear the input
		cy.get("@input")
			.clear();

		cy.get("@mcb")
			.should("have.attr", "value-state", "None");

		cy.get("@input")
			.should("have.value", "");
	});

	it("Value state preserved when switching between valid and invalid", () => {
		cy.mount(
			<MultiComboBox valueState="Critical">
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.should("have.attr", "value-state", "Critical");

		// Type invalid text
		cy.realType("xyz");

		cy.get("@mcb")
			.should("have.attr", "value-state", "Negative");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input");

		// Clear and verify original state is restored
		cy.get("@input")
			.clear();

		cy.get("@mcb")
			.should("have.attr", "value-state", "Critical");
	});

	it("Tests if item is created when enter is pressed while validation is ongoing", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realType("CC{enter}");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("not.exist")
	});

	it("Should remove value state header when value state is reset", () => {
		const onSelectionChange = (e: Event) => {
			(e.target as MultiComboBox).valueState = "None";
		}

		cy.mount(
			<MultiComboBox noValidation={true} valueState="Critical" open={true} onSelectionChange={onSelectionChange}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick()
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.should("not.be.focused");

		cy.realPress("Space");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find(".ui5-valuestatemessage--warning")
			.should("not.exist");
	});
});

describe("Keyboard interaction when pressing Ctrl + Alt + F8 for navigation", () => {
	beforeEach(() => {
		cy.mount(<>
			<MultiComboBox valueState="Negative">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">Link</Link>  <Link href="#">Second Link</Link>.
				</div>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
			<Input id="nextInput" class="input2auto" placeholder="Next input"></Input>
		</>);
	});

	it("Should move the focus from the MultiComboBox to the first link in the value state message", () => {
		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("[ui5-multi-combobox]")
			.as("multi-combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("popover")
			.should("have.class", "ui5-valuestatemessage-popover");

		cy.get("@popover")
			.should("have.attr", "open")

		cy.get("[ui5-link]")
			.eq(0)
			.should("have.focus");
	});

	it("When pressing [Tab], the focus moves to the next value state message link. Pressing [Tab] again closes the popup and moves the focus to the next input", () => {
		cy.get("[ui5-multi-combobox]")
			.as("multi-combobox");

		cy.get("@multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("[ui5-link]")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("[ui5-link]")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress("Tab");

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.should("have.focus");
	});

	it("Pressing [Shift + Tab] moves the focus from the second link in the value state message to the first one. Pressing it again shifts the focus to the MultiComboBox", () => {
		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("[ui5-multi-combobox]")
			.as("multi-combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("[ui5-link]")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("[ui5-link]")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@innerInput")
			.should("have.focus");

	});

	it.skip("When list item is selected and pressing [Ctrl + Alt + F8], first link is focused. [Arrow Down] moves focus to the first list item", () => {
		cy.get("[ui5-multi-combobox]")
			.as("multi-combobox");

		cy.get("@multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		// open the popover
		cy.get("@multi-combobox")
			.realClick()
			.should("be.focused");

		// focuses the fisrt list item
		cy.realPress("F4");

		cy.get("@multi-combobox")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-mcb-item]").eq(0).as("firstItem");

		cy.get("@firstItem").should("be.focused");

		// Focus moves from the first item to the link in the value state header
		cy.get("@firstItem").realPress(["Control", "Alt", "F8"]);

		cy.get("[ui5-link]")
			.eq(0)
			.as("firstLink");

		cy.focused().should("have.class", "ui5-link-root");

		// Focus moves from the link to the first list item
		cy.get("@firstLink").realPress("ArrowDown");

		cy.get("@firstItem").should("be.focused");
	});
});

describe("Event firing", () => {
	it("tests if open and close events are fired correctly", () => {
		const onFocusIn = (e: Event) => {
			(e.target as MultiComboBox).setAttribute("open", "true");
		}

		cy.mount(
			<MultiComboBox onOpen={cy.stub().as("mcbOpened")} onClose={cy.stub().as("mcbClosed")} onFocusIn={onFocusIn}>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened()

		cy.get("@mcbOpened")
			.should("have.been.calledOnce");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-icon]")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened()

		cy.get("@mcbClosed")
			.should("have.been.calledOnce");

		cy.get("@mcbOpened")
			.should("have.been.calledTwice");
	});

	it("Should prevent selection-change when clicking an item", () => {
		const onSelectionChange = (e: Event) => {
			e.preventDefault();
		}

		cy.mount(
			<MultiComboBox onSelectionChange={onSelectionChange}>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem selected={true} text="Bulgaria" />
				<MultiComboBoxItem text="England" />
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);
	});

	it("Should prevent selection-change when deleting a token", () => {
		const onSelectionChange = (e: Event) => {
			e.preventDefault();
		}

		cy.mount(
			<MultiComboBox onSelectionChange={onSelectionChange}>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.invoke('on', 'ui5-token-delete', cy.spy().as('tokenDelete'));

		cy.get("@mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.as("tokens")
			.should("have.length", 1);

		cy.get("@tokens")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");

		cy.get("@tokens")
			.should("have.length", 1);
	});

	it("Should prevent selection-change on CTRL+A", () => {
		const onSelectionChange = (e: Event) => {
			e.preventDefault();
		}

		cy.mount(
			<MultiComboBox onSelectionChange={onSelectionChange}>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.should("not.be.focused");


		cy.realPress(["Meta", "a"]);

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);
	});

	it("Should fire events on clear icon click", () => {
		cy.mount(
			<MultiComboBox noTypeahead={true} showClearIcon={true} onInput={cy.stub().as("inputEvent")} onChange={cy.stub().as("changeEvent")}>
				<MultiComboBoxItem text="1"></MultiComboBoxItem>
				<MultiComboBoxItem text="12"></MultiComboBoxItem>
				<MultiComboBoxItem text="3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realType("1");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input").should("have.value", "1");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find(".ui5-input-clear-icon-wrapper")
			.realClick();

		cy.get("@input").should("have.value", "");

		cy.get("@inputEvent")
			.should("have.been.calledTwice");

		cy.get("@changeEvent")
			.should("not.have.been.called");
	});

	it("Should not fire submit, when an item is tokenized", () => {
		const onSubmit = cy.spy((e: Event) => e.preventDefault()).as("submitEvent");

		cy.mount(
			<>
				<form id="form" onSubmit={onSubmit}>
					<MultiComboBox>
						<MultiComboBoxItem text="1"></MultiComboBoxItem>
						<MultiComboBoxItem text="12"></MultiComboBoxItem>
						<MultiComboBoxItem text="3"></MultiComboBoxItem>
					</MultiComboBox>
				</form>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()
			.should("be.focused");

		cy.realType("1");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.realPress("Enter");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@submitEvent")
			.should("not.have.been.called");

		cy.get("@mcb")
			.realPress("Enter");

		cy.get("@submitEvent")
			.should("have.been.called");
	});
});

describe("MultiComboBox RTL/LTR Arrow Navigation", () => {
	it("should focus last token on arrow right in RTL mode when input is at start", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 5"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();
		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.then(($input) => {
				($input[0] as HTMLInputElement).setSelectionRange(0, 0);
			})
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
			});

		cy.get("@mcb").realPress("ArrowRight");
		cy.focused().should("have.class", "ui5-token--wrapper");
	});

	it("should focus last token on arrow left in LTR mode when input is at start", () => {
		cy.mount(
			<div dir="ltr">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 5"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.should("have.focus")
			.then(($input) => {
				($input[0] as HTMLInputElement).setSelectionRange(0, 0);
			})
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
			});

		cy.get("@mcb").realPress("ArrowLeft");
		cy.focused().should("have.class", "ui5-token--wrapper");
	});

	it("should not focus token when cursor is not at start of input in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true} value="test text">
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb").should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.should("be.focused")
			.then(($input) => {
				($input[0] as HTMLInputElement).setSelectionRange(2, 2);
			});

		cy.get("@mcb").realPress("ArrowRight");
		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it("should navigate from last token back to input with arrow left in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()

		cy.get("@mcb")
			.should("be.focused")
			.realPress("ArrowRight");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.as("lastToken");

		cy.focused().should("have.class", "ui5-token--wrapper");

		cy.get("@lastToken").realPress("ArrowLeft");

		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it("should navigate from last token back to input with arrow right in LTR mode", () => {
		cy.mount(
			<div dir="ltr">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused")
			.realPress("ArrowLeft");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.realPress("ArrowRight");

		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it("should handle empty input case in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb").should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.should("have.focus")

		cy.get("@input")
			.should("have.value", "")
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
			});

		cy.get("@mcb").realPress("ArrowRight");;
		cy.focused().should("have.class", "ui5-token--wrapper");
	});
});

describe("Accessibility", () => {
	it("should announce the associated label when MultiComboBox is focused", () => {
		const label = "MultiComboBox aria-label";

		cy.mount(
			<>
				<label for="mcb">{label}</label>
				<MultiComboBox id="mcb"></MultiComboBox>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", label);
	});

	it("aria-describedby value according to the tokens count and value state", () => {
		cy.mount(
			<MultiComboBox valueState="Critical" style="width: 100%">
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		const tokensCountITextId = `ui5-multi-combobox-hiddenText-nMore`;
		const valuestateITextId = `ui5-multi-combobox-valueStateDesc`;

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 3);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.as("input")
			.should("have.attr", "aria-describedby", `${tokensCountITextId} ${valuestateITextId}`);
	});

	it("aria-describedby value according to the tokens count", () => {
		cy.mount(
			<MultiComboBox style="width: 100%">
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 2);

		cy.get("[ui5-multi-combobox]")
			.then((mcb) => {
				const el = mcb[0];
				const resourceBundle = (el.constructor as any).i18nBundle;

				cy.get("[ui5-multi-combobox]")
					.shadow()
					.find(".ui5-hidden-text")
					.should("have.text", resourceBundle.getText(TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS.defaultText, 2));
			})

		cy.get("[ui5-multi-combobox]")
			.realPress("ArrowLeft");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", TOKENIZER_ARIA_CONTAIN_ONE_TOKEN.defaultText);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("not.exist");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", TOKENIZER_ARIA_CONTAIN_TOKEN.defaultText);
	});

	it("Should apply aria-label from the accessibleName property", () => {
		const labelText = "Label";
		cy.mount(
			<MultiComboBox accessibleName={labelText} style="width: 100%">
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", labelText);
	});

	it("Should apply aria-label from the accessibleNameRef property", () => {
		const label = "MultiComboBox aria-label";
		cy.mount(
			<>
				<label id="mcb-label">{label}</label>
				<MultiComboBox accessibleNameRef="mcb-label"></MultiComboBox>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", label);
	});

	it("Should apply aria-controls and aria-haspopup", () => {
		cy.mount(<MultiComboBox></MultiComboBox>);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-controls");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("Value state type should be added to the screen readers default value states announcement", () => {
		cy.mount(
			<>
				<MultiComboBox id="positive-mcb" valueState="Positive"></MultiComboBox>
				<MultiComboBox id="warning-mcb" valueState="Critical"></MultiComboBox>
				<MultiComboBox id="error-mcb" valueState="Negative"></MultiComboBox>
			</>
		);

		cy.get("#positive-mcb")
			.shadow()
			.find("#ui5-multi-combobox-valueStateDesc")
			.should("have.text", VALUE_STATE_TYPE_SUCCESS.defaultText);

		cy.get("#warning-mcb")
			.shadow()
			.find("#ui5-multi-combobox-valueStateDesc")
			.should("have.text", `${VALUE_STATE_TYPE_WARNING.defaultText} ${VALUE_STATE_WARNING.defaultText}`);

		cy.get("#warning-mcb").realClick();

		cy.get("#warning-mcb")
			.shadow()
			.find("[ui5-popover] div")
			.should("have.text", VALUE_STATE_WARNING.defaultText);

		cy.get("#error-mcb")
			.shadow()
			.find("#ui5-multi-combobox-valueStateDesc")
			.should("have.text", `${VALUE_STATE_TYPE_ERROR.defaultText} ${VALUE_STATE_ERROR.defaultText}`);

		cy.get("#error-mcb").realClick();

		cy.get("#error-mcb")
			.shadow()
			.find("[ui5-popover] div")
			.should("have.text", VALUE_STATE_ERROR.defaultText);
	});

	it("checkbox should be presentational", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("ui5-multi-combobox")
			.as("multiComboBox");

		cy.get("@multiComboBox")
			.shadow()
			.find("ui5-icon")
			.as("icon");

		cy.get("@icon")
			.click();

		cy.get("ui5-mcb-item")
			.eq(0)
			.shadow()
			.find("ui5-checkbox")
			.as("checkbox");

		cy.get("@checkbox")
			.shadow()
			.find("input[type='checkbox']")
			.should("not.exist");

		cy.get("@checkbox")
			.shadow()
			.find(".ui5-checkbox-root")
			.should("have.attr", "role", "presentation");

		cy.get("@checkbox")
			.shadow()
			.find(".ui5-checkbox-root")
			.should("not.have.attr", "tabindex");
	});
});

describe("Grouping", () => {
	it("Tests group filtering", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem text="12"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 2">
					<MultiComboBoxItem text="2"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 3">
					<MultiComboBoxItem text="11"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()
			.should("be.focused");

		cy.realType("1");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "12");

		cy.get("@mcb")
			.get("[ui5-mcb-item]")
			.then(items => {
				const itemArray = Array.from(items);
				expect(itemArray.filter(item => (item as MultiComboBoxItem)._isVisible).length).to.equal(2);
			}
			);

		cy.get("@mcb")
			.get("[ui5-mcb-item-group]")
			.then(items => {
				const itemArray = Array.from(items);
				expect(itemArray.filter(item => (item as MultiComboBoxItem).assignedSlot).length).to.equal(2);
			}
			);
	});

	it("Tests group item focusability", () => {
		cy.mount(
			<MultiComboBox noValidation={true} open={true}>
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem text="12"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 2">
					<MultiComboBoxItem text="2"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 3">
					<MultiComboBoxItem text="11"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()
			.should("be.focused");

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("@mcb")
			.get("[ui5-mcb-item-group]")
			.should("be.focused");
	});

	it("Tests item focusability when grouping with F4 pressed", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem text="12"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 2">
					<MultiComboBoxItem text="2"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 3">
					<MultiComboBoxItem text="11"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item-group]")
			.should("not.be.focused");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(0)
			.should("be.focused");
	});

	it("Tests group item on Enter press", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem text="12"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 2">
					<MultiComboBoxItem text="2"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 3">
					<MultiComboBoxItem text="11"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item-group]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item-group]")
			.realPress("Enter");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item-group]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "");
	});

	it("Tests group item on Space and Arrow Up press", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem text="12"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 2">
					<MultiComboBoxItem text="2"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 3">
					<MultiComboBoxItem text="11"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("@mcb")
			.find("[ui5-mcb-item-group]")
			.should("be.focused");

		cy.get("@mcb")
			.find("[ui5-mcb-item-group]")
			.realPress("Space");

		cy.get("@mcb")
			.find("[ui5-mcb-item-group]")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "");

		cy.get("@mcb")
			.find("[ui5-mcb-item-group]")
			.realPress("ArrowUp");

		cy.get("@mcb")
			.find("[ui5-mcb-item-group]")
			.should("not.be.focused");

		cy.get("@mcb")
			.should("be.focused");
	});

	it("Selection of group header", () => {
		cy.mount(
			<MultiComboBox noValidation={true} onSelectionChange={cy.stub().as("selectionChangeEvent")} value="Group 1">
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem text="12"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 2">
					<MultiComboBoxItem text="2"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Group 3">
					<MultiComboBoxItem text="11"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realPress("Enter")

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "Group 1");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("not.exist")

		cy.get("@selectionChangeEvent")
			.should("not.have.been.called");
	});
});

describe("Keyboard Handling", () => {
	it("Tests Backspace when combobox has an empty value and tokens", () => {
		cy.mount(
			<MultiComboBox style="width: 100%">
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 2);

		cy.get("[ui5-multi-combobox]")
			.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);
	});

	it("Value should be reset on ESC key", () => {
		cy.mount(
			<MultiComboBox style="width: 100%">
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.realPress("I");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.realPress("Escape");

		cy.get("[ui5-multi-combobox]")
			.realPress("Escape");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "");
	});

	it("Value should not be reset on when focus goes out of the control, returns and ESC is pressed", () => {
		cy.mount(
			<>
				<Button id="btn"></Button>
				<MultiComboBox style="width: 100%" noTypeahead={true}>
					<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				</MultiComboBox>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("I");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("#btn")
			.realClick()
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.realPress("Escape");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "I");
	});

	it("Selects an item when enter is pressed and value matches a text of an item in the list", () => {
		cy.mount(
			<>
				<Button id="btn"></Button>
				<MultiComboBox style="width: 100%" noTypeahead={true}>
					<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				</MultiComboBox>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realType("Item 1");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.realPress("Enter");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "");
	});

	it("Focuses the item group, then select all item checkbox on arrow up", () => {
		cy.mount(
			<MultiComboBox noValidation={true} showSelectAll={true}>
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.should("not.be.focused");

		cy.realPress("ArrowUp");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item-group]")
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("@popover")
			.find(".ui5-mcb-select-all-checkbox")
			.should("be.focused");
	});

	it("Focuses the item group, then select all item checkbox on arrow up", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 2");

		cy.realPress("ArrowUp");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");
	});

	it("Should only navigate through not already selected items with arrow keys when the picker is closed", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2" selected={true}></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 3");
	});

	it("Should reset current inline navigation state on user input", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 2");

		cy.realType("a");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "a");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");
	});

	it("Arrow up when no item is selected should go to the last item", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 4");
	});

	it("Should focus input after all tokens are deleted", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.realClick();

		cy.realPress(["Shift", "ArrowLeft"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.first()
			.should("be.focused");

		cy.realPress("Delete");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("not.exist");

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");
	});

	it("HOME should move caret to start of the input if focus is in input", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realType("123{home}");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.then(input => {
				return input.get(0).selectionStart;
			})
			.should("be.equal", 0);
	});

	it("HOME should move focus to the first token, if focus is in the tokenizer", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.realClick()
			.should("be.focused");

		cy.realPress("Home");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.first()
			.should("be.focused");
	});

	it("END should focus last token, second END should move focus to the input", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.first()
			.realClick()
			.should("be.focused");

		cy.realPress("End");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.realPress("End");

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");
	});

	it("CTRL + HOME focus the first item, CTRL + END should focus last item", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");

		cy.realPress(["Meta", "End"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.last()
			.should("be.focused");

		cy.realPress(["Meta", "Home"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");
	});

	it("Should close the picker and focus the next element on TAB", () => {
		cy.mount(
			<>
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				</MultiComboBox>
				<input id="dummy-input"></input>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");

		cy.realPress("Tab");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("#dummy-input")
			.should("be.focused");
	});

	it("Should select/unselect next/previous item on shift+arrow", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");

		cy.realPress("Space");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("have.attr", "selected");

		cy.realPress(["Shift", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(1)
			.should("have.attr", "selected");

		cy.realPress("ArrowDown");

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(2)
			.should("be.focused");

		cy.realPress(["Shift", "ArrowUp"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(1)
			.should("not.have.attr", "selected");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);
	});

	it("Should move focus to the previous token with arrow left", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.realClick()
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.first()
			.should("be.focused");
	});

	it("Should navigate through the items with CTRL + arrow up/down keys when the picker is closed", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Meta", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");

		cy.realPress(["Meta", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 2");

		cy.realPress(["Meta", "ArrowUp"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "Item 1");
	});

	it("Focuses the first item on CTRL + arrow down then the input on CTRL + arrow up", () => {
		cy.mount(
			<>
				<MultiComboBox noValidation={true} open={true}>
					<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				</MultiComboBox>
				<input id="dummy-input"></input>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.realPress(["Meta", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");

		cy.realPress(["Meta", "ArrowUp"]);

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");
	});

	it("Should select all filtered items on CTRL+A", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.should("not.be.focused");

		cy.realPress(["Meta", "a"]);

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 3);
	});

	it("Should select/deselect a token with CTRL+SPACE", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.first()
			.as("firstToken")
			.realClick()
			.should("be.focused");

		cy.get("@firstToken")
			.should("have.attr", "selected");

		cy.realPress(["Meta", "Space"]);

		cy.get("@firstToken")
			.should("not.have.attr", "selected");

		cy.realPress(["Meta", "Space"]);

		cy.get("@firstToken")
			.should("have.attr", "selected");
	});

	it("SHIFT+SPACE should do nothing when pressed in the input field", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Shift", "Space"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.value", "");
	});

	it("F4 should focus the selected item or the first one if there is no selected", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress("F4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.last()
			.should("be.focused");

		cy.realPress("Enter");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.realPress("F4");

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");
	});

	it("Alt + Down should focus the corresponding item to the token from which the combination is pressed", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.realClick()
			.should("be.focused");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.last()
			.should("be.focused");
	});

	it("Alt + Down should focus the first item if no selected items are present", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");
	});

	it("Alt + Down should reset filtering", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="1"></MultiComboBoxItem>
				<MultiComboBoxItem text="2"></MultiComboBoxItem>
				<MultiComboBoxItem text="3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realType("4");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverClosed();

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.should("be.focused");
	});

	it("Alt + Down should focus the item corresponding to the text value", () => {
		cy.mount(
			<MultiComboBox noValidation={true} value="12">
				<MultiComboBoxItem text="1"></MultiComboBoxItem>
				<MultiComboBoxItem text="12"></MultiComboBoxItem>
				<MultiComboBoxItem text="123"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.eq(1)
			.should("be.focused");
	});

	it("Backspace deletes token and forwards the focus to the last token without collapsing the tokenizer", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.realClick()
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 2);
	});

	it("Backspace should not delete tokens, when MCB is readonly", () => {
		cy.mount(
			<MultiComboBox noValidation={true} readonly={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.first()
			.realClick();

		cy.realPress("Backspace");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 3);
	});

	it("Should open/close popover on keyboard combination ctrl + i", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long long long long long long long long long long long long long text"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Meta", "I"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.realPress(["Meta", "I"]);

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();
	});

	it("Shouldn't open popover on keyboard combination ctrl + i when there are no tokens", () => {
		cy.mount(
			<MultiComboBox noValidation={true}></MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.should("be.focused");

		cy.realPress(["Meta", "I"]);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.should("not.have.attr", "open")
	});

	describe("Copy/Cut/Paste keyboard shortcuts", () => {
		const dispatchPasteEvent = () => {
			cy.get("@input").then($input => {
				const input = $input.get(0) as HTMLInputElement;

				const pasteEvent = new ClipboardEvent("paste", {
					bubbles: true,
					cancelable: true,
				});

				input.dispatchEvent(pasteEvent);
			});
		};

		it("copy a token with CTRL+C", () => {
			cy.mount(<>
				<MultiComboBox style={{ width: "500px" }} noValidation={true}>
					<MultiComboBoxItem selected text="11111" />
					<MultiComboBoxItem text="Compact" />
					<MultiComboBoxItem selected text="Condensed" />
					<MultiComboBoxItem selected text="Longest word in the world" />
				</MultiComboBox>
			</>)

			cy.window().then(win => {
				cy.spy(win.navigator.clipboard, 'writeText').as('writeTextSpy');
			});

			cy.get("[ui5-multi-combobox]").as("mcb");
			cy.get("@mcb").shadow().find(".ui5-multi-combobox-token").as("tokens");

			cy.get("@tokens").eq(0).realClick();
			cy.get("@tokens").eq(0).should("be.focused");

			cy.realPress(["Control", "c"]);

			cy.get("@writeTextSpy").should("have.been.calledOnceWith", "11111");
		});

		it("paste a token with CTRL+V", () => {
			cy.mount(<>
				<MultiComboBox style={{ width: "500px" }} noValidation={true}>
					<MultiComboBoxItem text="22222" />
					<MultiComboBoxItem text="Compact" />
					<MultiComboBoxItem text="Condensed" />
					<MultiComboBoxItem text="Longest word in the world" />
					<MultiComboBoxItem text="Longest word in the world 1" />
					<MultiComboBoxItem text="Longest word in the world 2" />
				</MultiComboBox>
			</>)

			cy.window().then(win => {
				cy.stub(win.navigator.clipboard, "readText")
					.as("clipboardRead")
					.returns("22222");
			});

			cy.get("[ui5-multi-combobox]").as("mcb2");
			cy.get("@mcb2").shadow().find("input").as("input");

			cy.get("@input").realClick();
			cy.get("@input").should("be.focused");

			dispatchPasteEvent();

			cy.get("@clipboardRead").should("have.been.calledOnce");

			cy.get("@input").should("have.value", "22222");
			cy.get("@mcb2").should("have.prop", "open", true);

			dispatchPasteEvent();

			cy.get("@clipboardRead").should("have.been.calledTwice");

			cy.get("@input").should("have.value", "2222222222");
		});

		it("not be able to paste token with CTRL+V in read only", async () => {
			cy.mount(<>
				<MultiComboBox style={{ width: "500px" }} noValidation={true} readonly={true} />
			</>)

			cy.get("[ui5-multi-combobox]").as("mcb2");
			cy.get("@mcb2").shadow().find("input").as("input");
			cy.get("@mcb2").shadow().find(".ui5-multi-combobox-token").as("tokens");

			cy.get("@input").realClick();
			cy.get("@input").should("be.focused");

			dispatchPasteEvent();

			cy.get("@clipboardRead").should("have.been.calledOnce");

			cy.get("@input").should("have.value", "");
			cy.get("@tokenes").should("not.exist");
		});

		it("should cut a token with CTRL+X", () => {
			cy.mount(<>
				<MultiComboBox style={{ width: "500px" }} noValidation={true}>
					<MultiComboBoxItem selected text="33333" />
					<MultiComboBoxItem text="Compact" />
					<MultiComboBoxItem selected text="Condensed" />
					<MultiComboBoxItem selected text="Longest word in the world" />
				</MultiComboBox>
			</>)

			cy.window().then(win => {
				cy.spy(win.navigator.clipboard, 'writeText').as('writeTextSpy');
			});

			cy.get("[ui5-multi-combobox]").as("mcb");
			cy.get("@mcb").shadow().find(".ui5-multi-combobox-token").as("tokens");

			cy.get("@tokens").should("have.length", 3);

			cy.get("@tokens").eq(0).realClick();
			cy.get("@tokens").eq(0).should("be.focused");

			cy.realPress(["Control", "x"]);

			cy.get("@writeTextSpy").should("have.been.calledOnceWith", "33333");
			cy.get("@tokens").should("have.length", 2);
		});

		it("cut a token with SHIFT+DELETE", () => {
			cy.mount(<>
				<MultiComboBox style={{ width: "500px" }} noValidation={true}>
					<MultiComboBoxItem selected text="44444" />
					<MultiComboBoxItem text="Compact" />
					<MultiComboBoxItem selected text="Condensed" />
					<MultiComboBoxItem selected text="Longest word in the world" />
				</MultiComboBox>
			</>)

			cy.window().then(win => {
				cy.spy(win.navigator.clipboard, 'writeText').as('writeTextSpy');
			});

			cy.get("[ui5-multi-combobox]").as("mcb");
			cy.get("@mcb").shadow().find(".ui5-multi-combobox-token").as("tokens");

			cy.get("@tokens").eq(0).realClick();
			cy.get("@tokens").eq(0).should("be.focused");

			cy.realPress(["Shift", "Delete"]);

			cy.get("@writeTextSpy").should("have.been.calledOnceWith", "44444");
		});

		it("copy a token with CTRL+INSERT ", () => {
			cy.mount(<>
				<MultiComboBox style={{ width: "500px" }} noValidation={true}>
					<MultiComboBoxItem selected text="55555" />
					<MultiComboBoxItem text="Compact" />
					<MultiComboBoxItem selected text="Condensed" />
					<MultiComboBoxItem selected text="Longest word in the world" />
				</MultiComboBox>
			</>)

			cy.window().then(win => {
				cy.spy(win.navigator.clipboard, 'writeText').as('writeTextSpy');
			});

			cy.get("[ui5-multi-combobox]").as("mcb");
			cy.get("@mcb").shadow().find(".ui5-multi-combobox-token").as("tokens");

			cy.get("@tokens").eq(0).realClick();
			cy.get("@tokens").eq(0).should("be.focused");

			cy.realPress(["Control", "Insert"]);

			cy.get("@writeTextSpy").should("have.been.calledOnceWith", "55555");
		});

		it("paste a token with SHIFT+INSERT", () => {
			cy.mount(<>
				<MultiComboBox style={{ width: "500px" }} noValidation={true}>
					<MultiComboBoxItem text="Cosy" />
					<MultiComboBoxItem text="66666" />
					<MultiComboBoxItem text="Condensed" />
					<MultiComboBoxItem text="Longest word in the world" />
					<MultiComboBoxItem text="Longest word in the world 1" />
					<MultiComboBoxItem text="Longest word in the world 2" />
				</MultiComboBox>
			</>)

			cy.window().then(win => {
				cy.stub(win.navigator.clipboard, "readText")
					.as("clipboardRead")
					.returns("66666");
			});

			cy.get("[ui5-multi-combobox]").as("mcb2");
			cy.get("@mcb2").shadow().find("input").as("input");

			cy.get("@input").realClick();
			cy.get("@input").should("be.focused");

			cy.realPress(["Shift", "Insert"]);

			cy.get("@clipboardRead").should("have.been.called");

			cy.get("@input").should("have.value", "66666");
			cy.get("@mcb2").should("have.prop", "open", true);
		});
	});
});

describe("MultiComboBox Composition", () => {
	const mountMultiComboBox = (children: any, id: string, placeholder: string = "") => {
		cy.mount(
			<MultiComboBox id={id} placeholder={placeholder}>
				{children}
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").as("mcb").realClick();
		cy.get("@mcb").shadow().find("input").as("input").focus();
	};

	const simulateCompositionStages = (stages: string[], final: string) => {
		cy.get("@input").trigger("compositionstart", { data: "" });
		stages.forEach(stage => {
			cy.get("@input")
				.invoke("val", stage)
				.trigger("input", { inputType: "insertCompositionText" })
				.trigger("compositionupdate", { data: stage });

			cy.get("@mcb").should("have.prop", "_isComposing", true);
			cy.get("@input").should("have.value", stage);
			cy.get("@mcb").should("have.attr", "value", stage);
			cy.get("@mcb").should("have.attr", "value-state", "None");
		});
		cy.get("@input")
			.trigger("compositionend", { data: final })
			.invoke("val", final)
			.trigger("input", { inputType: "insertCompositionText" });
		cy.get("@mcb").should("have.prop", "_isComposing", false);
	};

	it("IME Korean matching suggestion", () => {
		mountMultiComboBox([
			<MultiComboBoxItem key="1" text="사랑" />,
			<MultiComboBoxItem key="2" text="사랑해요" />,
			<MultiComboBoxItem key="3" text="한국" />,
		], "mcb-korean", "Type in Korean ...");

		simulateCompositionStages(["ㅅ", "사", "사랑"], "사랑");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb").realPress("Enter");
		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer] [ui5-token]")
			.should("have.length", 1);
		cy.get("@mcb").should("have.attr", "value", "");
	});

	it("IME Korean non-matching – error state after commit", () => {
		mountMultiComboBox([
			<MultiComboBoxItem key="1" text="사랑" />,
			<MultiComboBoxItem key="2" text="한국" />,
		], "mcb-ko-non", "Type in Korean ...");

		simulateCompositionStages(["ㄲ", "ㄲㅏ"], "까");

		cy.get("@mcb").should("have.attr", "value-state", "Negative");
		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer] [ui5-token]")
			.should("have.length", 0);
	});

	it("IME Japanese matching – multi-stage selection", () => {
		mountMultiComboBox([
			<MultiComboBoxItem key="1" text="ありがとう" />,
			<MultiComboBoxItem key="2" text="こんにちは" />,
			<MultiComboBoxItem key="3" text="東京" />,
		], "mcb-ja", "Type in Japanese ...");

		simulateCompositionStages(["あ", "あり", "ありが", "ありがとう"], "ありがとう");
		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();
		cy.get("@mcb").realPress("Enter");
		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer] [ui5-token]")
			.should("have.length", 1);
	});

	it("IME Japanese non-matching – error state after commit", () => {
		mountMultiComboBox([
			<MultiComboBoxItem key="1" text="ありがとう" />,
			<MultiComboBoxItem key="2" text="こんにちは" />,
		], "mcb-ja-non", "Type in Japanese ...");

		simulateCompositionStages(["ず", "ずx"], "ずx");
		cy.get("@mcb").should("have.attr", "value-state", "Negative");
		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer] [ui5-token]")
			.should("have.length", 0);
	});

	it("IME Chinese matching – preserves pinyin stages & selects", () => {
		mountMultiComboBox([
			<MultiComboBoxItem key="1" text="你好" />,
			<MultiComboBoxItem key="2" text="谢谢" />,
			<MultiComboBoxItem key="3" text="谢谢你" />,
			<MultiComboBoxItem key="4" text="北京" />,
		], "mcb-zh", "Type in Chinese ...");

		simulateCompositionStages(["x", "xi", "xie", "xiex", "xiexie"], "谢谢");
		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();
		cy.get("@mcb").realPress("Enter");
		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer] [ui5-token]")
			.should("have.length", 1);
		cy.get("@mcb").should("have.attr", "value", "");
	});

	it("IME Chinese non-matching – error state after commit", () => {
		mountMultiComboBox([
			<MultiComboBoxItem key="1" text="你好" />,
			<MultiComboBoxItem key="2" text="谢谢" />,
		], "mcb-zh-non", "Type in Chinese ...");

		simulateCompositionStages(["p", "pi", "pin"], "品味");
		cy.get("@mcb").should("have.attr", "value-state", "Negative");
		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer] [ui5-token]")
			.should("have.length", 0);
	});
});
