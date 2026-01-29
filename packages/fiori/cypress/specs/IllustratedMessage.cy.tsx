import IllustratedMessage from "../../src/IllustratedMessage.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
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

describe("Vertical responsiveness", () => {
	it("content with auto design shrinks to fit the parent container", () => {
		const expectedMedia = "dialog";

		cy.mount(
			<div style={{ height: "300px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-root")
			.should(($contents) => {
				const scrollHeight = $contents[0].scrollHeight;
				const offsetHeight = $contents[0].offsetHeight;

				expect(scrollHeight).to.be.lessThan(300);
				expect(scrollHeight).to.equal(offsetHeight);
			});

		cy.get("[ui5-illustrated-message]")
			.should("have.prop", "media", expectedMedia);
	});

	it("content with auto design expands to fit the parent container", () => {
		const expectedMedia = "scene";

		cy.mount(
			<div style={{ height: "500px" }}>
				<IllustratedMessage />
			</div>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-root")
			.should(($contents) => {
				const scrollHeight = $contents[0].scrollHeight;
				const offsetHeight = $contents[0].offsetHeight;
				expect(scrollHeight).to.be.lessThan(500);
				expect(scrollHeight).to.equal(offsetHeight);
			});

		cy.get("[ui5-illustrated-message]")
			.should("have.prop", "media", expectedMedia);
	});

	it("content with fixed design fits the parent container", () => {
		cy.mount(
			<div>
				<IllustratedMessage design="Dialog" />
			</div>
		);

		cy.get("div")
			.invoke("css", "height", "250px");

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find(".ui5-illustrated-message-root")
			.should(($contents) => {
				const scrollHeight = $contents[0].scrollHeight;
				const offsetHeight = $contents[0].offsetHeight;
				expect(scrollHeight).to.be.lessThan(250);
				expect(scrollHeight).to.equal(offsetHeight);
			});
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
		.should("have.attr", "media", IllustratedMessage.MEDIA.DIALOG);
	});

	it("Illustration visible, when container fit content height", () => {
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

	it("Illustration visible, when container fit content height", () => {
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


	it("Illustration visible, when IM slotted and container has fixed height", () => {
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
	it("IllustratedMessage variations in a dialog with resizing", () => {
		cy.mount(
		  <Dialog id="illustratedMessageDialog" open>
			<div style={{ width: "100%", height: "100%" }}>
			  <IllustratedMessage
				id="illustration1"
				name="NoData"
			  />
			</div>
		  </Dialog>
		);

		// Ensure the dialog is rendered and open
		cy.get("[ui5-dialog]").as("Dialog").should("exist").and("have.attr", "open");

		// Validate the first IllustratedMessage
		cy.get("#illustration1")
		  .shadow()
		  .find(".ui5-illustrated-message-illustration svg")
		  .should(($illustration) => {
			const scrollHeight = $illustration[0].scrollHeight;
			expect(scrollHeight).to.not.equal(0);
		  });

		// Resize the dialog and validate the media property for each IllustratedMessage
		cy.get("[ui5-dialog]").then(($dialog) => {
		  // Resize the dialog to a smaller size
		  $dialog[0].style.width = "300px";
		  $dialog[0].style.height = "300px";
		});
		  // Validate the media property for the first IllustratedMessage
		  cy.get("#illustration1")
			.invoke("prop", "media")
			.should("equal", "spot");

		cy.get("[ui5-dialog]").then(($dialog) => {
		  // Resize the dialog to a larger size
		  $dialog[0].style.width = "800px";
		  $dialog[0].style.height = "600px";
		});

		  // Validate the media property for the first IllustratedMessage
		  cy.get("#illustration1")
			.invoke("prop", "media")
			.should("equal", "scene");

		cy.get("[ui5-dialog]").then(($dialog) => {
			// Resize the dialog to a smallest size
			$dialog[0].style.width = "200px";
			$dialog[0].style.height = "200px";
			});

		// Validate the media property for the first IllustratedMessage
		cy.get("#illustration1")
			.invoke("prop", "media")
			.should("equal", "dot");

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