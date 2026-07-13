import Toast from "../../../src/Toast.js";

describe("Toast visual", () => {
	it("basic — BottomCenter (default placement)", () => {
		cy.mount(<Toast open duration={999999} placement="BottomCenter">Toast message</Toast>);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("placement — TopStart", () => {
		cy.mount(<Toast open duration={999999} placement="TopStart">TopStart Toast</Toast>);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("placement — TopCenter", () => {
		cy.mount(<Toast open duration={999999} placement="TopCenter">TopCenter Toast</Toast>);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("placement — TopEnd", () => {
		cy.mount(<Toast open duration={999999} placement="TopEnd">TopEnd Toast</Toast>);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("placement — MiddleStart", () => {
		cy.mount(<Toast open duration={999999} placement="MiddleStart">MiddleStart Toast</Toast>);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("placement — MiddleCenter", () => {
		cy.mount(<Toast open duration={999999} placement="MiddleCenter">MiddleCenter Toast</Toast>);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("placement — MiddleEnd", () => {
		cy.mount(<Toast open duration={999999} placement="MiddleEnd">MiddleEnd Toast</Toast>);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("placement — BottomStart", () => {
		cy.mount(<Toast open duration={999999} placement="BottomStart">BottomStart Toast</Toast>);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("placement — BottomEnd", () => {
		cy.mount(<Toast open duration={999999} placement="BottomEnd">BottomEnd Toast</Toast>);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("long text content", () => {
		cy.mount(
			<Toast open duration={999999} placement="BottomCenter">
				This is a longer toast message that may wrap onto multiple lines depending on the container width.
			</Toast>
		);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});

	it("custom width and height", () => {
		cy.mount(
			<Toast open duration={999999} placement="BottomCenter" style={{ width: "300px", maxWidth: "300px" }}>
				Styled Toast
			</Toast>
		);
		cy.get("[ui5-toast]").should("be.visible");
		cy.screenshot();
	});
});
