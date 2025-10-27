import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import FlexibleColumnLayout from "../../src/FlexibleColumnLayout.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import Button from "@ui5/webcomponents/dist/Button.js";

describe("Columns resize", () => {
	beforeEach(() => {
		cy.wrap({ setAnimationMode })
			.invoke("setAnimationMode", AnimationMode.None);
	});

	it("separator drag'n'drop", () => {
		cy.mount(
			<FlexibleColumnLayout id="fcl" layout="TwoColumnsMidExpanded">
				<div class="column" id="startColumn" slot="startColumn">some content</div>
				<div class="column" id="midColumn" slot="midColumn">some content</div>
			</FlexibleColumnLayout>
		);

		let oldWidthFirstCol: number;
		let widthAfterMove: number;

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.as("separator");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.then($el => {
				oldWidthFirstCol = $el.width()!;
			});

		// act: mock the user starting to drag the separator
		cy.get("@separator")
			.realMouseDown();

		// act: mock the user starting to drag the separator
		cy.get("@separator")
			.realMouseMove(200, 0);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should($el => {
				widthAfterMove = $el.width()!;

				expect(oldWidthFirstCol).to.be.lt(widthAfterMove);
			});

		// act: mock the user releasing the mouse button; use "then" to ensure it happens after the above check has completed
		cy.get("@separator")
			.realMouseUp();

		cy.get("@separator")
			.realMouseMove(200, 0);

		cy.get("@separator")
			.realMouseMove(-100, 0);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should($el => {
				expect(widthAfterMove).to.be.equal($el.width()!);
			});
	});

	it("sets dedicated class to hidden columns", () => {
		cy.mount(
			<FlexibleColumnLayout id="fcl" layout="TwoColumnsMidExpanded">
				<div class="column" id="startColumn" slot="startColumn">some content</div>
				<div class="column" id="midColumn" slot="midColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should($el => {
				expect($el).to.have.class("ui5-fcl-column--hidden");
			});
	});

	it("keeps hidden class on columns after rerendering", () => {
		cy.wrap({ setAnimationMode })
			.invoke("setAnimationMode", AnimationMode.Full);

		cy.mount(
			<FlexibleColumnLayout layout="TwoColumnsStartExpanded">
				<div class="column" slot="startColumn">some content</div>
				<div class="column" slot="midColumn">some content</div>
				<div class="column" slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.class", "ui5-fcl-column--hidden");

		cy.get("@fcl")
			.invoke("prop", "layout", "TwoColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.class", "ui5-fcl-column-animation");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.class", "ui5-fcl-column--hidden");

		cy.get("@fcl")
			.invoke("css", "height", "310px");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.class", "ui5-fcl-column--hidden");
	});
});

describe("ACC", () => {
	it("verifies that aria-hidden is not set in OneColumn layout", () => {
		cy.mount(
			<FlexibleColumnLayout id="fcl" layout="OneColumn">
				<div class="column" id="startColumn" slot="startColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl");

		cy.get("@fcl")
			.shadow()
			.find("slot[name=startColumn]")
			.should("not.have.attr", "aria-hidden");

		cy.get("@fcl")
			.shadow()
			.find("slot[name=midColumn]")
			.should("have.attr", "aria-hidden");

		cy.get("@fcl")
			.shadow()
			.find("slot[name=endColumn]")
			.should("have.attr", "aria-hidden");
	});

	it("verifies that aria-valuenow is set on separators", () => {
		cy.mount(
			<FlexibleColumnLayout id="fcl" layout="ThreeColumnsMidExpanded">
				<div class="column" id="startColumn" slot="startColumn">some content</div>
				<div class="column" id="midColumn" slot="midColumn">some content</div>
				<div class="column" id="endColumn" slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("have.attr", "aria-valuenow");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("have.attr", "aria-valuenow");
	});
});

before(() => {
	cy.wrap({ setAnimationMode })
		.then(api => {
			return api.setAnimationMode("none");
		});
});

describe("FlexibleColumnLayout Behavior", () => {
	it("tests Desktop size 1400px", () => {
		cy.viewport(1400, 1080);

		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl")
			.then($fcl => {
				$fcl.get(0).addEventListener("layout-change", cy.stub().as("layoutChangeStub"));
			});

		cy.get("@fcl")
			.should("have.attr", "_visible-columns", "3");

		// Assert default column widths
		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.attr", "style")
			.and("include", "width: 25%");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "style")
			.and("include", "width: 50%");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.attr", "style")
			.and("include", "width: 25%");

		cy.get("@layoutChangeStub")
			.should("not.have.been.called");
	});

	it("tests Tablet Size 1000px", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl")
			.then($fcl => {
				$fcl.get(0).addEventListener("layout-change", cy.stub().as("layoutChangeStub"));
			});

		cy.viewport(1000, 1080);

		cy.get("@fcl")
			.should("have.attr", "_visible-columns", "2");

		// Assert default column widths for tablet size
		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.attr", "style")
			.and("include", "width: 0px");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "style")
			.and("include", "width: 67%");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.attr", "style")
			.and("include", "width: 33%");

		cy.get("@layoutChangeStub")
			.should("have.been.calledOnce");
	});

	it("tests Phone size 500px", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl")
			.then($fcl => {
				$fcl.get(0).addEventListener("layout-change", cy.stub().as("layoutChangeStub"));
			});

		cy.viewport(500, 1080);

		cy.get("@fcl")
			.should("have.attr", "_visible-columns", "1");

		cy.get("@layoutChangeStub")
			.should("have.been.calledOnce");
	});
});

describe("First column closing arrow behavior", () => {
	it("should switch layout and update arrow icon on desktop", () => {
		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsStartHiddenMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.should("have.attr", "icon", "slim-arrow-right");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.click();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.should("have.attr", "icon", "slim-arrow-left");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.click();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsStartHiddenMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.should("have.attr", "icon", "slim-arrow-right");
	});
});

describe("Layout Change API", () => {
	it("tests change layout with API", () => {
		cy.mount(
			<>
				<Button data-testid="switchBtn">Set to ThreeColumnsMidExpanded</Button>
				<FlexibleColumnLayout
					layout="TwoColumnsStartExpanded"
				>
					<div slot="startColumn">Column 1 content</div>
					<div slot="midColumn">Column 2 content</div>
					<div slot="endColumn">Column 3 content</div>
				</FlexibleColumnLayout>
			</>
		);

		cy.get("[data-testid='switchBtn']")
			.then($btn => {
				$btn.get(0).addEventListener("click", () => {
					const fcl = document.querySelector("[ui5-flexible-column-layout]") as any;
					fcl.layout = "ThreeColumnsMidExpanded";
				});
			});

		cy.get("[ui5-flexible-column-layout]")
			.should("have.attr", "_visible-columns", "2")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[data-testid='switchBtn']").click();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.attr", "_visible-columns", "3")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});

	it("changes layout when dragging separator", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="TwoColumnsStartExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").then(($fcl) => {
			const fcl = $fcl[0];
			fcl.addEventListener("layout-change", cy.stub().as("layoutChanged"));
		});

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@layoutChanged").should("have.been.calledOnce");
		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.realMouseDown()
			.realMouseMove(400, 0)
			.realMouseUp();

		cy.get("@layoutChanged").should("have.been.calledTwice");
		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");
	});
});

describe("Column Expansion Tests", () => {
	it("allows expand mid column from TwoColumnsStartExpanded to TwoColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="TwoColumnsStartExpanded"
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");
	});

	it("allows hide end column from ThreeColumnsMidExpanded to ThreeColumnsMidExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});
});

describe("Start Column Expansion Test", () => {
	it("allows expand start column from TwoColumnsMidExpanded to TwoColumnsStartExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout layout="TwoColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");
	});

	it("allows expand start column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsStartExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsStartExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");
	});

	it("allows expand mid column from ThreeColumnsStartExpandedEndHidden to ThreeColumnsMidExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsStartExpandedEndHidden">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});

	it("allows expand end column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});
});

describe("Layout change by dragging end-separator on desktop", () => {
	it("allows expand end-column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpandedEndHidden"
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});

	it("allows expand end-column from ThreeColumnsMidExpanded to ThreeColumnsEndExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsEndExpanded");
	});
});

describe("Layout change by dragging start-separator on tablet", () => {
	it("allows expand mid column from TwoColumnsStartExpanded to TwoColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="TwoColumnsStartExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");
	});

	it("allows expand start column from TwoColumnsMidExpanded to TwoColumnsStartExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="TwoColumnsMidExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");
	});

	it("allows hide end column from ThreeColumnsMidExpanded to ThreeColumnsMidExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(300, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});

	it("allows expand start column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsStartExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");
	});

	it("allows expand mid column from ThreeColumnsStartExpandedEndHidden to ThreeColumnsMidExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsStartExpandedEndHidden">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});

	it("preserves ThreeColumnsMidExpandedEndHidden on tiny start column drag", () => {
		cy.viewport(1000, 1080);

		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-100, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});
});

describe("Layout change by dragging end-separator on tablet", () => {
	beforeEach(() => {
		cy.viewport(1000, 1080);
	});

	it("allows expand end-column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});

	it("allows expand end-column from ThreeColumnsMidExpanded to ThreeColumnsEndExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-300, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsEndExpanded");
	});
});

describe("Preserves column min-width", () => {
	it("complies with min-width requirement on smallest desktop", () => {
		const smallestDesktopWidth = 1024;
		const smallestColumnWidth = 248;

		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpanded"
				style={{ height: "300px", width: `${smallestDesktopWidth}px` }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl").should("have.prop", "offsetWidth", smallestDesktopWidth);

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.prop", "offsetWidth", smallestColumnWidth);
	});

	it("preserves min-width of begin column", () => {
		const smallestColumnWidth = 248;
		cy.mount(
			<FlexibleColumnLayout
				layout="TwoColumnsMidExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--start")
			.invoke("width")
			.then((initialStartWidth) => {
				const differenceFromMin = initialStartWidth - smallestColumnWidth;
				const testOffsetX = differenceFromMin + 10;

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-separator-start")
					.should("be.visible")
					.realMouseDown()
					.realMouseMove(-testOffsetX, 0)
					.realMouseUp();

				cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-column--start")
					.should("have.prop", "offsetWidth", smallestColumnWidth);
			});
	});

	it("preserves min-width of mid column in 2-column layout", () => {
		const smallestColumnWidth = 248;
		cy.mount(
			<FlexibleColumnLayout
				layout="TwoColumnsStartExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.invoke("width")
			.then((initialMidWidth) => {
				const differenceFromMin = initialMidWidth - smallestColumnWidth;
				const testOffsetX = differenceFromMin + 10;

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-separator-start")
					.should("be.visible")
					.realMouseDown()
					.realMouseMove(testOffsetX, 0)
					.realMouseUp();

				cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-column--middle")
					.should("have.prop", "offsetWidth", smallestColumnWidth);
			});
	});

	it("preserves min-width of mid column in 3-column layout", () => {
		const smallestColumnWidth = 248;

		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.invoke("width")
			.then((initialMidWidth) => {
				const differenceFromMin = initialMidWidth - smallestColumnWidth;
				const testOffsetX = differenceFromMin + 10;

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-separator-end")
					.should("be.visible")
					.realMouseDown()
					.realMouseMove(-testOffsetX, 0)
					.realMouseUp();

				cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsEndExpanded");

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-column--middle")
					.should("have.prop", "offsetWidth", smallestColumnWidth);
			});
	});

	it("preserves min-width of end column", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpanded"
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		const smallestColumnWidth = 248;

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.invoke("width")
			.then((endColumnWidth) => {
				const testOffsetX = endColumnWidth - smallestColumnWidth + 10;

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-separator-end")
					.should("be.visible")
					.realMouseDown()
					.realMouseMove(testOffsetX, 0)
					.realMouseUp();

				cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-column--end")
					.should("have.prop", "offsetWidth", smallestColumnWidth);
			});
	});

	it("fully reveals the end-column on dragging the end-separator only few pixels", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpandedEndHidden"
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		const smallestColumnWidth = 248;

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-100, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.prop", "offsetWidth", smallestColumnWidth);
	});
});

describe("Accessibility with Animation Disabled", () => {
	it("tests separator acc attrs", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpandedEndHidden"
				accessibilityAttributes={{
					startSeparator: { role: "region", name: "Start Draggable Splitter" },
					endSeparator: { role: "region", name: "End Draggable Splitter" }
				}}
			>
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		const startSeparatorText = "Start Draggable Splitter";
		const endSeparatorText = "End Draggable Splitter";

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("have.attr", "title", startSeparatorText);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("have.attr", "title", endSeparatorText);
	});

	it("tests acc default roles", () => {
		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.attr", "role", "region");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "role", "region");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("not.have.attr", "role");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("have.attr", "role", "separator");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("have.attr", "role", "separator");
	});

	it("tests acc custom roles", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="ThreeColumnsMidExpanded"
				accessibilityAttributes={{
					startColumn: { role: "complementary", name: "Start column" },
					startSeparator: { role: "region", name: "Start separator" },
					midColumn: { role: "main", name: "Mid column" },
					endSeparator: { role: "region", name: "End separator" },
					endColumn: { role: "complementary", name: "End column" }
				}}
			>
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.attr", "role", "complementary");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "role", "main");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.attr", "role", "complementary");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("have.attr", "role", "region");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("have.attr", "role", "region");
	});

	it("tests acc attrs", () => {
		cy.mount(
			<FlexibleColumnLayout layout="OneColumn">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("not.have.attr", "aria-hidden");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "aria-hidden", "true");
	});
});

describe("Layouts configuration", () => {
	const COLUMN_MIN_WIDTH = 248;

	it("initial configuration", () => {

		cy.mount(
			<FlexibleColumnLayout layout="TwoColumnsStartExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl")
			.then($fcl => {
				$fcl.get(0).addEventListener("layout-configuration-change", cy.stub().as("layoutConfigChangeStub"));
			});

		// Assert resulting column widths
		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.attr", "style")
			.and("include", "width: 67%");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "style")
			.and("include", "width: 33%");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.attr", "style")
			.and("include", "width: 0px");

		// Assert layoutsConfiguration is initially an empty object
		cy.get("@fcl")
			.invoke("prop", "layoutsConfiguration")
			.should("deep.equal", {});

		cy.get("@layoutConfigChangeStub")
			.should("not.have.been.called");
	});

	it("allows set configuration programatically", () => {

		cy.mount(
			<FlexibleColumnLayout layout="TwoColumnsStartExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl")
			.then($fcl => {
				$fcl.get(0).addEventListener("layout-configuration-change", cy.stub().as("layoutConfigChangeStub"));
			});

		// Set layoutsConfiguration programmatically
		cy.get("@fcl")
			.invoke("prop", "layoutsConfiguration", {
				"desktop": {
					"TwoColumnsStartExpanded": {
						layout: ["75%", "25%", "0%"]
					}
				}
			});

		// Assert resulting column widths
		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.attr", "style")
			.and("include", "width: 75%");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "style")
			.and("include", "width: 25%");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.attr", "style")
			.and("include", "width: 0px");

		cy.get("@layoutConfigChangeStub")
			.should("not.have.been.called");
	});

	it("fires layout-configuration-change event when dragging separator within same layout", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="TwoColumnsStartExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").then(($fcl) => {
			const fcl = $fcl[0];
			fcl.addEventListener("layout-configuration-change", cy.stub().as("layoutConfigurationChanged"));
		});

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		// resize the columns within the same layout-type
		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(10, 0)
			.realMouseUp();

		cy.get("@layoutConfigurationChanged").should("have.been.calledOnce");
		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

		// Check that layoutsConfiguration property has the expected structure
		cy.get("@fcl").invoke("prop", "layoutsConfiguration").then((layoutsConfig: any) => {
			expect(layoutsConfig).to.have.property("desktop");
			expect(layoutsConfig.desktop).to.have.property("TwoColumnsStartExpanded");
			expect(layoutsConfig.desktop.TwoColumnsStartExpanded).to.have.property("layout");
			expect(layoutsConfig.desktop.TwoColumnsStartExpanded.layout).to.be.an("array");
			expect(layoutsConfig.desktop.TwoColumnsStartExpanded.layout).to.have.length(3);
			expect(layoutsConfig.desktop.TwoColumnsStartExpanded.layout).to.satisfy((arr: any[]) => 
				arr.every(item => typeof item === "string")
			);

			// Check the exact values of the layout array
			const layoutArray = layoutsConfig.desktop.TwoColumnsStartExpanded.layout;
			
			// 1) Calling parseInt on each of them should return a number
			const parsedNumbers = layoutArray.map((item: string) => parseInt(item, 10));
			expect(parsedNumbers).to.satisfy((nums: number[]) => 
				nums.every(num => !isNaN(num))
			);

			// 2) The last number should be 0
			expect(parsedNumbers[2]).to.equal(0);

			// 3) The first number should be greater than the second number
			expect(parsedNumbers[0]).to.be.greaterThan(parsedNumbers[1]);
		});
	});

	it("fires layout-configuration-change event when dragging separator to update the layout", () => {
		cy.mount(
			<FlexibleColumnLayout
				layout="TwoColumnsStartExpanded">
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").then(($fcl) => {
			const fcl = $fcl[0];
			fcl.addEventListener("layout-configuration-change", cy.stub().as("layoutConfigurationChanged"));
		});

		cy.get("[ui5-flexible-column-layout]").as("fcl");

		// resize the columns to a new layout-type
		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@layoutConfigurationChanged").should("have.been.calledOnce");
		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");

		// Check that layoutsConfiguration property has the expected structure
		cy.get("@fcl").invoke("prop", "layoutsConfiguration").then((layoutsConfig: any) => {
			expect(layoutsConfig).to.have.property("desktop");
			expect(layoutsConfig.desktop).to.have.property("TwoColumnsMidExpanded");
			expect(layoutsConfig.desktop.TwoColumnsMidExpanded).to.have.property("layout");
			expect(layoutsConfig.desktop.TwoColumnsMidExpanded.layout).to.be.an("array");
			expect(layoutsConfig.desktop.TwoColumnsMidExpanded.layout).to.have.length(3);
			expect(layoutsConfig.desktop.TwoColumnsMidExpanded.layout).to.satisfy((arr: any[]) => 
				arr.every(item => typeof item === "string")
			);

			// Check the exact values of the layout array
			const layoutArray = layoutsConfig.desktop.TwoColumnsMidExpanded.layout;
			
			// 1) Calling parseInt on each of them should return a number
			const parsedNumbers = layoutArray.map((item: string) => parseInt(item, 10));
			expect(parsedNumbers).to.satisfy((nums: number[]) => 
				nums.every(num => !isNaN(num))
			);

			// 2) The last number should be 0
			expect(parsedNumbers[2]).to.equal(0);

			// 3) The first number should be smaller than the second number
			expect(parsedNumbers[0]).to.be.lessThan(parsedNumbers[1]);
		});
	});

	it("applies min width constraints", () => {

		cy.mount(
			<FlexibleColumnLayout layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl")
			.then($fcl => {
				$fcl.get(0).addEventListener("layout-configuration-change", cy.stub().as("layoutConfigChangeStub"));
			});

		// Set layoutsConfiguration programmatically
		cy.get("@fcl")
			.invoke("prop", "layoutsConfiguration", {
				"desktop": {
					"ThreeColumnsMidExpanded": {
						layout: ["10%", "80%", "10%"]
					}
				}
			});

		// Assert resulting column widths respect minimum width constraint
		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.prop", "offsetWidth", COLUMN_MIN_WIDTH);

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.prop", "offsetWidth", COLUMN_MIN_WIDTH);

		cy.get("@layoutConfigChangeStub")
			.should("not.have.been.called");
	});

});

