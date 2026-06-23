import Generic from "../../test/test-elements/Generic.js";

describe("Properties and attributes convert to each other", () => {
	it("Tests that properties with default values are initialized with the default value", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "defaultValueProp")
			.should("equal", "Hello");
	});

	it("Tests that prop-attr conversion works for string properties", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "strProp", "test1");

		cy.get("@testGeneric")
			.should("have.attr", "str-prop", "test1");

		cy.get("@testGeneric")
			.invoke("attr", "str-prop", "test2");

		cy.get("@testGeneric")
			.invoke("prop", "strProp")
			.should("equal", "test2");
	});

	it("Tests that prop-attr conversion works for boolean properties", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "boolProp", true);

		cy.get("@testGeneric")
			.should("have.attr", "bool-prop");

		cy.get("@testGeneric")
			.invoke("prop", "boolProp", false);

		cy.get("@testGeneric")
			.should("not.have.attr", "bool-prop");

		cy.get("@testGeneric")
			.invoke("attr", "bool-prop", true);

		cy.get("@testGeneric")
			.invoke("prop", "boolProp")
			.should("be.true");

		cy.get("@testGeneric")
			.invoke("removeAttr", "bool-prop");

		cy.get("@testGeneric")
			.invoke("prop", "boolProp")
			.should("be.false");
	});

	it("Tests that object properties have no attributes", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "objectProp", {});

		cy.get("@testGeneric")
			.should("not.have.attr", "object-prop");
	});

	it("Tests that array properties have no attributes when set programmatically", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "multiProp", ["a", "b"]);

		cy.get("@testGeneric")
			.should("not.have.attr", "multi-prop");

		cy.get("@testGeneric")
			.invoke("prop", "multiProp")
			.should("deep.equal", ["a", "b"]);
	});

	it("Tests that a declarative array attribute is parsed into the property and not removed by the framework", () => {
		// Mount with the attribute pre-set (declarative input)
		cy.mount(<Generic multi-prop='["x","y","z"]'></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		// The attribute author-set in markup must survive first render
		cy.get("@testGeneric")
			.should("have.attr", "multi-prop", '["x","y","z"]');

		// And it must be parsed into the property via fromAttribute
		cy.get("@testGeneric")
			.invoke("prop", "multiProp")
			.should("deep.equal", ["x", "y", "z"]);
	});

	it("Tests that a later setAttribute for an array property still flows into the property", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("attr", "multi-prop", '["one","two"]');

		cy.get("@testGeneric")
			.invoke("prop", "multiProp")
			.should("deep.equal", ["one", "two"]);

		// Programmatic write to the property must not touch the DOM attribute -
		// it stays at the author-set value even though it is now out of sync with the property.
		cy.get("@testGeneric")
			.invoke("prop", "multiProp", ["three"]);

		cy.get("@testGeneric")
			.should("have.attr", "multi-prop", '["one","two"]');

		cy.get("@testGeneric")
			.invoke("prop", "multiProp")
			.should("deep.equal", ["three"]);
	});

	it.skip("Tests that a declarative object attribute is parsed into the property and not removed by the framework", () => {
		cy.mount(<Generic object-prop='{"a":1,"b":"two"}'></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.should("have.attr", "object-prop", '{"a":1,"b":"two"}');

		cy.get("@testGeneric")
			.invoke("prop", "objectProp")
			.should("deep.equal", { a: 1, b: "two" });
	});

	it("Tests that noAttribute properties have no attributes", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "noAttributeProp", "some value");

		cy.get("@testGeneric")
			.should("not.have.attr", "no-attribute-prop");
	});

	it("Tests that properties with default values do automatically set attributes", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.should("have.attr", "default-value-prop", "Hello");
	});
});
