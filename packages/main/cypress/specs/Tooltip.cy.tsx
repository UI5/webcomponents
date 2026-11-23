import Tooltip from "../../src/Tooltip.js";

describe("Tooltip", () => {
	it("slots its text content into the popover when opened", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt">Open</button>
				<Tooltip id="tt">Hello world</Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			($el[0] as Tooltip).openTooltip();
		});

		cy.get("#tt").shadow().find(".ui5-tooltip-text").should("contain.text", "Hello world");
		cy.get("#tt").shadow().find("[ui5-popover]").should("have.attr", "open");
	});

	it("closeTooltip hides the popover and isOpen reflects state", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt">Open</button>
				<Tooltip id="tt">Hello world</Tooltip>
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

	it("sets role=tooltip on its host so aria-describedby targets a valid node", () => {
		cy.mount(<Tooltip id="tt">Some text</Tooltip>);

		cy.get("#tt").should("have.attr", "role", "tooltip");
	});

	it("keeps its text in the accessible tree while closed (not display:none)", () => {
		cy.mount(<Tooltip id="tt">Described text</Tooltip>);

		cy.get("#tt").should("have.text", "Described text");
		cy.get("#tt").then($el => {
			expect(getComputedStyle($el[0]).display).to.not.equal("none");
		});
	});

	it("stays closed when there is no text content", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt">Open</button>
				<Tooltip id="tt"></Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			($el[0] as Tooltip).openTooltip();
			expect(($el[0] as Tooltip).isOpen()).to.equal(false);
		});

		cy.get("#tt").shadow().find("[ui5-popover]").should("not.have.attr", "open");
	});

	it("opens on hover over the opener after the delay", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt" style="margin:3rem">Hover me</button>
				<Tooltip id="tt" delay={0}>Hovered text</Tooltip>
			</>
		);

		cy.get("[data-ui5-has-tooltip='tt']").trigger("mouseover");
		cy.get("#tt").shadow().find("[ui5-popover]").should("have.attr", "open");
	});

	it("closes on Escape", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt">Opener</button>
				<Tooltip id="tt" delay={0}>Escape text</Tooltip>
			</>
		);

		cy.get("#tt").then($el => ($el[0] as Tooltip).openTooltip());
		cy.get("#tt").shadow().find("[ui5-popover]").should("have.attr", "open");

		cy.get("body").trigger("keydown", { key: "Escape" });
		cy.get("#tt").shadow().find("[ui5-popover]").should("not.have.attr", "open");
	});

	it("opens only for the element that references it by data-ui5-has-tooltip", () => {
		cy.mount(
			<>
				<button id="btn" data-ui5-has-tooltip="tt" aria-describedby="tt">Opener</button>
				<button id="other">Not an opener</button>
				<Tooltip id="tt" delay={0}>Docked text</Tooltip>
			</>
		);

		// Hovering the referencing opener opens the tooltip.
		cy.get("#btn").trigger("mouseover");
		cy.get("#tt").shadow().find("[ui5-popover]").should("have.attr", "open");

		cy.get("#btn").trigger("mouseout");
		cy.get("#tt").shadow().find("[ui5-popover]").should("not.have.attr", "open");

		// Hovering an unrelated element does not open it.
		cy.get("#other").trigger("mouseover");
		cy.get("#tt").shadow().find("[ui5-popover]").should("not.have.attr", "open");
	});
});
