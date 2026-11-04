import type UI5Element from "../../src/UI5Element.js";
import type { InvalidationInfo, StateChangeInfo } from "../../src/UI5Element.js";
import InvalidateOnBeforeRendering from "../../test/test-elements/InvalidateOnBeforeRendering.js";

describe("Invalidation during suppressed rendering (onBeforeRendering)", () => {
	it("onInvalidation fires only for non-suppressed (strProp) change, not for suppressed (derivedProp) change", () => {
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
		// derivedProp is assigned, which triggers _invalidate while _suppressInvalidation=true.
		// The new behavior: onInvalidation is NOT called for suppressed invalidations.
		cy.get("@el")
			.invoke("prop", "strProp", "hello");

		// Wait for the deferred render (rAF) to complete.
		cy.get<InvalidateOnBeforeRendering>("@el")
			.should($el => {
				expect($el[0].derivedProp).to.equal("derived:hello");
			});

		// onInvalidation fires exactly once — for the strProp change (normal, non-suppressed path).
		// derivedProp change is suppressed and does NOT trigger onInvalidation.
		cy.get("@onInvalidation")
			.then(spy => {
				const calls = (spy as unknown as sinon.SinonSpy).args;
				expect(calls.length).to.equal(1);
				const [changeInfo] = calls[0] as [InvalidationInfo];
				expect(changeInfo.name).to.equal("strProp");
			});
	});

	it("onInvalidation receives correct changeInfo for the non-suppressed strProp change", () => {
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

		// Wait for render to complete.
		cy.get<InvalidateOnBeforeRendering>("@el")
			.should($el => {
				expect($el[0].derivedProp).to.equal("derived:world");
			});

		cy.get("@onInvalidation")
			.then(spy => {
				const calls = (spy as unknown as sinon.SinonSpy).args;
				const strPropCall = calls.find(([info]) => info.name === "strProp");
				expect(strPropCall, "onInvalidation was called for strProp change").to.exist;
				const [changeInfo] = strPropCall as [InvalidationInfo];
				expect(changeInfo.type).to.equal("property");
				expect(changeInfo.newValue).to.equal("world");

				// derivedProp must NOT appear in onInvalidation — it is suppressed
				const derivedPropCall = calls.find(([info]) => info.name === "derivedProp");
				expect(derivedPropCall, "onInvalidation must NOT fire for suppressed derivedProp change").to.not.exist;
			});
	});

	it("the state-change event fires for both normal and suppressed invalidations", () => {
		cy.mount(<InvalidateOnBeforeRendering></InvalidateOnBeforeRendering>);

		cy.get<InvalidateOnBeforeRendering>("[ui5-test-invalidate-on-before-rendering]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		const stateChangeEvents: Array<StateChangeInfo> = [];

		cy.get("[ui5-test-invalidate-on-before-rendering]")
			.as("el")
			.then($el => {
				const el = $el.get(0) as UI5Element;
				el.attachStateChange((info: StateChangeInfo) => {
					stateChangeEvents.push(info);
				});
			});

		cy.get("@el")
			.invoke("prop", "strProp", "fire");

		// After the render cycle, state-change should have fired for both
		// the strProp change (normal path) and the derivedProp change (suppressed path).
		cy.wrap(stateChangeEvents)
			.should($events => {
				const events = $events as unknown as Array<StateChangeInfo>;
				const derivedPropEvent = events.find(e => e.name === "derivedProp");
				expect(derivedPropEvent, "state-change event fired for derivedProp during suppression").to.exist;
				expect(derivedPropEvent!.type).to.equal("property");
				expect(derivedPropEvent!.newValue).to.equal("derived:fire");

				const strPropEvent = events.find(e => e.name === "strProp");
				expect(strPropEvent, "state-change event fired for strProp (normal path)").to.exist;
				expect(strPropEvent!.type).to.equal("property");
				expect(strPropEvent!.newValue).to.equal("fire");
			});
	});

	it("the invalidate event does NOT fire for suppressed (derivedProp) invalidations", () => {
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

		// After the render cycle, invalidate fires only for the non-suppressed strProp change.
		// derivedProp is suppressed and must NOT appear via attachInvalidate.
		cy.wrap(invalidateEvents)
			.should($events => {
				const events = $events as unknown as Array<InvalidationInfo>;
				const derivedPropEvent = events.find(e => e.name === "derivedProp");
				expect(derivedPropEvent, "invalidate event must NOT fire for suppressed derivedProp change").to.not.exist;

				const strPropEvent = events.find(e => e.name === "strProp");
				expect(strPropEvent, "invalidate event fired for strProp (normal path)").to.exist;
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
				// set, so there must be NO suppressed state-change for derivedProp — and therefore
				// no onInvalidation for it either (suppressed changes never reach onInvalidation)
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
