import Button from "@ui5/webcomponents/dist/Button.js";
import DynamicSideContent from "../../src/DynamicSideContent.js";
import SideContentFallDown from "../../src/types/SideContentFallDown.js";

describe("Accessibility", () => {
	it("tests main and side content roles", () => {
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dsc");

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.attr", "role", "main");

		   cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.attr", "role", "complementary");
	});

	it("tests main and side content aria-label values", () => {
		const customMainContentLabel = "Custom Main Content Label";
		const customSideContentLabel = "Custom Side Content Label";

		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
					<Button>Set Custom ARIA Labels</Button>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dsc");

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.attr", "aria-label", "Main Content");

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.attr", "aria-label", "Side Content");

		cy.get<DynamicSideContent>("@dsc")
			.then($dsc => {
				$dsc.get(0).accessibilityAttributes = {
					"mainContent": {
						"ariaLabel": customMainContentLabel,
					},
					"sideContent": {
						"ariaLabel": customSideContentLabel,
					},
				};
			});

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.attr", "aria-label", customMainContentLabel);

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.attr", "aria-label", customSideContentLabel);
	});
});

describe("'sideContentPosition' property", () => {
	it("set to 'End'", () => {
		cy.mount(
			<DynamicSideContent sideContentPosition="End">
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-root > *")
			.first()
			.should("have.class", "ui5-dsc-main");
	});

	it("set to 'Start'", () => {
		cy.mount(
			<DynamicSideContent sideContentPosition="Start">
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-root > *")
			.first()
			.should("have.class", "ui5-dsc-side");
	});
});

describe("'equalSplit' property", () => {
	it("set to 'true'", () => {
		cy.mount(
			<DynamicSideContent equalSplit={true}>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");


        // Check actual computed CSS width values
        cy.get("@dynamicSideContent")
            .shadow()
            .find(".ui5-dsc-main")
            .should("have.css", "width")
            .then(width => {
                // Parse the pixel value and check if it's approximately 50% of container
                cy.get("@dynamicSideContent")
                    .invoke("outerWidth")
                    .then(containerWidth => {
                        const expectedWidth = containerWidth * 0.5;
                        expect(parseFloat(width as unknown as string)).to.be.closeTo(expectedWidth, 1);
                    });
            });

        cy.get("@dynamicSideContent")
            .shadow()
            .find(".ui5-dsc-side")
            .should("have.css", "width")
            .then(width => {
                cy.get("@dynamicSideContent")
                    .invoke("outerWidth")
                    .then(containerWidth => {
                        const expectedWidth = containerWidth * 0.5;
                        expect(parseFloat(width as unknown as string)).to.be.closeTo(expectedWidth, 1);
                    });
            });
	});
});


describe("'layout-change' event:", () => {
	it("fires when changing the breakpoint", () => {
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		cy.get("@dynamicSideContent").then(dsc => {
			dsc.get(0).addEventListener("ui5-layout-change", cy.stub()
				.as("layoutChange"));
		});

		// Change to S to ensure previous breakpoint for the next event
		cy.viewport(400, 500);

		cy.get("@layoutChange")
			.should("be.called");

		// Change to M
		cy.viewport(900, 500);

		cy.get("@layoutChange")
			.should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					currentBreakpoint: "M",
					previousBreakpoint: "S",
					mainContentVisible: true,
					sideContentVisible: true
				},
			});

		// Change to > 1024 and < 1440 (L)
		cy.viewport(1300, 500);

		cy.get("@layoutChange")
			.should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					currentBreakpoint: "L",
					previousBreakpoint: "M",
					mainContentVisible: true,
					sideContentVisible: true
				},
			});

		// Change to < 720 (S)
		cy.viewport(600, 500);

		cy.get("@layoutChange")
			.should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					currentBreakpoint: "S",
					previousBreakpoint: "L",
					mainContentVisible: true,
					sideContentVisible: false
				},
			});

		// Change to > 1440 (XL)
		cy.viewport(1600, 500);

		cy.get("@layoutChange")
			.should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					currentBreakpoint: "XL",
					previousBreakpoint: "L",
					mainContentVisible: true,
					sideContentVisible: true
				},
			});
	});
});
