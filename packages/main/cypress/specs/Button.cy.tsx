import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import Avatar from "../../src/Avatar.js";
import Button from "../../src/Button.js";
import Label from "../../src/Label.js";
import ButtonBadge from "../../src/ButtonBadge.js";
import download from "@ui5/webcomponents-icons/dist/download.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";

import {
	BUTTON_ARIA_TYPE_EMPHASIZED,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("Button general interaction", () => {
	it("tests button's text rendering", () => {
		cy.mount(<Button icon={download} design="Negative">Action Bar Button</Button>);

		cy.get<Button>("[ui5-button]")
			.shadow()
			.find(".ui5-button-text>bdi>slot")
			.should("have.length", 1, "Button text is not rendered");
	});

	it("tests button's icon rendering", () => {
		cy.mount(<Button icon={download} design="Emphasized">Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then($button => {
				$button.attr("icon", "add");
			});

		cy.get("@button")
			.shadow()
			.find(".ui5-button-icon")
			.should("exist", "icon is present");

		cy.get("@button")
			.then($button => {
				$button.attr("icon", "");
			});

		cy.get("@button")
			.shadow()
			.find(".ui5-button-icon")
			.should("not.exist", "icon is not present");
	});

	it("tests button's endIon rendering", () => {
		cy.mount(<Button>Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then($button => {
				$button.attr("end-icon", "add");
			});

		cy.get("@button")
			.shadow()
			.find(".ui5-button-end-icon")
			.should("exist", "endIon is present");

		cy.get("@button")
			.then($button => {
				$button.attr("end-icon", "");
			});

		cy.get("@button")
			.shadow()
			.find(".ui5-button-end-icon")
			.should("not.exist", "endIon is not present");
	});

	it("tests click event", () => {
		cy.mount(<Button icon="home" design="Emphasized">Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("@button")
			.realClick();

		cy.realPress("Space");

		cy.realPress("Enter");

		cy.get("@clicked")
			.should("have.been.calledThrice");
	});

	it("tests keyboard shortcuts used to prevent a click event", () => {
		cy.mount(<Button>Text</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.realClick();

		cy.get("@button")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.realPress(["Space", "Shift"]);
		cy.realPress(["Space", "Escape"]);

		cy.get("@clicked")
			.should("not.been.called");
	});

	it("tests button's icon only rendering", () => {
		cy.mount(<Button icon="home"></Button>);

		cy.get("[ui5-button]")
			.should("have.attr", "icon-only");
	});

	it("tests button's icon only rendering", () => {
		cy.mount(<Button icon="text"> </Button>);

		cy.get("[ui5-button]")
			.should("have.attr", "icon-only");
	});

	it("tests button's slot rendering", () => {
		cy.mount(
			<Button>
				<Avatar id="btnImage" size="XS">
					<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
				</Avatar>
			</Button>
		);
		cy.get("[ui5-button]")
			.should("be.visible", "Btn image is rendered");
	});

	it("tests clicking on disabled button", () => {
		cy.mount(<Button disabled>Inactive</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		// don't test space and enter, as wdio always fires a click but the browser not.
		// await button.keys("Space");
		// await button.keys("Enter");
		cy.get("@button")
			.realClick();

		cy.get("@clicked")
			.should("not.called");

		cy.get("@button")
			.shadow()
			.find("button")
			.as("nativeButton");

		cy.get("@nativeButton")
			.should("have.attr", "disabled");

		cy.get("@nativeButton")
			.should("not.have.attr", "tabindex");
	});

	it("tests clicking on disabled button with Icon", () => {
		cy.mount(<Button icon={employee} disabled></Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("@button")
			.scrollIntoView();

		cy.get("@button")
			.realClick();

		cy.get("@clicked")
			.should("not.called");

		cy.get("@button")
			.shadow()
			.find("[ui5-icon]")
			.should("be.visible")
			.realClick();

		cy.get("@clicked")
			.should("not.called");
	});

	it("tests clicking on button with busy indicator", () => {
		cy.mount(<Button loading></Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("@button")
			.shadow()
			.find("[ui5-busy-indicator]")
			.should("be.visible");

		cy.get("@button")
			.realClick();

		cy.get("@clicked")
			.should("not.called");
	});

	it("tests button with text icon role", () => {
		cy.mount(<Button design="Attention" icon="message-warning">Warning</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.shadow()
			.find("[ui5-icon]")
			.should("have.attr", "mode", "Decorative");
	});

	it("Prevents native behavior when click event is prevented", () => {
		cy.mount(<a href="#navigation">
			<Button onClick={e => e.preventDefault()}>Click me</Button>
		</a>);

		cy.location("hash")
			.should("not.eq", "#navigation");

		cy.get("[ui5-button]")
			.realClick();

		cy.location("hash")
			.should("not.eq", "#navigation");
	});

	it("Allows native behavior when click event is not prevented", () => {
		cy.mount(<a href="#navigation">
			<Button>Click me</Button>
		</a>);

		cy.location("hash")
			.should("not.eq", "#navigation");

		cy.get("[ui5-button]")
			.realClick();

		cy.location("hash")
			.should("eq", "#navigation");
	});

	it("Native event is always fired", () => {
		cy.mount(<div onClick={cy.stub().as("nativeClick")}>
			<Button>Click me</Button>
		</div>);

		cy.wrap({ setNoConflict })
			.invoke("setNoConflict", true)

		cy.get("[ui5-button]")
			.realClick();

		cy.get("@nativeClick")
			.should("have.been.calledOnce")
			.and("be.calledWithMatch", {
				type: "click"
			});

		cy.get('@nativeClick')
			.invoke('resetHistory')

		cy.wrap({ setNoConflict })
			.invoke("setNoConflict", false)

		cy.get("[ui5-button]")
			.realClick();

		cy.get("@nativeClick")
			.should("have.been.calledOnce")
			.and("be.calledWithMatch", {
				type: "click"
			});
	});
});

describe("Accessibility", () => {
	it("setting tooltip on the host is reflected on the button tag", () => {
		cy.mount(<Button icon="message-information" tooltip="Go home"></Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "title", "Go home");
	});

	it("tooltip from inner icon is propagated", () => {
		cy.mount(<Button icon="download" accessibleName="Download application"></Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "title", "Download");
	});

	it("tooltip not displayed when there is a text", () => {
		cy.mount(<Button icon="home">Action</Button>);

		cy.get("[ui5-button]")
			.should("not.have.attr", "title");
	});

	it("aria-label is properly applied on the button tag", () => {
		cy.mount(<Button design="Emphasized">Action</Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-label", "Action");

		cy.get("@button")
			.should("have.attr", "aria-description", Button.i18nBundle.getText(BUTTON_ARIA_TYPE_EMPHASIZED));
	});

	it("aria-label uses accessibleName when both text and accessibleName are provided", () => {
		cy.mount(<Button accessibleName="Custom Action Label">Button Text</Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-label", "Custom Action Label");
	});

	it("aria-expanded is properly applied on the button tag", () => {
		cy.mount(<Button icon="home" design="Emphasized">Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get<Button>("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					expanded: "true",
				};
			});

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-expanded", "true");

		cy.get<Button>("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					expanded: "false",
				};
			});

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-expanded", "false");
	});

	it("setting accessible-role on the host is reflected on the button tag", () => {
		cy.mount(<Button accessibleRole="Link"> Navigation Button </Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "role", "link");
	});

	it("not setting accessible-role on the host keeps the correct role on the button tag", () => {
		cy.mount(<Button icon="home" design="Emphasized">Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "role", "button");
	});

	it("accessibleDescription in combination with design property applied on the button tag", () => {
		cy.mount(<Button design="Negative" accessibleDescription="Decline">Content</Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-description", "Decline Negative Action");
	});


	it("accessibleName when the button has a ui5-button-badge with more than 1 items", () => {
		cy.mount(
			<Button accessibleName="Download">
				<ButtonBadge design="OverlayText" text="999+" slot="badge"></ButtonBadge>
			</Button>
		);
		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-label", `Download 999+ items`);
	});

	it("accessibleName when the button has a ui5-button-badge with 1 item", () => {
		cy.mount(
			<Button design="Emphasized" accessibleName="Download">
				<ButtonBadge text="1" design="InlineText" slot="badge"></ButtonBadge>
			</Button>
		);
		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-label", `Download 1 item`);

		cy.get("@button")
			.should("have.attr", "aria-description", Button.i18nBundle.getText(BUTTON_ARIA_TYPE_EMPHASIZED));
	});

	it("setting accessible-name-ref on the host is reflected on the button tag", () => {
		cy.mount(
			<>
				<Button icon="download" accessibleName="Help me" accessibleNameRef="1download-text"></Button>
				<Label id="1download-text">Download Application</Label>
			</>
		);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-label", "Download Application");
	});

	it("aria-haspopup and aria-controls are properly applied on the button tag", () => {
		cy.mount(<Button>Show Registration Dialog</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get<Button>("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					hasPopup: "dialog",
					controls: "registration-dialog",
				};
			});

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-haspopup", "dialog");

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-controls", "registration-dialog");
	});

	it("aria-label and aria-keyshortcuts are properly applied on the button tag", () => {
		cy.mount(<Button accessibilityAttributes={{ariaKeyShortcuts: "Alt+G", ariaLabel: "Some text"}}>Show Registration Dialog</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get<Button>("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					ariaKeyShortcuts: "Alt+G",
					ariaLabel: "Some text",
				};
			});

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-label", "Some text");

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-keyshortcuts", "Alt+G");
	});

	it("aria-busy is properly applied on the button with busy indicator", () => {
		cy.mount(<Button loading></Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-busy", "true");
	});

	it("setting accessible-description is applied to button tag", () => {
		cy.mount(<Button accessibleDescription="A long description."></Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-description", "A long description.");
	});

	it("button with a badge", () => {
		cy.mount(
			<Button design="Emphasized" icon={employee}>Emphasized
				<ButtonBadge design="OverlayText" text="999+" slot="badge"></ButtonBadge>
			</Button>
		);

		cy.get("[ui5-button]")
			.find("ui5-button-badge")
			.as("badge");

		cy.get("@badge")
			.shadow()
			.find("ui5-tag")
			.as("tag");

		cy.get("@tag")
			.should("have.attr", "design", "Critical");

		cy.get("@tag")
			.should("have.text", "999+");
	});
});