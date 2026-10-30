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

	it("closeTooltip hides the popover and isOpen reflects state", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<Tooltip id="tt" opener="opener" text="Hello world"></Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			const tt = $el[0] as Tooltip;
			expect(tt.isOpen()).to.equal(false);
			tt.openTooltip();
			expect(tt.isOpen()).to.equal(true);
		});

		cy.get("#tt").shadow().find("[ui5-popover]").should("have.attr", "open");

		cy.get("#tt").then($el => {
			const tt = $el[0] as Tooltip;
			tt.closeTooltip();
			expect(tt.isOpen()).to.equal(false);
		});

		cy.get("#tt").shadow().find("[ui5-popover]").should("not.have.attr", "open");
	});

	it("renders a role=tooltip anchor with the default id, overridable via ariaAnchorId", () => {
		cy.mount(<Tooltip id="tt" text="Anchor text"></Tooltip>);

		cy.get("#tt")
			.shadow()
			.find("[role='tooltip']")
			.should("contain.text", "Anchor text")
			.and($anchor => {
				expect($anchor.attr("id")).to.match(/-aria$/);
			});

		cy.mount(<Tooltip id="tt2" text="Anchor text" ariaAnchorId="my-anchor"></Tooltip>);

		cy.get("#tt2")
			.shadow()
			.find("[role='tooltip']")
			.should("have.attr", "id", "my-anchor");
	});

	it("renders no aria anchor when there is no text", () => {
		cy.mount(<Tooltip id="tt" opener="opener"></Tooltip>);

		cy.get("#tt").shadow().find("[role='tooltip']").should("not.exist");
	});

	it("forwards placement to the popover", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<Tooltip id="tt" opener="opener" text="Info" placement="Bottom"></Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			($el[0] as Tooltip).openTooltip();
		});

		cy.get("#tt")
			.shadow()
			.find("[ui5-popover]")
			.should("have.attr", "placement", "Bottom");
	});

	it("opens on hover after delay and closes on mouseleave", () => {
		cy.mount(
			<>
				<Button id="opener">Hover me</Button>
				<Tooltip id="tt" opener="opener" text="Hover info" delay={0}></Tooltip>
			</>
		);

		cy.get("#opener").realHover();
		cy.get("#tt").should($el => {
			expect(($el[0] as Tooltip).isOpen()).to.equal(true);
		});

		cy.get("body").realHover({ position: "topLeft" });
		cy.get("#tt").should($el => {
			expect(($el[0] as Tooltip).isOpen()).to.equal(false);
		});
	});

	it("opens on keyboard focus and closes on Escape", () => {
		cy.mount(
			<>
				<Button id="opener">Focus me</Button>
				<Tooltip id="tt" opener="opener" text="Focus info" delay={0}></Tooltip>
			</>
		);

		cy.get("#opener").should("exist");
		cy.realPress("Tab");
		cy.get("#opener").should("have.focus");
		cy.get("#tt").should($el => {
			expect(($el[0] as Tooltip).isOpen()).to.equal(true);
		});

		cy.get("#opener").realPress("Escape");
		cy.get("#tt").should($el => {
			expect(($el[0] as Tooltip).isOpen()).to.equal(false);
		});
	});

	it("Escape during the open delay cancels the pending open", () => {
		cy.mount(
			<>
				<Button id="opener">Focus me</Button>
				<Tooltip id="tt" opener="opener" text="Focus info" delay={400}></Tooltip>
			</>
		);

		cy.get("#opener").should("exist");
		cy.realPress("Tab");
		cy.get("#opener").should("have.focus");

		// Press Escape before the open delay elapses.
		cy.get("#opener").realPress("Escape");

		// Wait past the original delay and confirm it never opened.
		cy.wait(600);
		cy.get("#tt").should($el => {
			expect(($el[0] as Tooltip).isOpen()).to.equal(false);
		});
	});
});
