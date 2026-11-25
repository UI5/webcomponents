import type UI5Element from "../../src/UI5Element.js";
import Generic from "../../test/test-elements/Generic.js";
import Invalidation from "../../test/test-elements/Invalidation.js";

void Invalidation; // prevents tree-shaking

describe("Invalidation works", () => {
	it("Tests that changing a property invalidates", () => {
		cy.mount(<Generic></Generic>);

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then(el => {
				cy.spy<UI5Element>((el.get(0) as UI5Element), "onInvalidation").as("invalidations");
			});

		cy.get("@testGeneric")
			.invoke("prop", "strProp", "new value");

		cy.get("@testGeneric")
			.invoke("prop", "boolProp", true);

		cy.get("@invalidations")
			.should("have.been.calledTwice");
	});

	it("Tests that setting a property to the same value does not invalidate", () => {
		cy.mount(<Generic></Generic>);

		const text = "new value";

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.invoke("prop", "strProp", text)
			.then(el => {
				cy.spy<UI5Element>((el.get(0) as UI5Element), "onInvalidation").as("invalidations");
			});

		cy.get("@testGeneric")
			.invoke("prop", "strProp", text);

		cy.get("@invalidations")
			.should("have.not.been.called");
	});

	it("Tests that setting a property of type Object always invalidates", () => {
		cy.mount(<Generic></Generic>);

		const obj = {};
		const otherObj = {};

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.invoke("prop", "objectProp", obj)
			.then(el => {
				cy.spy<UI5Element>((el.get(0) as UI5Element), "onInvalidation").as("invalidations");
			});

		cy.get("@testGeneric")
			.invoke("prop", "objectProp", otherObj);

		cy.get("@invalidations")
			.should("have.been.calledOnce");
	});

	it("Tests that setting an array property always invalidates", () => {
		cy.mount(<Generic></Generic>);

		const arr: Array<string> = [];
		const otherArr: Array<string> = [];

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.invoke("prop", "multiProp", arr)
			.then(el => {
				cy.spy<UI5Element>((el.get(0) as UI5Element), "onInvalidation").as("invalidations");
			});

		cy.get("@testGeneric")
			.invoke("prop", "multiProp", otherArr);

		cy.get("@invalidations")
			.should("have.been.calledOnce");
	});

	it("Tests that adding a child invalidates", () => {
		cy.mount(<Generic></Generic>);

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then(el => {
				cy.spy<UI5Element>((el.get(0) as UI5Element), "onInvalidation").as("invalidations");
			});

		cy.get("@testGeneric")
			.then($testGeneric => {
				const div = document.createElement("div");
				$testGeneric.append(div);
			});

		cy.get("@invalidations")
			.should("have.been.called");
	});

	it("Tests that removing a child invalidates", () => {
		cy.mount(<Generic></Generic>);

		const div = document.createElement("div");

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($testGeneric => {
				$testGeneric.append(div);

				return $testGeneric;
			})
			.then($testGeneric => {
				cy.spy<UI5Element>(($testGeneric.get(0) as UI5Element), "onInvalidation").as("invalidations");
			});

		cy.get("@invalidations")
			.should("have.not.been.called");

		cy.wrap(div)
			.then($div => {
				$div.remove();
			});

		cy.get("@invalidations")
			.should("have.been.called");
	});

	it("Tests that modifying textContent invalidates", () => {
		cy.mount(<Generic></Generic>);

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($testGeneric => {
				$testGeneric.text("test");

				return $testGeneric;
			})
			.then($testGeneric => {
				cy.spy<UI5Element>(($testGeneric.get(0) as UI5Element), "onInvalidation").as("invalidations");
			});

		cy.get("@invalidations")
			.should("have.not.been.called");

		cy.get("@testGeneric")
			.then($testGeneric => {
				$testGeneric.text("test2");
			});

		cy.get("@invalidations")
			.should("have.been.called");
	});

	it("Tests that modifying nodeValue invalidates", () => {
		cy.mount(<Generic></Generic>);

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($testGeneric => {
				$testGeneric.text("test");

				return $testGeneric;
			})
			.then($testGeneric => {
				cy.spy<UI5Element>(($testGeneric.get(0) as UI5Element), "onInvalidation").as("invalidations");
			});

		cy.get("@invalidations")
			.should("have.not.been.called");

		cy.get("@testGeneric")
			.then($testGeneric => {
				$testGeneric.get(0).childNodes[0].nodeValue = "test2";
			});

		cy.get("@invalidations")
			.should("have.been.called");
	});

	it("Tests that multiple invalidations result in a single rendering", () => {
		cy.mount(<Generic></Generic>);

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.then($testGeneric => {
				cy.spy<UI5Element>(($testGeneric.get(0) as UI5Element), "onInvalidation").as("invalidations");

				cy.spy<UI5Element>(($testGeneric.get(0) as UI5Element), "_render").as("rendering");
			});

		cy.get("@testGeneric")
			.invoke("prop", "strProp", "new");

		cy.get("@testGeneric")
			.invoke("prop", "strProp", "new2");

		cy.get("@invalidations")
			.should("have.been.calledTwice");

		cy.get("@rendering")
			.should("have.been.calledOnce");
	});

	it("Tests that state changes triggered in onBeforeRendering are reported on initial render and property change", () => {
		cy.mount(<div id="content"></div>);

		cy.get("#content").then($0 => {
			const elem = document.createElement("ui5-invalidation") as Invalidation;
			elem.attachStateChange(cy.spy().as("stateChange"));
			$0.append(elem);
		});

		// call 1: silentInvalidation set during first onBeforeRendering (suppressed path)
		cy.get("@stateChange")
			.should("have.been.calledWithMatch", {
				type: "property",
				name: "silentInvalidation",
				newValue: "on-before-rendering:1",
			})
			.and("have.callCount", 1);

		cy.get("[ui5-invalidation]")
			.invoke("prop", "myProp", "new");

		// call 2: myProp change (normal path)
		cy.get("@stateChange")
			.should("have.been.calledWithMatch", {
				type: "property",
				name: "myProp",
				newValue: "new",
			})
			.and("have.callCount", 2);

		// call 3: silentInvalidation set during onBeforeRendering re-render (suppressed path)
		cy.get("@stateChange")
			.should("have.been.calledWithMatch", {
				type: "property",
				name: "silentInvalidation",
				newValue: "on-before-rendering:2",
			})
			.and("have.callCount", 3);
	});

	it("Tests that state changes triggered in onBeforeRendering are reported when invalidating property is set directly", () => {
		cy.mount(<div id="content"></div>);

		cy.get("#content").then($0 => {
			const elem = document.createElement("ui5-invalidation") as Invalidation;
			elem.attachStateChange(cy.spy().as("stateChange"));
			$0.append(elem);
		});

		// call 1: silentInvalidation set during first onBeforeRendering (suppressed path)
		cy.get("@stateChange")
			.should("have.callCount", 1);

		cy.get("[ui5-invalidation]")
			.invoke("prop", "silentInvalidation", "test");

		// call 2: silentInvalidation = "test" (normal path)
		cy.get("@stateChange")
			.should("have.been.calledWithMatch", {
				type: "property",
				name: "silentInvalidation",
				newValue: "test",
			})
			.and("have.callCount", 2);

		// call 3: silentInvalidation set during onBeforeRendering re-render (suppressed path)
		cy.get("@stateChange")
			.should("have.been.calledWithMatch", {
				type: "property",
				name: "silentInvalidation",
				newValue: "on-before-rendering:2",
			})
			.and("have.callCount", 3);
	});
});
