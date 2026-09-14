import Option from "../../src/Option.js";
import OptionGroup from "../../src/OptionGroup.js";
import Select from "../../src/Select.js";

describe("Select - OptionGroup rendering", () => {
	it("renders group headers with correct text", () => {
		cy.mount(
			<Select id="sel">
				<OptionGroup id="g1" headerText="Oceania">
					<Option value="au">Australia</Option>
					<Option value="nz">New Zealand</Option>
				</OptionGroup>
				<OptionGroup id="g2" headerText="Europe">
					<Option value="de">Germany</Option>
				</OptionGroup>
			</Select>
		);

		cy.get("#sel").realClick();
		cy.get("#g1").shadow().find(".ui5-option-group-header").should("have.text", "Oceania");
		cy.get("#g2").shadow().find(".ui5-option-group-header").should("have.text", "Europe");
	});

	it("renders group container with role=group and aria-label", () => {
		cy.mount(
			<Select id="sel">
				<OptionGroup id="g1" headerText="Oceania">
					<Option value="au">Australia</Option>
				</OptionGroup>
			</Select>
		);

		cy.get("#sel").realClick();
		cy.get("#g1").shadow().find(".ui5-option-group-root")
			.should("have.attr", "role", "group")
			.and("have.attr", "aria-label", "Oceania");
	});
});

describe("Select - OptionGroup selection", () => {
	it("selects option inside a group by value", () => {
		cy.mount(
			<Select id="sel" value="de">
				<OptionGroup headerText="Oceania">
					<Option id="au" value="au">Australia</Option>
				</OptionGroup>
				<OptionGroup headerText="Europe">
					<Option id="de" value="de">Germany</Option>
					<Option id="fr" value="fr">France</Option>
				</OptionGroup>
			</Select>
		);

		cy.get("#de").should("have.attr", "selected");
		cy.get("#au").should("not.have.attr", "selected");
	});

	it("selects option inside group via click", () => {
		cy.mount(
			<Select id="sel">
				<OptionGroup headerText="Oceania">
					<Option id="au" value="au">Australia</Option>
					<Option id="nz" value="nz">New Zealand</Option>
				</OptionGroup>
				<OptionGroup headerText="Europe">
					<Option id="de" value="de">Germany</Option>
				</OptionGroup>
			</Select>
		);

		cy.get("#sel").realClick();
		cy.get("#de").realClick();
		cy.get("#sel").should("have.prop", "value", "de");
	});

	it("fires change event when grouped option is selected", () => {
		const changeSpy = cy.stub().as("changeSpy");

		cy.mount(
			<Select id="sel" onChange={changeSpy}>
				<OptionGroup headerText="Europe">
					<Option id="de" value="de">Germany</Option>
					<Option id="fr" value="fr">France</Option>
				</OptionGroup>
			</Select>
		);

		cy.get("#sel").realClick();
		cy.get("#fr").realClick();
		cy.get("@changeSpy").should("have.been.calledOnce");
	});

	it("arrow navigation moves through options across groups", () => {
		cy.mount(
			<Select id="sel">
				<OptionGroup headerText="Oceania">
					<Option id="au" value="au" selected={true}>Australia</Option>
					<Option id="nz" value="nz">New Zealand</Option>
				</OptionGroup>
				<OptionGroup headerText="Europe">
					<Option id="de" value="de">Germany</Option>
				</OptionGroup>
			</Select>
		);

		cy.get("#sel").shadow().find("[data-sap-focus-ref]").realClick();
		cy.get("#sel").shadow().find("[data-sap-focus-ref]").realPress("ArrowDown");
		cy.get("#nz").should("have.attr", "selected");
		cy.get("#sel").shadow().find("[data-sap-focus-ref]").realPress("ArrowDown");
		cy.get("#de").should("have.attr", "selected");
	});
});

describe("Select - OptionGroup ARIA", () => {
	it("options inside groups have global aria-setsize and aria-posinset", () => {
		cy.mount(
			<Select id="sel">
				<OptionGroup headerText="Oceania">
					<Option id="au" value="au">Australia</Option>
					<Option id="nz" value="nz">New Zealand</Option>
				</OptionGroup>
				<OptionGroup headerText="Europe">
					<Option id="de" value="de">Germany</Option>
					<Option id="fr" value="fr">France</Option>
					<Option id="es" value="es">Spain</Option>
				</OptionGroup>
			</Select>
		);

		cy.get("#sel").realClick();

		// setsize = total options (5), posinset = global position
		cy.get("#au").shadow().find("[role='option']")
			.should("have.attr", "aria-setsize", "5")
			.and("have.attr", "aria-posinset", "1");
		cy.get("#nz").shadow().find("[role='option']")
			.should("have.attr", "aria-setsize", "5")
			.and("have.attr", "aria-posinset", "2");

		cy.get("#de").shadow().find("[role='option']")
			.should("have.attr", "aria-setsize", "5")
			.and("have.attr", "aria-posinset", "3");
		cy.get("#es").shadow().find("[role='option']")
			.should("have.attr", "aria-setsize", "5")
			.and("have.attr", "aria-posinset", "5");
	});

	it("trigger has aria-describedby pointing to group count message when groups present", () => {
		cy.mount(
			<Select id="sel">
				<OptionGroup headerText="Oceania">
					<Option value="au">Australia</Option>
				</OptionGroup>
			</Select>
		);

		cy.get("#sel").shadow().find("[role='combobox']").then($trigger => {
			const describedBy = $trigger.attr("aria-describedby");
			expect(describedBy).to.include("groupCountDesc");
		});
	});

	it("trigger has no aria-describedby group count message when no groups", () => {
		cy.mount(
			<Select id="sel">
				<Option value="a">Option A</Option>
				<Option value="b">Option B</Option>
			</Select>
		);

		cy.get("#sel").shadow().find("[role='combobox']").then($trigger => {
			const describedBy = $trigger.attr("aria-describedby") ?? "";
			expect(describedBy).not.to.include("groupCountDesc");
		});
	});

	it("group count hidden span has correct text", () => {
		cy.mount(
			<Select id="sel">
				<OptionGroup headerText="Oceania">
					<Option value="au">Australia</Option>
					<Option value="nz">New Zealand</Option>
				</OptionGroup>
				<OptionGroup headerText="Europe">
					<Option value="de">Germany</Option>
				</OptionGroup>
			</Select>
		);

		cy.get("#sel").shadow().find("[id$='groupCountDesc']")
			.should("contain.text", "3")
			.and("contain.text", "2");
	});
});
