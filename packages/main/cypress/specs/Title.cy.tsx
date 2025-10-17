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
	});

	describe("Title heading getters", () => {
		const levels = ["H1", "H2", "H3", "H4", "H5", "H6"] as const;
		
		levels.forEach((level, index) => {
			const getter = level.toLowerCase(); 

			it(`should return ${getter}() = true when level is ${level}`, () => {
				cy.mount(<Title id={`title${level}`} level={level}>Title {level}</Title>);
				cy.get(`#title${level}`).then(($el) => {
					const title = $el[0] as Title;
					expect((title as any)[getter]).to.be.true;
				});
			});

			it(`should return ${getter}() = false when level is not ${level}`, () => {
				const otherLevel = levels[(index + 1) % levels.length];
				cy.mount(<Title id={`title${otherLevel}`} level={otherLevel}>Title {otherLevel}</Title>);
				cy.get(`#title${otherLevel}`).then(($el) => {
					const title = $el[0] as Title;
					expect((title as any)[getter]).to.be.false;
				});
			});
		});

		it('should return h2() = true for default level and all others false', () => {
			cy.mount(<Title id="titleDefault">Default Title</Title>);
			cy.get('#titleDefault').then(($el) => {
				const title = $el[0] as Title;
				expect(title.h1).to.be.false;
				expect(title.h2).to.be.true; // default level is H2
				expect(title.h3).to.be.false;
				expect(title.h4).to.be.false;
				expect(title.h5).to.be.false;
				expect(title.h6).to.be.false;
			});
		});
	});
});
