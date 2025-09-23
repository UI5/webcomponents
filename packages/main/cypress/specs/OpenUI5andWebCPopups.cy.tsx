import OpenUI5Support from "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";
import Button from "../../src/Button.js";
import Dialog from "../../src/Dialog.js";
import Select from "../../src/Select.js";
import Option from "../../src/Option.js";
import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";

function onOpenUI5InitMethod(win) {
	(win as any).sap.ui.require(["sap/ui/core/HTML", "sap/m/Button", "sap/m/Dialog", "sap/m/Popover", "sap/m/Input"], async (HTML, Button, Dialog, Popover, Input) => {

		await OpenUI5Support.init();

		new Button("openUI5Button", {
			text: "Open OpenUI5 Dialog",
			press: function () {
				new Dialog("openUI5Dialog1", {
					title: "OpenUI5 Dialog",
					content: [
						new HTML({
							content:
`<ui5-select id="webCSelect1">
	<ui5-option>Option 1</ui5-option>
	<ui5-option>Option 2</ui5-option>
	<ui5-option>Option 3</ui5-option>
	<ui5-option>Option 4</ui5-option>
	<ui5-option>Option 5</ui5-option>
</ui5-select>
<ui5-combobox id="webCComboBox1">
	<ui5-combobox-item text="Algeria"></ui5-combobox-item>
	<ui5-combobox-item text="Argentina"></ui5-combobox-item>
	<ui5-combobox-item text="Australia"></ui5-combobox-item>
</ui5-combobox>
<br><br>`
						}),
						new Input(),
						new Button({
							text: "Focus stop"
						}),
						new Button("openResPopoverButton", {
							text: "Open WebC Responsive Popover",
							press: function () {
								(document.getElementById("respPopover") as any).open = true;
							}
						}),
						new Button("openResPopoverNoInitialFocusButton", {
							text: "Open WebC RP with NO Initial Focus",
							press: function () {
								(document.getElementById("respPopoverNoInitialFocus") as any).open = true;
							}
						})
					],
					afterClose: function () {
						this.destroy();
					}
				}).open();
			}
		}).placeAt("content");
	});

	document.getElementById("myButton").addEventListener("click", function() {
		(document.getElementById("dialog1") as any).open = true;
	});

	(win as any).sap.ui.require(["sap/m/Select",
			"sap/m/ComboBox",
			"sap/m/Button",
			"sap/ui/core/Item",
			"sap/ui/core/ShortcutHintsMixin"],
		(Select,
		 ComboBox,
		 Button,
		 Item,
		 ShortcutHintsMixin) => {
			new Select("openUI5Select1", {
				items: [
					new Item({ text: "Item 1" }),
					new Item({ text: "Item 2" }),
					new Item({ text: "Item 3" })
				],
				change: function (oEvent) {
					console.error("Selected item:", oEvent.getParameter("selectedItem").getText());
				}
			}).placeAt("dialog1content");

			new ComboBox("openUI5Combobox1", {
				items: [
					new Item({ text: "Item 1" }),
					new Item({ text: "Item 2" }),
					new Item({ text: "Item 3" })
				]
			}).placeAt("dialog1content");

			const button = new Button("openUI5ButtonWithHint", {
				text: "OpenUI5 with Shortcut (Ctrl+S)",
				press: function () {
					openUI5Dialog(win);
				}
			}).placeAt("dialog1content");


			ShortcutHintsMixin.addConfig(button, {
				event: "press",
				position: "0 0",
				addAccessibilityLabel: true,
				message: "Save"
			}, button);
		});

	document.getElementById("dialogButton").addEventListener("click", function () {
		openUI5Dialog(win);
	});

	document.getElementById("popoverButtonNoFocus").addEventListener("click", function (event) {
		openUI5Popover(win, event.target);
	});
}

function openUI5Dialog(win) {
	(win as any).sap.ui.require(["sap/m/Button", "sap/m/Dialog"], (Button, Dialog) => {
		new Dialog("openUI5DialogWithButtons", {
			title: "OpenUI5 Dialog",
			content: [
				new Button({
					text: "Focus stop"
				}),
				new Button("openUI5DialogButton", {
					text: "Open WebC Dialog",
					press: function () {
						(document.getElementById("newDialog1") as any).open = true;
					}
				})
			],
			afterClose: function () {
				this.destroy();
			}
		}).open();
	});
}

function openUI5Popover(win, opener) {
	(win as any).sap.ui.require(["sap/m/Popover", "sap/m/Button"], (Popover, Button) => {
		new Popover("openUI5PopoverSecond", {
			title: "OpenUI5 Popover",
			content: [
				new Button("someButton", {
					text: "Open new OpenUI5 Popover",
					press: function (oEvent) {
						new Popover({
							title: "New OpenUI5 Popover",
							placement: "Bottom",
							content: [
								new Button({
									text: "Focus stop"
								})
							],
							initialFocus: "someButton",
							afterClose: function () {
								this.destroy();
							}
						}).openBy(oEvent.getSource());
					}
				})
			],
			initialFocus: "popoverButtonNoFocus",
			afterClose: function () {
				this.destroy();
			}
		}).openBy(opener);
	});
}

describe("ui5 and web components integration", () => {
	beforeEach(() => {
		// mount the components
		cy.mount(
			<>
				<div id="buttonP">
					<Button id="myButton">Open WebC Dialog</Button>
				</div>
				<Dialog id="dialog1" headerText="This is an WebC Dialog 1">
					<div id="dialog1content"></div>
					<br/>
					Web Components:
					<br/>
					<Select>
						<Option>Option 1</Option>
						<Option>Option 2</Option>
						<Option>Option 3</Option>
						<Option>Option 4</Option>
						<Option>Option 5</Option>
					</Select>
					<ComboBox>
						<ComboBoxItem text="Algeria" />
						<ComboBoxItem text="Argentina" />
						<ComboBoxItem text="Australia" />
					</ComboBox>
					<br/>
					<br/>
					<Button id="dialogButton">Open UI5 dialog</Button>
					<Button id="popoverButtonNoFocus">Open UI5 Popover No Initial Focus</Button>
				</Dialog>
				<Dialog id="newDialog1" headerText="This is an WebC Dialog 2">
					<Button id="someButton">Some button</Button>
				</Dialog>
				<div id="content"></div>
				<ResponsivePopover
					id="respPopover"
					opener="openResPopoverButton"
					headerText="This is an WebC Responsive Popover"
				>
					<Button>Some button</Button>
				</ResponsivePopover>
				<ResponsivePopover
					id="respPopoverNoInitialFocus"
					preventInitialFocus
					opener="openResPopoverNoInitialFocusButton"
					headerText="This is an WebC RP with no initial focus"
				>
					<Button>Some button</Button>
				</ResponsivePopover>
			</>
		);

		// define initialization function before loading ui5
		cy.window().then((win) => {
			(win as any).onOpenUI5Init = function () {
				onOpenUI5InitMethod(win);
			};
		});

		// add ui5 bootstrap
		cy.document().then((doc) => {
			const ui5Script = doc.createElement('script');
			ui5Script.src = 'https://openui5.hana.ondemand.com/resources/sap-ui-core.js';
			ui5Script.id = 'sap-ui-bootstrap';
			ui5Script.setAttribute('data-sap-ui-libs', 'sap.m');
			ui5Script.setAttribute('data-sap-ui-oninit', 'onOpenUI5Init');
			doc.head.appendChild(ui5Script);
		});
	});

	function OpenWebCDialog() {
		cy.get("#openUI5Button")
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	}

	function OpenWebCDialogOpenUI5Select() {
		cy.get("#openUI5Button")
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#openUI5Select1')
			.should('be.visible')
			.realClick();

		cy.get("#__popover0")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#__popover0")
			.should('not.be.visible');

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	}

	function OpenWebCDialogOpenUI5ComboBox() {
		cy.get("#openUI5Button")
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#openUI5Combobox1')
			.should('be.visible')
			.realClick()
			.type("I");

		cy.get("#openUI5Combobox1-popup")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Combobox1-popup")
			.should('not.be.visible');

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.realPress("Escape");

		// combo box value is reset, dialog stays open
		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	}

	function OpenWebCDialogOpenOpenUI5Dialog() {
		cy.get("#openUI5Button")
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#dialogButton')
			.should('be.visible')
			.realClick();

		cy.get("#openUI5DialogWithButtons")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5DialogWithButtons")
			.should('not.be.visible');

		cy.get('#dialogButton')
			.should('be.focused');

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	}

	function OpenWebCDialogOpenOpenUI5PopoverNoFocus() {
		cy.get("#openUI5Button")
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#popoverButtonNoFocus')
			.should('be.visible')
			.realClick();

		cy.get("#openUI5PopoverSecond")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5PopoverSecond")
			.should('not.exist');

		cy.realPress(["Shift", "Tab"]);

		cy.get('#dialogButton')
			.should('be.focused');

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	}

	function OpenWebCDialogOpenUI5ComboBoxNewOpenUI5DialogFromButtonWithHint() {
		cy.get("#openUI5Button")
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#openUI5Combobox1')
			.should('be.visible')
			.realClick()
			.type("I");

		cy.get("#openUI5Combobox1-popup")
			.should('be.visible');

		cy.get('#openUI5ButtonWithHint')
			.should('be.visible')
			.realClick();

		cy.get("#openUI5Combobox1-popup")
			.should('not.be.visible');

		cy.get("#openUI5DialogWithButtons")
			.should("be.visible");

		cy.realPress("Escape");

		cy.get("#openUI5DialogWithButtons")
			.should("not.exist");

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#openUI5ButtonWithHint')
			.should('be.focused')

		cy.get('#openUI5Combobox1')
			.find('input')
			.focus();

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	}

	function OpenUI5Dialog() {
		cy.get("#openUI5Button")
			.should('be.visible')
			.realClick();

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Dialog1")
			.should('not.exist');

		cy.get("#openUI5Button")
			.should('be.focused');
	}

	function OpenUI5DialogWebCDialog() {
		cy.get("#openUI5Button")
			.should('be.visible')
			.realClick();

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.get("#openResPopoverButton")
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#respPopover").ui5DialogOpened();

		cy.realPress("Escape");

		cy.get("#respPopover")
			.should('not.be.visible');

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Dialog1")
			.should('not.exist');

		cy.get("#openUI5Button")
			.should('be.focused');
	}

	function OpenUI5DialogWebCPopoverNoFocus() {
		cy.get("#openUI5Button")
			.should('be.visible')
			.realClick();

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.get("#openResPopoverNoInitialFocusButton")
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#respPopoverNoInitialFocus").ui5DialogOpened();

		cy.realPress("Escape");

		cy.get("#respPopoverNoInitialFocus")
			.should('not.be.visible');

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Dialog1")
			.should('not.be.visible');

		cy.get("#openResPopoverNoInitialFocusButton")
			.should('be.focused');
	}

	it("Keyboard", () => {
		OpenWebCDialog();
		OpenWebCDialogOpenOpenUI5Dialog();
		OpenWebCDialogOpenOpenUI5PopoverNoFocus();
		OpenWebCDialogOpenUI5Select();
		OpenWebCDialogOpenUI5ComboBox();
		OpenWebCDialogOpenUI5ComboBoxNewOpenUI5DialogFromButtonWithHint();

		OpenUI5Dialog();
		OpenUI5DialogWebCDialog();
		OpenUI5DialogWebCPopoverNoFocus();
	});
});