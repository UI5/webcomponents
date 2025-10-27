import "../../../src/features/InputSuggestions.js";
import Dialog from "../../../src/Dialog.js";
import Input from "../../../src/Input.js";
import SuggestionItem from "../../../src/SuggestionItem.js";
import MessageStrip from "../../../src/MessageStrip.js";
import Panel from "../../../src/Panel.js";
import Label from "../../../src/Label.js";
import Select from "../../../src/Select.js";
import Option from "../../../src/Option.js";
import Button from "../../../src/Button.js";
import MenuItem from "../../../src/MenuItem.js";
import Menu from "../../../src/Menu.js";
import MultiComboBox from "../../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../../src/MultiComboBoxItem.js";
import CheckBox from "../../../src/CheckBox.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import type ResponsivePopover from "../../../src/ResponsivePopover.js";

describe("Event bubbling", () => {
	before(() => {
		cy.wrap({ setAnimationMode })
			.invoke("setAnimationMode", AnimationMode.None);
	})

	it("test bubbling events", () => {
		cy.mount(
			<div id="app">
				<Dialog id="myDialog" headerText="Dialog">
					<Input id="myInput" showSuggestions={true}>
						<SuggestionItem text="Cozy"></SuggestionItem>
						<SuggestionItem text="Compact"></SuggestionItem>
						<SuggestionItem text="Condensed"></SuggestionItem>
					</Input>

					<MessageStrip id="myMsgStrip">(Information) with default icon and close button:</MessageStrip>

					<Panel id="panel" headerText="Panel">
						<Label>
							Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
							nostrum, vel ea sint dicant postea.
						</Label>
					</Panel>
				</Dialog>
			</div>
		);

		cy.get("#app")
			.as("app");
		cy.get("[ui5-dialog]")
			.as("dialog");
		cy.get("[ui5-panel]")
			.as("panel");
		cy.get("[ui5-message-strip]")
			.as("messageStrip");
		cy.get("[ui5-input]")
			.as("input");

		cy.get("@app")
			.then(app => {
				app.get(0).addEventListener("ui5-close", cy.stub().as("appClosed"));
				app.get(0).addEventListener("ui5-toggle", cy.stub().as("appToggled"));
			});

		cy.get("@dialog")
			.then(dialog => {
				dialog.get(0).addEventListener("ui5-close", cy.stub().as("dialogClosed"));
			});

		cy.get("@input")
			.then(input => {
				input.get(0).addEventListener("ui5-close", cy.stub().as("inpClosed"));
			});

		cy.get("@messageStrip")
			.then(messageStrip => {
				messageStrip.get(0).addEventListener("ui5-close", cy.stub().as("msgClosed"));
			});

		cy.get("@panel")
			.then(panel => {
				panel.get(0).addEventListener("ui5-toggle", cy.stub().as("panelToggled"));
			});

		cy.get("@dialog").invoke("attr", "open", true);

		cy.get<Dialog>("@dialog")
			.ui5DialogOpened()

		cy.wait(200);

		// act - toggle Input suggestions
		cy.get("@input")
			.realClick();

		cy.get("@input")
			.should("be.focused");

		cy.realType("a");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(1)
			.realClick();

		cy.get("@inpClosed")
			.should("have.been.calledOnce");

		// act - close MessageStrip
		cy.get("@messageStrip")
			.shadow()
			.find(".ui5-message-strip-close-button")
			.realClick();

		// assert
		// - the close event of the Dialog is not triggered because MessageStrip and Input do not bubble
		cy.get("@inpClosed")
			.should("have.been.calledOnce");
		cy.get("@msgClosed")
			.should("have.been.calledOnce");
		cy.get("@dialogClosed")
			.should("have.been.not.called");
		cy.get("@appClosed")
			.should("have.been.not.called");

		// act - toggle Panel
		cy.get("@panel")
			.shadow()
			.find(".ui5-panel-header")
			.realClick();

		// assert - the toggle event of the Panel bubbles: Panel -> App
		cy.get("@panelToggled")
			.should("have.been.calledOnce");
		cy.get("@appToggled")
			.should("have.been.calledOnce");
	});

	it("test non-bubbling events", () => {
		cy.mount(
			<div id="app">
				<Dialog id="myDialog" headerText="Dialog" >
					<Select id="mySelect">
						<Option>Hello</Option>
						<Option>World</Option>
						<Option>Hello</Option>
					</Select>

					<Button id="btnOpen">Open Menu</Button>
					<Menu id="myMenu" headerText="Menu" opener="btnOpen">
						<MenuItem text="New File"></MenuItem>
						<MenuItem text="New Folder"></MenuItem>
					</Menu>

					<MultiComboBox id="myMCB">
						<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
						<MultiComboBoxItem selected text="Compact"></MultiComboBoxItem>
					</MultiComboBox>
				</Dialog>
			</div>
		);

		cy.get("#app")
			.as("app");

		cy.get("[ui5-dialog]")
			.as("dialog");

		cy.get("[ui5-select]")
			.as("select");

		cy.get("[ui5-menu]")
			.as("menu");

		cy.get("[ui5-multi-combobox]")
			.as("multiCombobox");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find(".inputIcon")
			.as("multiComboboxIcon");

		cy.get("@app")
			.then(app => {
				app.get(0).addEventListener("ui5-close", cy.stub().as("appClosed"));
			});

		cy.get("@dialog")
			.then(dialog => {
				dialog.get(0).addEventListener("ui5-close", cy.stub().as("dialogClosed"));
			});

		cy.get("@dialog")
			.then(dialog => {
				dialog.get(0).addEventListener("ui5-open", cy.stub().as("dialogOpened"));
			});

		cy.get("@select")
			.then(select => {
				select.get(0).addEventListener("ui5-close", cy.stub().as("selClosed"));
			});

		cy.get("@menu")
			.then(menu => {
				menu.get(0).addEventListener("ui5-close", cy.stub().as("menuClosed"));
			});

		cy.get("@multiCombobox")
			.then(multiCombobox => {
				multiCombobox.get(0).addEventListener("ui5-close", cy.stub().as("mcbClosed"));
			});

		cy.get("@multiCombobox")
			.then(multiCombobox => {
				multiCombobox.get(0).addEventListener("ui5-open", cy.stub().as("mcbOpened"));
			});

		cy.get("@dialog").invoke("attr", "open", true);

		// act - open and close Select
		cy.get("@select")
			.realClick();

		cy.get("@select")
			.find("[ui5-option]")
			.eq(1)
			.realClick();

		// act - open/close the  MultiComboBox
		cy.get("@multiComboboxIcon")
			.realClick();

		cy.get("@multiCombobox")
			.find("[ui5-mcb-item]")
			.should("be.visible");

		// assert - the open event of the MultiComboBox do not bubble
		cy.get("@mcbOpened").should("have.been.calledOnce");
		cy.get("@dialogOpened").should("have.been.calledOnce");

		cy.get("@multiComboboxIcon")
			.realClick();

		// act - open/close Menu
		cy.get("@menu")
			.ui5MenuOpen();

		cy.get("[ui5-menu-item]")
			.first()
			.ui5MenuItemClick();

		// assert - the close events of the Select and MultiComboBox do not bubble
		cy.get("@selClosed")
			.should("have.been.calledOnce");
		cy.get("@mcbClosed")
			.should("have.been.calledOnce");
		cy.get("@menuClosed")
			.should("have.been.calledOnce");
		cy.get("@dialogClosed")
			.should("not.be.called");
		cy.get("@appClosed")
			.should("not.be.called");
	});

	it("test cancelable events", () => {
		cy.mount(
			<div id="app">
				<CheckBox id="cb"></CheckBox>
				<CheckBox id="cb2"></CheckBox>
			</div>
		);

		cy.get("#cb")
			.as("checkbox");
		cy.get("#cb2")
			.as("checkbox2");

		cy.get("@checkbox")
			.then(checkbox => {
				checkbox.get(0).addEventListener("ui5-change", e => e.preventDefault());
			});

		// act
		cy.get("@checkbox")
			.realClick();

		cy.get("@checkbox2")
			.realClick();

		// assert
		cy.get("@checkbox")
			.invoke("prop", "checked")
			.should("be.equal", false);
		cy.get("@checkbox2")
			.invoke("prop", "checked")
			.should("be.equal", true);
	});
});
