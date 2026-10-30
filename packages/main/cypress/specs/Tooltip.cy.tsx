import Tooltip from "../../src/Tooltip.js";
import Button from "../../src/Button.js";

describe("Tooltip", () => {
	it("renders its text into the popover content", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<Tooltip id="tt" opener="opener" text="Hello world"></Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			($el[0] as Tooltip).openTooltip();
		});

		// The text is slotted into the popover but lives in the tooltip's shadow root.
		cy.get("#tt")
			.shadow()
			.find(".ui5-tooltip-text")
			.should("contain.text", "Hello world");

		cy.get("#tt")
			.shadow()
			.find("[ui5-popover]")
			.should("have.attr", "open");
	});
});
