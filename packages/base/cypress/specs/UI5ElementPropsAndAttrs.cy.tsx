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

	it("Tests that array properties have attributes", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "multiProp", ["a", "b"]);

		cy.get("@testGeneric")
			.should("have.attr", "multi-prop", '["a","b"]');
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
