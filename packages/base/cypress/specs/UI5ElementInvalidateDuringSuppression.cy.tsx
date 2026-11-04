import type UI5Element from "../../src/UI5Element.js";
import type { InvalidationInfo } from "../../src/UI5Element.js";
import InvalidateOnBeforeRendering from "../../test/test-elements/InvalidateOnBeforeRendering.js";

describe("Invalidation during suppressed rendering (onBeforeRendering)", () => {
	it("onInvalidation fires when a property changes during onBeforeRendering", () => {
		cy.mount(<InvalidateOnBeforeRendering></InvalidateOnBeforeRendering>);

		cy.get<InvalidateOnBeforeRendering>("[ui5-test-invalidate-on-before-rendering]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-invalidate-on-before-rendering]")
			.as("el")
			.then($el => {
				cy.spy<UI5Element>(($el.get(0) as UI5Element), "onInvalidation").as("onInvalidation");
			});

		// Setting strProp causes a render cycle; during onBeforeRendering,
		// derivedProp is assigned, which triggers _invalidate while _suppressRendering=true.
		// The new behavior: onInvalidation must still be called for that suppressed invalidation.
		cy.get("@el")
			.invoke("prop", "strProp", "hello");

		// Wait for the deferred render (rAF) to complete, then check onInvalidation.
		// onInvalidation must be called at least twice:
		// once for the strProp change (normal path) and once for derivedProp (suppressed path).
		cy.get<InvalidateOnBeforeRendering>("@el")
			.should($el => {
				expect($el[0].derivedProp).to.equal("derived:hello");
			});

		cy.get("@onInvalidation")
			.then(spy => {
				expect((spy as unknown as sinon.SinonSpy).callCount).to.be.at.least(2);
			});
	});

	it("onInvalidation receives correct changeInfo for suppressed property invalidation", () => {
		cy.mount(<InvalidateOnBeforeRendering></InvalidateOnBeforeRendering>);

		cy.get<InvalidateOnBeforeRendering>("[ui5-test-invalidate-on-before-rendering]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-invalidate-on-before-rendering]")
			.as("el")
			.then($el => {
				cy.spy<UI5Element>(($el.get(0) as UI5Element), "onInvalidation").as("onInvalidation");
			});

		cy.get("@el")
			.invoke("prop", "strProp", "world");

		// Wait for render to complete, then inspect spy call args.
		cy.get<InvalidateOnBeforeRendering>("@el")
			.should($el => {
				expect($el[0].derivedProp).to.equal("derived:world");
			});

		cy.get("@onInvalidation")
			.then(spy => {
				const calls = (spy as unknown as sinon.SinonSpy).args;
				const derivedPropCall = calls.find(([info]) => info.name === "derivedProp");
				expect(derivedPropCall, "onInvalidation was called for derivedProp change").to.exist;
				const [changeInfo] = derivedPropCall as [InvalidationInfo];
				expect(changeInfo.type).to.equal("property");
				expect(changeInfo.newValue).to.equal("derived:world");
			});
	});

	it("the invalidate event fires during suppressed rendering", () => {
		cy.mount(<InvalidateOnBeforeRendering></InvalidateOnBeforeRendering>);

		cy.get<InvalidateOnBeforeRendering>("[ui5-test-invalidate-on-before-rendering]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		const invalidateEvents: Array<InvalidationInfo> = [];

		cy.get("[ui5-test-invalidate-on-before-rendering]")
			.as("el")
			.then($el => {
				const el = $el.get(0) as UI5Element;
				el.attachInvalidate((info: InvalidationInfo) => {
					invalidateEvents.push(info);
				});
			});

		cy.get("@el")
			.invoke("prop", "strProp", "fire");

		// After the render cycle, we should have received an invalidate event
		// for the derivedProp change that occurred during onBeforeRendering (while suppressed).
		cy.wrap(invalidateEvents)
			.should($events => {
				const derivedPropEvent = ($events as unknown as Array<InvalidationInfo>).find(e => e.name === "derivedProp");
				expect(derivedPropEvent, "invalidate event fired for derivedProp during suppression").to.exist;
				expect(derivedPropEvent!.type).to.equal("property");
				expect(derivedPropEvent!.newValue).to.equal("derived:fire");
			});
	});

	it("suppressed invalidation does not schedule an extra re-render", () => {
		cy.mount(<InvalidateOnBeforeRendering></InvalidateOnBeforeRendering>);

		cy.get<InvalidateOnBeforeRendering>("[ui5-test-invalidate-on-before-rendering]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-invalidate-on-before-rendering]")
			.as("el")
			.then($el => {
				cy.spy<UI5Element>(($el.get(0) as UI5Element), "_render").as("render");
			});

		cy.get("@el")
			.invoke("prop", "strProp", "once");

		// Even though derivedProp is assigned during onBeforeRendering (triggering _invalidate
		// while suppressed), only one render should occur for the original strProp change.
		cy.get("@render")
			.should("have.been.calledOnce");
	});

	it("setting strProp to undefined skips derivedProp update in onBeforeRendering", () => {
		cy.mount(<InvalidateOnBeforeRendering></InvalidateOnBeforeRendering>);

		cy.get<InvalidateOnBeforeRendering>("[ui5-test-invalidate-on-before-rendering]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		// First render with a value so derivedProp gets set
		cy.get("[ui5-test-invalidate-on-before-rendering]")
			.as("el")
			.invoke("prop", "strProp", "initial");

		cy.get<InvalidateOnBeforeRendering>("@el")
			.should($el => {
				expect($el[0].derivedProp).to.equal("derived:initial");
			});

		// Now install the spy and set strProp back to undefined
		cy.get("@el")
			.then($el => {
				cy.spy<UI5Element>(($el.get(0) as UI5Element), "onInvalidation").as("onInvalidation");
			});

		cy.get("@el")
			.then($el => {
				($el.get(0) as InvalidateOnBeforeRendering).strProp = undefined;
			});

		// Wait for render to settle — strProp is now undefined
		cy.get<InvalidateOnBeforeRendering>("@el")
			.should($el => {
				expect($el[0].strProp).to.equal(undefined);
			});

		cy.get("@onInvalidation")
			.then(spy => {
				const calls = (spy as unknown as sinon.SinonSpy).args;

				// onInvalidation fires for the strProp → undefined change (normal, non-suppressed path)
				const strPropCall = calls.find(([info]) => info.name === "strProp");
				expect(strPropCall, "onInvalidation fires for strProp → undefined").to.exist;
				const [strPropInfo] = strPropCall as [InvalidationInfo];
				expect(strPropInfo.newValue).to.equal(undefined);

				// The onBeforeRendering guard (strProp !== undefined) prevents derivedProp from being
				// set, so there must be NO suppressed invalidation for derivedProp
				const derivedPropCall = calls.find(([info]) => info.name === "derivedProp");
				expect(derivedPropCall, "onInvalidation must NOT fire for derivedProp when strProp is undefined").to.not.exist;
			});

		// derivedProp retains its last computed value — it was not reset
		cy.get<InvalidateOnBeforeRendering>("@el")
			.should($el => {
				expect($el[0].derivedProp).to.equal("derived:initial");
			});
	});

	it("derivedProp has the correct value after the render cycle", () => {
		cy.mount(<InvalidateOnBeforeRendering></InvalidateOnBeforeRendering>);

		cy.get<InvalidateOnBeforeRendering>("[ui5-test-invalidate-on-before-rendering]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-invalidate-on-before-rendering]")
			.as("el")
			.invoke("prop", "strProp", "test");

		cy.get<InvalidateOnBeforeRendering>("@el")
			.should($el => {
				expect($el[0].derivedProp).to.equal("derived:test");
			});
	});
});
