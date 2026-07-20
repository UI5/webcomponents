import IllustratedMessage from "../../src/IllustratedMessage.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js"
import Panel from "@ui5/webcomponents/dist/Panel.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

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

	it("media updates from dot to scene when container width expands", () => {
		// This test guards against a specific bug: without the `scrollHeight > clientHeight`
		// guard in _checkHeightConstraints, _contentHeightForMedia["scene"] gets recorded
		// while scene is rendered at full width. When width then shrinks (dot media), the
		// container height (auto) shrinks too. On re-expansion, _mediaExceedsContainerHeight("scene")
		// compares the stored scene height against the current (small) clientHeight and wrongly
		// blocks the upgrade back to scene.
		cy.mount(
			<div id="resizable-container" style={{ width: "800px", height: "auto" }}>
				<IllustratedMessage />
			</div>
		);

		// First render at wide width so _contentHeightForMedia["scene"] gets populated
		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SCENE);

		// Shrink to dot — clientHeight (auto) now equals the small dot illustration height
		cy.get("#resizable-container")
			.invoke("css", "width", "200px");

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DOT);

		// Expand back — must resolve to scene, not stay stuck at dot/dialog
		cy.get("#resizable-container")
			.invoke("css", "width", "800px");

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
	after(() => {
		// Restore theme so that a switch performed inside this describe does not bleed into
		// subsequent specs. Mirrors the pattern in IllustratedMessageV5.cy.tsx.
		cy.wrap({ setTheme }).invoke("setTheme", "sap_horizon");
	});

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

	it("clears the content-height cache on theme change so media re-evaluates freshly", () => {
		// Guards against a stale-cache bug: a themeAware re-render bypasses `_invalidate` (it goes
		// through `renderDeferred` from `reRenderAllUI5Elements`), so `onInvalidation` does not fire
		// on a theme switch. Without an explicit `attachThemeLoaded` cache clear, a downgrade
		// recorded under one theme's typography would persist and prevent the media from
		// re-upgrading once a theme with tighter fonts is applied.
		//
		// Rather than depend on the exact pixel-boundary between two themes' typographies (which is
		// fragile to CSS changes), this test asserts the contract directly: after a theme change,
		// the internal `_contentHeightForMedia` cache is empty, so any previously recorded
		// overflow height no longer blocks media selection.
		cy.mount(
			<div style={{ width: "800px", height: "600px" }}>
				<IllustratedMessage />
			</div>
		);

		// Baseline: scene fits comfortably in 800×600.
		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SCENE);

		// Poison the cache with an impossibly large scene height. On the next render without a
		// cache clear, `_applyMedia` would treat scene as exceeding the container and downgrade.
		cy.get("[ui5-illustrated-message]").then(($el) => {
			const im = $el[0] as unknown as IllustratedMessage;
			im._contentHeightForMedia[IllustratedMessage.MEDIA.SCENE] = 99999;
		});

		// Fire a theme change. The fix installs an `attachThemeLoaded` listener that clears the
		// cache before the framework's themeAware re-render measures against the new theme.
		cy.wrap({ setTheme }).invoke("setTheme", "sap_fiori_3");

		// If the cache was cleared, the poisoned entry is gone and scene stays selected.
		// Without the fix, the stale entry blocks scene and media downgrades to dialog.
		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SCENE);

		cy.get("[ui5-illustrated-message]").then(($el) => {
			const im = $el[0] as unknown as IllustratedMessage;
			// The cache was cleared and then re-populated only if the (fresh) content actually
			// overflows the container. In 800×600 nothing overflows, so no scene entry should
			// remain from the poisoned value.
			expect(im._contentHeightForMedia[IllustratedMessage.MEDIA.SCENE]).to.be.undefined;
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