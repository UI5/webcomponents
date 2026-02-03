import FilterBar from "../../src/FilterBar.js";
import FilterBarItem from "../../src/FilterBarItem.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";

describe("FilterBar - Rendering", () => {
	it("should render the FilterBar component", () => {
		cy.mount(<FilterBar></FilterBar>);

		cy.get("[ui5-filterbar]")
			.should("exist")
			.shadow()
			.find(".ui5-filterbar-root")
			.should("exist");
	});

	it("should render filter items correctly", () => {
		cy.mount(
			<FilterBar>
				<FilterBarItem>
					<Label slot="label">Name</Label>
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem>
					<Label slot="label">Age</Label>
					<Input></Input>
				</FilterBarItem>
			</FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-item")
			.should("have.length", 2);
	});

	it("should render basic search field when showBasicSearch is true", () => {
		cy.mount(<FilterBar showBasicSearch={true}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-basic-search")
			.should("exist")
			.find("[ui5-input]")
			.should("exist");
	});

	it("should not render basic search field when showBasicSearch is false", () => {
		cy.mount(<FilterBar showBasicSearch={false}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-basic-search")
			.should("not.exist");
	});
});

describe("FilterBar - Button Visibility", () => {
	it("should show Go button by default", () => {
		cy.mount(<FilterBar></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Emphasized']")
			.should("exist");
	});

	it("should hide Go button when hideGoOnFB is true", () => {
		cy.mount(<FilterBar hideGoOnFB={true}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Emphasized']")
			.should("not.exist");
	});

	it("should show Filters button by default", () => {
		cy.mount(<FilterBar></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Transparent']")
			.should("exist");
	});

	it("should hide Filters button when hideFiltersOnFB is true", () => {
		cy.mount(<FilterBar hideFiltersOnFB={true} hideGoOnFB={true}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button]")
			.should("not.exist");
	});

	it("should show Restore button when showRestoreOnFB is true", () => {
		cy.mount(<FilterBar showRestoreOnFB={true}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button]")
			.should("have.length", 3); // Go, Restore, Filters
	});

	it("should show Clear button when showClearOnFB is true", () => {
		cy.mount(<FilterBar showClearOnFB={true}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button]")
			.should("have.length", 3); // Go, Clear, Filters
	});

	it("should show all buttons when all are enabled", () => {
		cy.mount(
			<FilterBar
				showClearOnFB={true}
				showRestoreOnFB={true}
			></FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button]")
			.should("have.length", 4); // Go, Clear, Restore, Filters
	});
});

describe("FilterBar - Events", () => {
	it("should fire 'go' event when Go button is clicked", () => {
		cy.mount(<FilterBar onGo={cy.stub().as("goEvent")}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Emphasized']")
			.realClick();

		cy.get("@goEvent").should("be.called");
	});

	it("should fire 'filters-press' event when Filters button is clicked", () => {
		cy.mount(<FilterBar onFiltersPress={cy.stub().as("filtersEvent")}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Transparent']")
			.realClick();

		cy.get("@filtersEvent").should("be.called");
	});

	it("should fire 'restore' event when Restore button is clicked", () => {
		cy.mount(
			<FilterBar
				showRestoreOnFB={true}
				onRestore={cy.stub().as("restoreEvent")}
			></FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Transparent']")
			.first()
			.realClick();

		cy.get("@restoreEvent").should("be.called");
	});

	it("should fire 'clear' event when Clear button is clicked", () => {
		cy.mount(
			<FilterBar
				showClearOnFB={true}
				onClear={cy.stub().as("clearEvent")}
			></FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Transparent']")
			.first()
			.realClick();

		cy.get("@clearEvent").should("be.called");
	});
});

describe("FilterBar - Properties", () => {
	it("should have default property values", () => {
		cy.mount(<FilterBar></FilterBar>);

		cy.get("[ui5-filterbar]")
			.as("filterbar")
			.should("have.prop", "showBasicSearch", false)
			.and("have.prop", "hideGoOnFB", false)
			.and("have.prop", "hideFiltersOnFB", false)
			.and("have.prop", "showRestoreOnFB", false)
			.and("have.prop", "showClearOnFB", false);
	});

	it("should update properties dynamically", () => {
		cy.mount(<FilterBar></FilterBar>);

		cy.get("[ui5-filterbar]")
			.as("filterbar")
			.invoke("prop", "showBasicSearch", true);

		cy.get("@filterbar")
			.shadow()
			.find(".ui5-filterbar-basic-search")
			.should("exist");

		cy.get("@filterbar")
			.invoke("prop", "hideGoOnFB", true);

		cy.get("@filterbar")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Emphasized']")
			.should("not.exist");
	});
});

describe("FilterBar - Filter Items Slot", () => {
	it("should render FilterBarItem with label and control", () => {
		cy.mount(
			<FilterBar>
				<FilterBarItem>
					<Label slot="label">Country</Label>
					<Select>
						<Option>USA</Option>
						<Option>Germany</Option>
					</Select>
				</FilterBarItem>
			</FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-item")
			.should("have.length", 1);

		cy.get("[ui5-filterbar-item]")
			.should("exist");
	});

	it("should render multiple filter items in order", () => {
		cy.mount(
			<FilterBar>
				<FilterBarItem key="name">
					<Label slot="label">Name</Label>
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem key="age">
					<Label slot="label">Age</Label>
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem key="city">
					<Label slot="label">City</Label>
					<Input></Input>
				</FilterBarItem>
			</FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-item")
			.should("have.length", 3);
	});
});
