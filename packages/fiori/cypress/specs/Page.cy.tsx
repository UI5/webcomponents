import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import Page from "../../src/Page.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Button from "@ui5/webcomponents/dist/Button.js";

describe("Page general interaction", () => {
	beforeEach(() => {
		cy.mount(
			<Page style="height: 300px;">
				<Bar slot="header">
					<Button slot="startContent">Header button</Button>
				</Bar>

				<div id="content">
					Test content
				</div>
				<Bar slot="footer">
					<Button slot="endContent">Footer button</Button>
				</Bar>
			</Page>
		);
	});

	it("tests initial rendering", () => {
		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-header-root")
			.should("exist");

		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-content-root")
			.should("exist");

		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-footer-root")
			.should("exist");
	});

	it("tests footer visibility", () => {
		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-footer-root")
			.should("be.visible");

		cy.get("[ui5-page]")
			.invoke("prop", "hideFooter", true);

		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-footer-root")
			.should("not.be.visible");

		cy.get("[ui5-page]")
			.invoke("prop", "hideFooter", false);
	});

	it("tests animation off footer toggling", () => {
		cy.wrap({ setAnimationMode })
			.invoke("setAnimationMode", AnimationMode.None);

		cy.get("[ui5-page] [slot='footer']")
			.as("footer");

		cy.get("@footer")
			.should("be.visible");

		// toggle hideFooter
		cy.get("[ui5-page]")
			.invoke("prop", "hideFooter", true);

		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-footer-root")
			.should("not.be.visible");

		setAnimationMode(AnimationMode.Full);
	});

	it("createElement does not throw exception", () => {
		cy.document().then(doc => {
			doc.createElement("ui5-page");
		});
	});
});
