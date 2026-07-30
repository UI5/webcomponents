import { setLanguage } from "../../src/config/Language.js";
import { registerI18nLoader } from "../../src/i18nBundle.js";
import parseProperties from "../../src/PropertiesFileFormat.js";
import LanguageAwareLifecycle from "../../test/test-elements/LanguageAwareLifecycle.js";

// Regression test for the language-aware lifecycle bug introduced by PR #13602.
//
// Before the fix, if setLanguage() was called without awaiting and a language-aware
// component was inserted into the DOM while languageChangePending was true,
// connectedCallback bailed out with a bare `return`. The deferred reRenderAllUI5Elements
// call re-rendered the shadow DOM but the onEnterDOM lifecycle hook was never fired,
// so consumers that register a ResizeHandler / add DOM listeners / set attributes
// inside onEnterDOM saw those side effects silently drop.
describe("Language-aware component lifecycle when setLanguage is not awaited", () => {
	beforeEach(() => {
		// Register a slow custom-language loader so setLanguage("bg") stays pending
		// long enough for the component to be inserted before CLDR resolves.
		cy.wrap({ registerI18nLoader })
			.then(api => {
				api.registerI18nLoader("lifecycle-lang-test", "bg", () => {
					return new Promise(resolve => {
						setTimeout(() => resolve(parseProperties("KEY=Value")), 50);
					});
				});
			});

		// Reset language back to en between tests
		cy.wrap({ setLanguage })
			.then(async api => {
				await api.setLanguage("en");
			});
	});

	it("fires onEnterDOM exactly once after the deferred first render", () => {
		// Kick off a language change but do NOT await the promise - this is the
		// pattern the Udex Footer's host app was using.
		let languageReady: Promise<void>;
		cy.wrap({ setLanguage })
			.then(api => {
				languageReady = api.setLanguage("bg");
			});

		cy.mount(<LanguageAwareLifecycle />);

		// Wait for the language change to settle
		cy.then(() => languageReady);

		// After the deferred re-render, onEnterDOM must have fired exactly once
		// and the component must be marked as fully connected.
		cy.get<LanguageAwareLifecycle>("[ui5-language-aware-lifecycle]")
			.should($el => {
				const el = $el[0];
				expect(el.enterDOMCount, "onEnterDOM call count").to.equal(1);
				expect(el._fullyConnected, "_fullyConnected flag").to.equal(true);
				expect(el.afterRenderingCount, "onAfterRendering call count").to.be.at.least(1);
			});
	});

	it("does not fire onEnterDOM twice on subsequent language re-renders", () => {
		let languageReady: Promise<void>;
		cy.wrap({ setLanguage })
			.then(api => {
				languageReady = api.setLanguage("bg");
			});

		cy.mount(<LanguageAwareLifecycle />);

		cy.then(() => languageReady);

		// Change language a second time - this triggers reRenderAllUI5Elements
		// again but the element is already fully connected, so onEnterDOM must
		// NOT be called again.
		cy.wrap({ setLanguage })
			.then(async api => {
				await api.setLanguage("en");
			});

		cy.get<LanguageAwareLifecycle>("[ui5-language-aware-lifecycle]")
			.should($el => {
				expect($el[0].enterDOMCount, "onEnterDOM should still be 1 after re-render").to.equal(1);
			});
	});

	it("does not fire onEnterDOM if element is removed before deferred render", () => {
		cy.wrap({ setLanguage })
			.then(async api => {
				// Insert then synchronously remove the element while the language
				// change is still pending. The element is unregistered by
				// disconnectedCallback, so reRenderAllUI5Elements must not touch it
				// and its lifecycle hooks must stay silent.
				const el = document.createElement("ui5-language-aware-lifecycle") as LanguageAwareLifecycle;

				const languageReady = api.setLanguage("bg"); // NOT awaited yet
				document.body.appendChild(el);
				document.body.removeChild(el);

				await languageReady;

				expect(el.enterDOMCount, "onEnterDOM should not fire on removed element").to.equal(0);
				expect(el.exitDOMCount, "onExitDOM should not fire (was never fully connected)").to.equal(0);
				expect(el._fullyConnected, "_fullyConnected flag stays false").to.equal(false);
			});
	});
});
