describe("Custom mount", () => {
	it("mount", () => {
		cy.mount(<button>Test</button>);

		cy.get("button")
			.should("exist")
			.and("have.text", "Test");
	});
});
