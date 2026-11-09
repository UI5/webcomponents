import Button from "../../src/Button.js";
import Tooltip from "../../src/Tooltip.js";

// End-to-end tests for the magic `data-ui5-tooltip` attribute handled by
// TooltipSupport. Assertions use only public API and observable DOM/ARIA.
describe("data-ui5-tooltip support", () => {
	const tag = () => Tooltip.getMetadata().getTag();

	// Make opening deterministic. The shared tooltip is created lazily on first
	// interaction, so hover once to create it, then drop its delay to 0 so the
	// test's next interaction opens without waiting on the timer.
	const primeZeroDelay = (selector: string) => {
		cy.get(selector).realHover();
		cy.get(tag()).then($t => {
			($t[0] as unknown as Tooltip).delay = 0;
		});
	};

	it("creates exactly one shared tooltip using the scoped tag", () => {
		cy.mount(<><Button data-ui5-tooltip="One">One</Button><Button data-ui5-tooltip="Two">Two</Button></>);

		cy.get("[ui5-button]").eq(0).realHover();
		cy.get("[ui5-button]").eq(1).realHover();

		cy.get(`body > ${tag()}`).should("have.length", 1);
	});

	it("opens on hover and closes when the pointer leaves", () => {
		cy.mount(
			<>
				<Button data-ui5-tooltip="Save">S</Button>
				<div id="away" style="width:60px;height:60px">x</div>
			</>,
		);

		primeZeroDelay("[ui5-button]");
		cy.get("[ui5-button]").realHover();
		cy.get(tag()).should($t => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(true));

		cy.get("#away").realHover();
		cy.get(tag()).should($t => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
	});

	it("closes on Escape", () => {
		cy.mount(<Button data-ui5-tooltip="Save">S</Button>);

		primeZeroDelay("[ui5-button]");
		cy.get("[ui5-button]").realHover();
		cy.get(tag()).should($t => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(true));

		cy.get("[ui5-button]").realPress("Escape");
		cy.get(tag()).should($t => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
	});

	it("docks text and align per target without leaking state", () => {
		cy.mount(
			<>
				<Button data-ui5-tooltip="Alpha" data-ui5-tooltip-align="Start">A</Button>
				<Button data-ui5-tooltip="Beta">B</Button>
			</>,
		);

		primeZeroDelay("[ui5-button]:first");
		cy.get("[ui5-button]").eq(0).realHover();
		cy.get(tag()).should($t => {
			const tip = $t[0] as unknown as Tooltip;
			expect(tip.text).to.equal("Alpha");
			expect(tip.horizontalAlign).to.equal("Start");
		});

		cy.get("[ui5-button]").eq(1).realHover();
		cy.get(tag()).should($t => {
			const tip = $t[0] as unknown as Tooltip;
			expect(tip.text).to.equal("Beta");
			expect(tip.horizontalAlign).to.equal("Center");
		});
	});

	it("binds gestures only once for the shared instance (activation closes and stays closed)", () => {
		cy.mount(<Button data-ui5-tooltip="Save">S</Button>);

		primeZeroDelay("[ui5-button]");
		cy.get("[ui5-button]").realHover();
		cy.get(tag()).should($t => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(true));

		// Activation closes exactly once. A second self-bound gesture machine would
		// let the trailing focus re-open it, leaving it open; assert it stays closed.
		cy.get("[ui5-button]").realClick();
		cy.get(tag()).should($t => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
		cy.wait(100);
		cy.get(tag()).should($t => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
	});

	it("releases gestures and closes when the active target is removed", () => {
		cy.mount(<Button id="rm" data-ui5-tooltip="Save">S</Button>);

		primeZeroDelay("#rm");
		cy.get("#rm").realHover();
		cy.get(tag()).should($t => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(true));

		cy.get("#rm").then($b => $b[0].remove());
		cy.get(tag()).should($t => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
	});

	it("reacts to a dynamically added data-ui5-tooltip", () => {
		cy.mount(
			<>
				<Button id="dyn">S</Button>
				<div id="away" style="width:60px;height:60px">x</div>
			</>,
		);

		// No attribute yet: hovering must not create/open a tooltip.
		cy.get("#dyn").realHover();
		cy.get("body").then($b => {
			const tip = $b[0].querySelector(tag()) as unknown as Tooltip | null;
			expect(!tip || !tip.isOpen()).to.equal(true);
		});

		// Add the attribute dynamically; now hovering opens the shared tooltip.
		cy.get("#away").realHover();
		cy.get("#dyn").then($b => $b[0].setAttribute("data-ui5-tooltip", "Now"));
		primeZeroDelay("#dyn");
		cy.get("#dyn").realHover();
		cy.get(tag()).should($t => {
			const tip = $t[0] as unknown as Tooltip;
			expect(tip.isOpen()).to.equal(true);
			expect(tip.text).to.equal("Now");
		});
	});
});
