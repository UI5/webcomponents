import Label from "../../../src/Label.js";
import Input from "../../../src/Input.js";
import List from "../../../src/List.js";

describe("AccessibilityTextsHelper", () => {
	it("Label-for tests", () => {
		cy.mount(
			<>
				<Input id="myInput" placeholder="input placeholder" class="field"></Input>
				<Label id="lblDesc1" for="myInput">Desc1</Label>
				<Label id="lblDesc2" for="myInput">Desc2</Label>
				<Label id="lblDesc3" for="myInput">Desc3</Label>
				<label id="lblDesc4" for="myInput">Desc4</label>
			</>
		);

		// assert
		cy.get("#myInput")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "Desc1 Desc2 Desc3 Desc4");

		// act
		cy.get("#lblDesc2")
			.invoke("attr", "for", "other");

		cy.get("#lblDesc3")
			.invoke("remove");

		// assert
		cy.get("#myInput")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "Desc1 Desc4");
	});

	it("Input accessibleNameRef Tests", () => {
		cy.mount(
			<>
				<Label id="lblEnterName1">FirstDesc</Label>
				<Label id="lblEnterName2">SecondDesc</Label>
				<Label id="lblEnterName3">ThirdDesc</Label>
				<Input id="inputEnterName" accessibleNameRef="lblEnterName1 lblEnterName3" placeholder="Enter your name"></Input>
			</>
		);

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "FirstDesc ThirdDesc");

		// act - update text of referenced label
		cy.get("#lblEnterName1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "First Label Desc ThirdDesc");

		// act - update accessible-name-ref
		cy.get("#inputEnterName")
			.invoke("attr", "accessible-name-ref", "lblEnterName3 lblEnterName1");

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "ThirdDesc First Label Desc");

		// act - update accessible-name-ref
		cy.get("#inputEnterName")
			.invoke("attr", "accessible-name-ref", "lblEnterName2");

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "SecondDesc");
	});

	it("Input accessibleName and accessibleNameRef Tests", () => {
		cy.mount(
			<>
				<Label id="lblEnterDesc1" for="inputEnterDesc">Label for inputEnterDesc</Label>
				<Label id="lblEnterDesc3">Label to be added/removed as accessible-name-ref</Label>
				<Input id="inputEnterDesc" accessibleName="Some description added by accessibleName" placeholder="Enter description"></Input>
			</>
		);

		const INITIAL_ACCESSIBLE_NAME = "Some description added by accessibleName";
		const UPDATED_ACCESSIBLE_NAME = "Another description added by accessibleName";
		const ACCESSIBLE_NAME_REF = "lblEnterDesc3";
		const ACCESSIBLE_NAME_REF_TEXT = "Label to be added/removed as accessible-name-ref";

		cy.get("#inputEnterDesc")
			.shadow()
			.find("input")
			.as("input");

		// assert
		cy.get("@input")
			.should("have.attr", "aria-label", INITIAL_ACCESSIBLE_NAME);

		cy.get("#inputEnterDesc")
			.invoke("attr", "accessible-name", UPDATED_ACCESSIBLE_NAME);

		// assert
		cy.get("@input")
			.should("have.attr", "aria-label", UPDATED_ACCESSIBLE_NAME);

		// act - remove acccessible-name
		cy.get("#inputEnterDesc")
			.invoke("removeAttr", "accessible-name");

		// assert - aria-label fallbacks to use the label's for, pointing to this input
		cy.get("@input")
			.should("have.attr", "aria-label", "Label for inputEnterDesc");

		// act - add acccessible-name-ref
		cy.get("#inputEnterDesc")
			.invoke("attr", "accessible-name-ref", ACCESSIBLE_NAME_REF);

		// assert - the text of the elment labelled with accessible-name-ref is used
		cy.get("@input")
			.should("have.attr", "aria-label", ACCESSIBLE_NAME_REF_TEXT);

		// act - add acccessible-name once again
		cy.get("#inputEnterDesc")
			.invoke("attr", "accessible-name", INITIAL_ACCESSIBLE_NAME);

		// assert - the text of the elment labelled with accessible-name-ref is still used
		cy.get("@input")
			.should("have.attr", "aria-label", ACCESSIBLE_NAME_REF_TEXT);

		// act - remove acccessible-name-ref
		cy.get("#inputEnterDesc")
			.invoke("removeAttr", "accessible-name-ref");

		// assert - after acccessible-name-ref is removed, fallbacks to use acccessible-name
		cy.get("@input")
			.should("have.attr", "aria-label", INITIAL_ACCESSIBLE_NAME);

		// act - remove acccessible-name
		cy.get("#inputEnterDesc")
			.invoke("removeAttr", "accessible-name");

		// assert - aria-label fallbacks to use the label's for, pointing to this input
		cy.get("@input")
			.should("have.attr", "aria-label", "Label for inputEnterDesc");

		// act - remove ui5-label's for
		cy.get("#lblEnterDesc1")
			.invoke("removeAttr", "for");

		// assert - aria-label is undefined
		cy.get("@input")
			.should("not.have.attr", "aria-label");
	});

	it("Three inputs with same label accessibleNameRef Tests", () => {
		cy.mount(
			<>
				<Label id="lblTestDesc" for="testInput1">Label for testInput1 Desc</Label>
				<Input id="testInput1" placeholder="Enter description1"></Input>
				<Input id="testInput2" accessibleNameRef="lblTestDesc" accessibleName="Hello" placeholder="Enter description2"></Input>
				<Input id="testInput3" accessibleNameRef="lblTestDesc" placeholder="Enter description3"></Input>
			</>
		);

		const LBL_TEXT_CONTENT = "Label for testInput1 Desc";
		const LBL_TEXT_CONTENT_UPDATED = "Another description for testing";

		cy.get("#testInput1")
			.shadow()
			.find("input")
			.as("input1");

		cy.get("#testInput2")
			.shadow()
			.find("input")
			.as("input2");

		cy.get("#testInput3")
			.shadow()
			.find("input")
			.as("input3");

		// assert
		cy.get("@input1")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT);

		cy.get("@input2")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT);

		cy.get("@input3")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT);

		// act

		cy.get("#lblTestDesc")
			.then($el => {
				$el.get(0).innerHTML = LBL_TEXT_CONTENT_UPDATED;
			});

		// assert
		cy.get("@input1")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT_UPDATED);

		cy.get("@input2")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT_UPDATED);

		cy.get("@input3")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT_UPDATED);

		// act - remove "for" attribute
		cy.get("#lblTestDesc")
			.invoke("removeAttr", "for");

		// assert - aria-label is undefined
		cy.get("@input1")
			.should("not.have.attr", "aria-label");

		// act - remove accessible-name-ref
		cy.get("#testInput2")
			.invoke("removeAttr", "accessible-name-ref");

		// assert - aria-label is the existing accessible-name
		cy.get("@input2")
			.should("have.attr", "aria-label", "Hello");

		// act - remove accessible-name-ref
		cy.get("#testInput3")
			.invoke("removeAttr", "accessible-name-ref");

		// assert - shouldn't be any aria-label
		cy.get("@input3")
			.should("not.have.attr", "aria-label");
	});

	it("Input accessibleDescriptionRef Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Label id="lblDesc3">ThirdDesc</Label>
				<Input id="inputDescRef" accessibleDescriptionRef="lblDesc1 lblDesc3"></Input>
			</>
		);

		// assert
		cy.get("#inputDescRef")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc ThirdDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert
		cy.get("#inputDescRef")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc ThirdDesc");

		// act - update accessible-description-ref
		cy.get("#inputDescRef")
			.invoke("attr", "accessible-description-ref", "lblDesc2");

		// assert
		cy.get("#inputDescRef")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "SecondDesc");

		// act - update accessible-description-ref
		cy.get("#inputDescRef")
			.invoke("attr", "accessible-description-ref", "lblDesc3");

		// assert
		cy.get("#inputDescRef")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "ThirdDesc");

		// act - remove accessible-description-ref
		cy.get("#inputDescRef")
			.invoke("removeAttr", "accessible-description-ref");

		// assert
		cy.get("#inputDescRef")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("Input accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Input id="inputDesc" accessibleDescription="Some description added by accessibleDescription"></Input>
			</>
		);
		// assert
		cy.get("#inputDesc")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - update accessible-description
		cy.get("#inputDesc")
			.invoke("attr", "accessible-description", "Some description added by accessibleDescription");

		// assert
		cy.get("#inputDesc")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#inputDesc")
			.invoke("removeAttr", "accessible-description");

		// assert
		cy.get("#inputDesc")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	// both
	it("Input accessibleDescriptionRef and accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Input id="inputDesc" accessibleDescriptionRef="lblDesc1" accessibleDescription="Some description added by accessibleDescription"></Input>
			</>
		);

		// assert - accessibleDescription is used
		cy.get("#inputDesc")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert - accessibleDescriptionRef is used
		cy.get("#inputDesc")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc");

		// act - remove accessible-description-ref
		cy.get("#inputDesc")
			.invoke("removeAttr", "accessible-description-ref");

		// assert - accessibleDescription is used
		cy.get("#inputDesc")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#inputDesc")
			.invoke("removeAttr", "accessible-description");

		// assert - accessibleDescriptionRef is used
		cy.get("#inputDesc")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("Tests generic html elements with for attribute", () => {
		cy.mount(
			<>
				<label id="elId1" for="myInput2">Desc1</label>
				<label id="elId2" for="myInput2">Desc2</label>
				<Input id="myInput2" placeholder="input placeholder"></Input>
				<label id="elId3" for="myInput2">Desc3</label>
				<label id="elId4" for="myInput2">Desc4</label>
				<label id="elId5" for="myInput2">Desc5</label>
			</>
		);

		cy.get("#myInput2")
			.shadow()
			.find("input")
			.as("input");

		// assert
		cy.get("@input")
			.should("have.attr", "aria-label", "Desc1 Desc2 Desc3 Desc4 Desc5");

		// act
		cy.get("#elId1")
			.then($el => {
				$el.get(0).innerHTML = `${$el.get(0).innerHTML}X`;
			});

		cy.get("#elId2")
			.invoke("remove");

		cy.get("#elId3")
			.invoke("attr", "for", "other");

		cy.get("#elId4")
			.then($el => {
				$el.get(0).innerHTML = `${$el.get(0).innerHTML}X`;
			});

		cy.get("#elId5")
			.invoke("removeAttr", "for");

		// assert
		cy.get("@input")
			.should("have.attr", "aria-label", "Desc1X Desc4X");
	});

	it("Tests accessibleDescription and accessibleDescriptionRef with ui5-list", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">Desc1</Label>
				<Label id="lblDesc2">Desc2</Label>
				<List id="list" accessibleDescriptionRef="lblDesc1 lblDesc2" accessibleDescription="Desc3"></List>
			</>
		);

		cy.get("#list")
			.shadow()
			.find("ul")
			.as("list");

		// assert
		cy.get("@list")
			.should("have.attr", "aria-description", "Desc1 Desc2");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = `${$el.get(0).innerHTML}X`;
			});

		// assert
		cy.get("@list")
			.should("have.attr", "aria-description", "Desc1X Desc2");

		// act - update accessible-description-ref
		cy.get("#list")
			.invoke("removeAttr", "accessible-description-ref");

		// assert
		cy.get("@list")
			.should("have.attr", "aria-description", "Desc3");
	});
});
