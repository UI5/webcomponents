import Icon from "../../../src/Icon.js";
import addEquipment from "@ui5/webcomponents-icons/dist/add-equipment.js";
import save from "@ui5/webcomponents-icons/dist/save.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import add from "@ui5/webcomponents-icons/dist/add.js";

describe("Icon visual", () => {
	it("basic state — SVG icon", () => {
		cy.mount(
			<Icon name={addEquipment} />
		);
		cy.screenshot();
	});

	it("interactive mode", () => {
		cy.mount(
			<Icon name={addEquipment} mode="Interactive" />
		);
		cy.screenshot();
	});

	it("interactive mode — focused", () => {
		cy.mount(
			<Icon name={addEquipment} mode="Interactive" />
		);
		cy.get("[ui5-icon]").shadow().find(".ui5-icon-root").focus();
		cy.screenshot();
	});

	it("image mode with accessible name", () => {
		cy.mount(
			<Icon name={save} mode="Image" accessibleName="Save document" />
		);
		cy.screenshot();
	});

	it("with tooltip", () => {
		cy.mount(
			<Icon name={save} showTooltip />
		);
		cy.screenshot();
	});

	it("custom size via style", () => {
		cy.mount(
			<div>
				<Icon name={addEquipment} style={{ width: "1rem", height: "1rem" }} />
				<Icon name={addEquipment} style={{ width: "2rem", height: "2rem" }} />
				<Icon name={addEquipment} style={{ width: "3rem", height: "3rem" }} />
			</div>
		);
		cy.screenshot();
	});

	it("fontIcon slot — basic", () => {
		cy.mount(
			<Icon>
				<span slot="fontIcon">★</span>
			</Icon>
		);
		cy.screenshot();
	});

	it("fontIcon slot — interactive mode", () => {
		cy.mount(
			<Icon mode="Interactive" accessibleName="Add">
				<span slot="fontIcon">＋</span>
			</Icon>
		);
		cy.screenshot();
	});

	it("fontIcon slot — interactive mode focused", () => {
		cy.mount(
			<Icon mode="Interactive" accessibleName="Add">
				<span slot="fontIcon">＋</span>
			</Icon>
		);
		cy.get("[ui5-icon]").shadow().find("span.ui5-icon-root").focus();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Icon name={addEquipment} />
				<Icon name={addEquipment} mode="Interactive" />
			</div>
		);
		cy.screenshot();
	});
});
