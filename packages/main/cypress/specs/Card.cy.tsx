import Button from "../../src/Button.js";
import Card from "../../src/Card.js";
import CardHeader from "../../src/CardHeader.js";

function CardSample() {
	return <Card id="card">
		<CardHeader
			id="cardHeader"
			slot="header"
			additionalText="4 of 10"
			titleText="Quick Links"
			subtitleText="Quick links sub title"
			interactive={true}>
		</CardHeader>
		<div></div>
	</Card>;
}

function CardSample2() {
	return <Card id="card2">
		<CardHeader
			id="cardHeader2"
			slot="header"
			additionalText="4 of 10"
			titleText="Quick Links"
			subtitleText="Quick Links">
		</CardHeader>
		<div></div>
	</Card>;
}

describe("Card general interaction", () => {
	it("Tests interactive header results in interactive class on the card", () => {
		cy.mount(
			<div>
				<CardSample />
				<CardSample2 />
			</div>
		);

		// assert
		cy.get("#cardHeader")
			.realClick();
		cy.get("#cardHeader").should("be.focused");
		cy.get("#card")
			.shadow()
			.find(".ui5-card-root")
			.should("have.class", "ui5-card--interactive");

		cy.get("#card2")
			.shadow()
			.find(".ui5-card-root")
			.should("not.have.class", "ui5-card--interactive");
	});

	it("Tests header's click event with mouse click, Enter and Space", () => {
		cy.mount(
			<div>
				<CardSample />
				<CardSample2 />
			</div>
		);

		// interactive header
		cy.get("#cardHeader")
			.then($header => {
				$header.get(0).addEventListener("click", cy.stub().as("headerClick"));
			});

		cy.get("#cardHeader")
			.shadow()
			.find(".ui5-card-header")
			.realClick();
		cy.realPress("Space");
		cy.realPress("Enter");

		cy.get("@headerClick")
			.should("have.been.calledThrice");

		// non-interactive header
		cy.get("#cardHeader2")
			.then($header => {
				$header.get(0).addEventListener("click", cy.stub().as("headerClick2"));
			});

		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header")
			.realClick();
		cy.realPress("Space");
		cy.realPress("Enter");

		cy.get("@headerClick2")
			.should("not.have.been.called");
	});

	it("Tests clicking on an action does not fire header's click event", () => {
		cy.mount(
			<Card>
				<CardHeader
					id="cardHeader"
					slot="header"
					titleText="Quick Links"
					interactive={true}
				>
					<Button id="actionBtn" slot="action">Act</Button>
				</CardHeader>

				<div></div>
			</Card>
		);

		cy.get("#actionBtn").then($header => {
			// Buttons have the same button which bubbles
			$header.get(0).addEventListener("ui5-click", (e) => {
				e.stopImmediatePropagation();
				e.stopPropagation();
			});
		});

		cy.get("#cardHeader").then($header => {
			$header.get(0).addEventListener("ui5-click", cy.stub().as("headerClick"));
		});

		cy.get("#actionBtn").realClick();

		// assert
		cy.get("@headerClick").should("not.have.been.called");
	});

	it("Tests loading", () => {
		cy.mount(
			<Card
				id="loadingCard"
				loading={true}
				loadingDelay={500}>
				<CardHeader
					slot="header"
					titleText="Interactive Header">
				</CardHeader>
				<div></div>
			</Card>
		);

		cy.get("#loadingCard")
			.shadow()
			.find("[ui5-busy-indicator]")
			.should("have.attr", "delay", "500")
			.and("have.attr", "active");
	});
});

describe("Card header", () => {
	it("Tests that aria attribute are correct on interactive header", () => {
		cy.mount(
			<Card>
				<CardHeader
					id="cardHeader"
					slot="header"
					titleText="Quick Links"
					interactive={true}
				>
				</CardHeader>
			</Card>
		);

		// assert
		cy.get("#cardHeader")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "role", "button")
			.and("have.attr", "tabindex", "0")
			.and("have.attr", "aria-roledescription", "Interactive Card Header");
	});

	it("Tests that aria attribute are correct on a header", () => {
		cy.mount(
			<Card>
				<CardHeader
					id="cardHeader"
					slot="header"
					titleText="Quick Links"
				>
				</CardHeader>
			</Card>
		);

		// assert
		cy.get("#cardHeader")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "role", "group")
			.and("have.attr", "tabindex", "0")
			.and("have.attr", "aria-roledescription", "Card Header");
	});

	it("Tests additionalText is rendered, when action is set", () => {
		cy.mount(
			<Card>
				<CardHeader
					id="actionCardHeader"
					slot="header"
					titleText="Linked Activities (5)"
					additionalText="4 of 10">
				</CardHeader>

				<div></div>
			</Card>
		);

		// assert
		cy.get("#actionCardHeader")
			.shadow()
			.find(".ui5-card-header-additionalText")
			.should("exist");
	});
});

describe("Card Accessibility", () => {
	it("Tests accessibleName", () => {
		cy.mount(
			<Card id="textCard" accessibleName="Internships">
				<CardHeader
					slot="header"
					titleText="New Internships">
				</CardHeader>
			</Card>
		);

		// assert
		cy.get("#textCard")
			.shadow()
			.find(".ui5-card-root")
			.should("have.attr", "aria-label", "Card Internships");
	});

	it("Tests accessibleNameRef", () => {
		cy.mount(
			<Card id="textCardRef" accessibleName="Internships" accessibleNameRef="cont">
				<CardHeader
					slot="header"
					titleText="New Positions">
				</CardHeader>
				<div id="cont" class="myContent">I am the content</div>
			</Card>
		);

		// assert
		cy.get("#textCardRef")
			.shadow()
			.find(".ui5-card-root")
			.should("have.attr", "aria-label", "Card I am the content");
	});

	it("Tests aria-label", () => {
		cy.mount(
			<Card id="textAreaAriaLabel">
				<CardHeader
					slot="header"
					titleText="Linked Activities (5)">
				</CardHeader>
			</Card>
		);

		// assert
		cy.get("#textAreaAriaLabel")
			.shadow()
			.find(".ui5-card-root")
			.should("have.attr", "aria-label", "Card");
	});

	it("Tests ARIA attributes of the content", () => {
		cy.mount(<CardSample />);

		// assert
		cy.get("#card")
			.shadow()
			.find(".ui5-card-root div:nth-child(2)")
			.should("have.attr", "role", "group")
			.and("have.attr", "aria-label", "Card Content");
	});

	it("Tests aria-level property", () => {
		cy.mount(<CardSample2 />);

		// assert
		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header .ui5-card-header-title")
			.should("have.attr", "aria-level", "3");

		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header .ui5-card-header-title")
			.invoke("attr", "aria-level", "4")
			.should("have.attr", "aria-level", "4");
	});

	it("Tests header aria-labelledby", () => {
		cy.mount(
			<div>
				<Card>
					<CardHeader
						slot="header"
						id="header"
						additionalText="4 of 10"
						titleText="Linked Activities (5)"
						subtitleText="Quick Links">
					</CardHeader>
				</Card>

				<Card>
					<CardHeader
						slot="header"
						id="header2"
						titleText="New Jobs (5)"
						subtitleText="Find One">
					</CardHeader>
				</Card>
			</div>
		);

		// assert
		cy.get("#header").invoke("prop", "_id").then(headerId => {
			cy.get("#header")
				.shadow()
				.find(".ui5-card-header .ui5-card-header-focusable-element")
				.should("have.attr", "aria-labelledby", `${headerId}-title ${headerId}-subtitle ${headerId}-additionalText`);
		});

		cy.get("#header2").invoke("prop", "_id").then(headerId2 => {
			cy.get("#header2")
				.shadow()
				.find(".ui5-card-header .ui5-card-header-focusable-element")
				.should("have.attr", "aria-labelledby", `${headerId2}-title ${headerId2}-subtitle`);
		});
	});
});
