import Button from "../../src/Button.js";
import Icon from "../../src/Icon.js";
import MessageStrip from "../../src/MessageStrip.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import {
	MESSAGE_STRIP_CLOSE_BUTTON_INFORMATION,
	MESSAGE_STRIP_CLOSE_BUTTON_CUSTOM,
	MESSAGE_STRIP_INFORMATION,
	MESSAGE_STRIP_CLOSABLE,
	MESSAGE_STRIP_CUSTOM,
} from "../../src/generated/i18n/i18n-defaults.js";

import palette from "@ui5/webcomponents-icons/dist/palette.js";

type MSDesignInfo = {
	design: "ColorSet1" | "Information" | "Positive" | "Negative" | "Critical" | "ColorSet2" | undefined;
	btnText: string;
}

describe("API", () => {
	it("tests close event", () => {
		cy.mount(<MessageStrip>MessageStrip</MessageStrip>);

		cy.get("[ui5-message-strip]").then($strip => {
			$strip.get(0).addEventListener("close", cy.stub().as("close"));
		});

		cy.get("[ui5-message-strip]")
			.shadow()
			.find(".ui5-message-strip-close-button")
			.as("closeButton");

		cy.get("@closeButton")
			.realClick();

		cy.get("@closeButton")
			.realPress("Space");

		cy.get("@closeButton")
			.realPress("Enter");

		cy.get("@close").should("have.callCount", 3);
	});

	it("Message strip is rendered without icon when design changes from default to a specific color set and scheme", () => {
		cy.mount(<MessageStrip >MessageStrip w/ default properties</MessageStrip>);

		cy.get("[ui5-message-strip]")
			.invoke("prop", "design", "ColorSet1")
			.invoke("prop", "colorScheme", "1");

		cy.get("[ui5-message-strip]")
			.shadow()
			.find("ui5-icon")
			.should("not.exist");
	});

	it("should display the correct tooltip text for different designs", () => {
		const designs: Array<MSDesignInfo> = [
		  {
				design: "Information",
				btnText: MESSAGE_STRIP_CLOSE_BUTTON_INFORMATION.defaultText,
		  },
		  {
				design: "ColorSet1",
				btnText: MESSAGE_STRIP_CLOSE_BUTTON_CUSTOM.defaultText,
		  },
		];

		designs.forEach(({ design, btnText }) => {
			cy.mount(<MessageStrip class="top" design={design}>{design} design with icon and close button:</MessageStrip>);

			cy.get("[ui5-message-strip]")
				.shadow()
				.find("ui5-button")
				.shadow()
				.find("button")
				.should("have.attr", "title", btnText);

			cy.get("[ui5-message-strip]")
				.shadow()
				.find("ui5-button")
				.shadow()
				.find("button")
				.should("have.attr", "aria-label", btnText);
		});
	});

	it("should not close the popover when close button is clicked", () => {
		cy.mount(
			<>
				<Button id="btnopen">Open ResponsivePopover</Button>
				<ResponsivePopover
					opener="btnopen"
					headerText="Newsletter subscription"
					id="resppopover"
				>
					<div class="popover-content">
						<MessageStrip design="Information">Information Message</MessageStrip>
					</div>

					<div slot="footer" class="popover-footer">
						<Button id="closePopoverButton" design="Emphasized">Subscribe</Button>
					</div>
				</ResponsivePopover>
			</>
		);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@button")
			.then($btn => {
				$btn[0].addEventListener("click", () => {
					cy.get("@popover").then($popover => {
						$popover[0].setAttribute("open", "");
					});
				});
			});

		cy.get("@popover")
			.then($popover => {
				$popover[0].addEventListener("close", () => {
					$popover[0].removeAttribute("open");
				});
			});

		cy.get("@button")
			.realClick();

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("ui5-message-strip")
			.shadow()
			.find("ui5-button")
			.as("buttonMS");

		cy.get("@buttonMS")
			.realClick();

		cy.get("@popover")
			.should("have.attr", "open");
	});
});

describe("Accessibility", () => {
	it("Test hidden text element content", () => {
		cy.mount(
			<>
				<MessageStrip id="messageStrip">Hello World!</MessageStrip>
				<MessageStrip id="colorSet1ColorScheme1" design="ColorSet1" colorScheme="1" class="top">
					<Icon name={palette} slot="icon"></Icon>Color Set 1 - color-scheme 1
				</MessageStrip>
			</>
		);

		cy.get("#messageStrip")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", `${MESSAGE_STRIP_INFORMATION.defaultText} ${MESSAGE_STRIP_CLOSABLE.defaultText}`);

		cy.get("#colorSet1ColorScheme1")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", `${MESSAGE_STRIP_CUSTOM.defaultText} ${MESSAGE_STRIP_CLOSABLE.defaultText}`);
	});
});
