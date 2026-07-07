import IllustratedMessage from "../../src/IllustratedMessage.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js"
import Panel from "@ui5/webcomponents/dist/Panel.js";

describe("Accessibility", () => {
	it("should add aria-hidden and role=presetation to the SVG when decorative is true", () => {
		cy.mount(
			<IllustratedMessage name="UnableToUpload" decorative>
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find("svg")
			.should("have.attr", "role", "presentation");

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find("svg")
			.should("have.attr", "aria-hidden", "true");
	});

	it("should not have aria-label on the SVG when decorative is true", () => {
		cy.mount(
			<IllustratedMessage name="UnableToUpload" accessible-name-ref="lbl" decorative>
				<Label id="lbl">Text from aria-labelledby</Label>
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find("svg")
			.should("not.have.attr", "aria-label");

	});

	it("should have role=img and aria-label with illustration name when decorative is false", () => {
		cy.mount(
			<IllustratedMessage name="UnableToUpload" decorative={false}>
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-illustration")
			.should("have.attr", "role", "img");

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-illustration")
			.should("have.attr", "aria-label", "UnableToUpload");
	});

	it("should have role=img and aria-label with illustration name by default (when decorative is not set)", () => {
		cy.mount(
			<IllustratedMessage name="NoData">
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-illustration")
			.should("have.attr", "role", "img");

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-illustration")
			.should("have.attr", "aria-label", "NoData");
	});
});

describe("design", () => {
	it("Large design should evaluate to Scene media", () => {
		cy.mount(
			<IllustratedMessage design="Large" name="UnableToUpload">
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SCENE);

	});
	it("Medium design should evaluate to Dialog media", () => {
		cy.mount(
			<IllustratedMessage design="Medium" name="UnableToUpload">
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DIALOG);

	});
	it("Small design should evaluate to Spot media", () => {
		cy.mount(
			<IllustratedMessage design="Small" name="UnableToUpload">
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SPOT);

	});
	it("ExtraSmall design should evaluate to Dot media", () => {
		cy.mount(
			<IllustratedMessage design="ExtraSmall" name="UnableToUpload">
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DOT);

	});

});

describe('SVG CSP Compliance', () => {
  it('should verify all SVG files are CSP compliant', () => {
    cy.task('findAndValidateSvgFiles').then((results: any[]) => {
      // Check if there are any invalid SVG files
      const invalidFiles = results.filter(result => !result.isValid);

      if (invalidFiles.length > 0) {
        const violationReport = invalidFiles
          .map(v => `${v.file}: has violations`)
          .join('\n')
        
        throw new Error(`Found ${invalidFiles.length} SVG files with CSP violations:\n${violationReport}`)
      }

      cy.log(`✅ Validated ${results.length} SVG files - all CSP compliant`);
    })
  })
})

describe("IllustratedMessage 'design' property", () => {
	it("should show up properly, when in panel and it expand/collapse", () => {
		cy.mount(
			<Panel noAnimation>
				<IllustratedMessage name="AddColumn" />
			</Panel>
		);

		cy.get("[ui5-panel]")
			.invoke("prop", "collapsed", true);

		cy.get("[ui5-illustrated-message]")
			.should("have.prop", "media", "base");

		cy.get("[ui5-panel]")
			.invoke("prop", "collapsed", false);

		cy.get("[ui5-illustrated-message]")
			.should("have.prop", "media")
			.and("not.equal", "base");
	});
});

describe("Width-based responsiveness (auto height)", () => {
	it("media is base when container width is 100px", () => {
		cy.mount(
			<div style={{ width: "100px", height: "auto" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.BASE);
	});

	it("media is dot when container width is 200px", () => {
		cy.mount(
			<div style={{ width: "200px", height: "auto" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DOT);
	});

	it("media is spot when container width is 300px", () => {
		cy.mount(
			<div style={{ width: "300px", height: "auto" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SPOT);
	});

	it("media is dialog when container width is 500px", () => {
		cy.mount(
			<div style={{ width: "500px", height: "auto" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DIALOG);
	});

	it("media is scene when container width is 800px", () => {
		cy.mount(
			<div style={{ width: "800px", height: "auto" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SCENE);
	});

	it("shows image with unconstrained height when container has auto height", () => {
		cy.mount(
			<div style={{ width: "400px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("div")
			.invoke("css", "height", "auto");

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should("have.css", "height", "160px");
	});
});

describe("Height-based responsiveness (restricted height, wide container)", () => {
	it("media is scene when container height is 600px", () => {
		cy.mount(
			<div style={{ width: "800px", height: "600px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SCENE);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-inner")
			.should(($el) => {
				expect($el[0].scrollHeight).to.be.lte($el[0].offsetHeight + 1);
			});
	});

	it("media shrinks to dialog when container height is 350px", () => {
		cy.mount(
			<div style={{ width: "800px", height: "350px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DIALOG);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-inner")
			.should(($el) => {
				expect($el[0].scrollHeight).to.be.lte($el[0].offsetHeight + 1);
			});
	});

	it("media shrinks to spot when container height is 250px", () => {
		cy.mount(
			<div style={{ width: "800px", height: "250px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SPOT);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-inner")
			.should(($el) => {
				expect($el[0].scrollHeight).to.be.lte($el[0].offsetHeight + 1);
			});
	});

	it("media shrinks to dot when container height is 180px", () => {
		cy.mount(
			<div style={{ width: "800px", height: "180px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DOT);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-inner")
			.should(($el) => {
				expect($el[0].scrollHeight).to.be.lte($el[0].offsetHeight + 1);
			});
	});

	it("illustration is visible when container height fits content", () => {
		cy.mount(
			<div style={{ height: "440px" }}>
				<IllustratedMessage design="Scene" />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should(($illustration) => {
				const scrollHeight = $illustration[0].scrollHeight;
				expect(scrollHeight).to.not.equal(0);
			});
	});

	it("illustration is visible when IM is slotted and container has fixed height", () => {
		cy.mount(
			<Panel style={{ height: "19rem" }} noAnimation>
				<IllustratedMessage name="AddColumn" />
			</Panel>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should(($illustration) => {
				const scrollHeight = $illustration[0].scrollHeight;
				expect(scrollHeight).to.not.equal(0);
			});
	});
});

describe("Height-based responsiveness (restricted height, dialog-width container)", () => {
	it("media is dialog when container height is 500px", () => {
		cy.mount(
			<div style={{ width: "500px", height: "500px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DIALOG);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-inner")
			.should(($el) => {
				expect($el[0].scrollHeight).to.be.lte($el[0].offsetHeight + 1);
			});
	});

	it("media shrinks to spot when container height is 250px", () => {
		cy.mount(
			<div style={{ width: "500px", height: "250px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SPOT);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-inner")
			.should(($el) => {
				expect($el[0].scrollHeight).to.be.lte($el[0].offsetHeight + 1);
			});
	});

	it("media shrinks to dot when container height is 180px", () => {
		cy.mount(
			<div style={{ width: "500px", height: "180px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DOT);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-inner")
			.should(($el) => {
				expect($el[0].scrollHeight).to.be.lte($el[0].offsetHeight + 1);
			});
	});
});

describe("Dot design resource handling", () => {
	it("uses substitute Spot illustration", () => {
		cy.mount(
			<IllustratedMessage name="TntUnableToLoad" design="Dot" />
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should("have.id", "tnt-Spot-UnableToLoad");
	});

	it("uses original Dot illustration", () => {
		cy.mount(
			<IllustratedMessage name="AddPeople" design="Dot" />
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should("have.id", "sapIllus-Dot-AddPeople");
	});
});

describe("Utility SVG accessibility", () => {
	it("utility SVG has only aria-hidden='true' and no role or focusable attributes", () => {
		cy.mount(
			<IllustratedMessage name="UnableToUpload" />
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-util")
			.should(($svg) => {
				expect($svg).to.have.attr("aria-hidden", "true");
				expect($svg).not.to.have.attr("role");
				expect($svg).not.to.have.attr("focusable");
			});
	});
});