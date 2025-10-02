import Title from "../../src/Title.js";

describe("Title", () => {
	describe("Rendering ", () => {
		it("h{n} tags rendered correctly", () => {
			cy.mount(<Title id="titleH1" level="H1">Title Size 1</Title>);
			cy.get("#titleH1").shadow().find("h1").should("exist");

			cy.mount(<Title id="titleAuto">Title Size Auto (2)</Title>);
			cy.get("#titleAuto").shadow().find("h2").should("exist");

			cy.mount(<Title id="titleH2" level="H2">Title Size 2</Title>);
			cy.get("#titleH2").shadow().find("h2").should("exist");

			cy.mount(<Title id="titleH3" level="H3">Title Size 3</Title>);
			cy.get("#titleH3").shadow().find("h3").should("exist");

			cy.mount(<Title id="titleH4" level="H4">Title Size 4</Title>);
			cy.get("#titleH4").shadow().find("h4").should("exist");

			cy.mount(<Title id="titleH5" level="H5">Title Size 5</Title>);
			cy.get("#titleH5").shadow().find("h5").should("exist");

			cy.mount(<Title id="titleH6" level="H6">Title Size 6</Title>);
			cy.get("#titleH6").shadow().find("h6").should("exist");
		});

		// it("should wrap the text of the title", () => {
		// 	cy.mount(<Title size="H6" level="H6" id="wrapping-title" style={{ width: "200px" }}>Wrapping Title Lorem Ipsum Dolor, Sit Amet Consectetur Adipisicing Elit. Numquam, Ab.</Title>);
		// 	cy.get("#wrapping-title").should("have.css", "height", "64px");

		// 	cy.mount(<Title size="H6" level="H6" id="truncated-title" wrappingType="None" style={{ width: "200px" }}>Truncated Title Lorem Ipsum Dolor, Sit Amet Consectetur Adipisicing Elit. Numquam, Ab.</Title>);
		// 	cy.get("#truncated-title").should("have.css", "height", "16px");
		// });
	});
});
