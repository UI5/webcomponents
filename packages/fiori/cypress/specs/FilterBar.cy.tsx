import FilterBar from "../../src/FilterBar.js";
import FilterBarItem from "../../src/FilterBarItem.js";
import Input from "@ui5/webcomponents/dist/Input.js";
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
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
			</FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-item")
			.should("have.length", 2);
	});

	it("should not render items that are hidden or hiddenInFilterBar", () => {
		cy.mount(
			<FilterBar>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age" hiddenInFilterBar={true}>
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="City" filterKey="city" hidden={true}>
					<Input></Input>
				</FilterBarItem>
			</FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-item")
			.should("have.length", 1);
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

	it("should apply filterContainerWidth as a CSS variable", () => {
		cy.mount(<FilterBar filterContainerWidth="20rem"></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-root")
			.should("have.css", "--_ui5-filterbar-item-width", "20rem");
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

	it("should hide Go button when showGoOnFB is false", () => {
		cy.mount(<FilterBar showGoOnFB={false}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Emphasized']")
			.should("not.exist");
	});

	it("should show the filter-configuration button by default", () => {
		cy.mount(<FilterBar></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Transparent']")
			.should("exist");
	});

	it("should hide the filter-configuration button when hideFilterConfiguration is true", () => {
		cy.mount(<FilterBar hideFilterConfiguration={true} showGoOnFB={false}></FilterBar>);

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

	it("should show Reset button when showResetButton is true", () => {
		cy.mount(<FilterBar showResetButton={true}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button]")
			.should("have.length", 3); // Go, Reset, Filters
	});

	it("should hide the whole toolbar when hideToolbar is true", () => {
		cy.mount(<FilterBar hideToolbar={true}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons")
			.should("not.exist");
	});
});

describe("FilterBar - Active filters count", () => {
	it("should show the derived count of visible items in the Filters button", () => {
		cy.mount(
			<FilterBar>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="City" filterKey="city" hiddenInFilterBar={true}>
					<Input></Input>
				</FilterBarItem>
			</FilterBar>
		);

		// 2 of 3 items are shown in the bar
		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Transparent']")
			.should("contain.text", "(2)");
	});

	it("should use the activeFiltersCount override when set", () => {
		cy.mount(
			<FilterBar activeFiltersCount={7}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Transparent']")
			.should("contain.text", "(7)");
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

	it("should fire 'toggle-filters' event when the Filters button is clicked", () => {
		cy.mount(<FilterBar onToggleFilters={cy.stub().as("toggleEvent")}></FilterBar>);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Transparent']")
			.realClick();

		cy.get("@toggleEvent").should("be.called");
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

	it("should fire 'reset' event when Reset button is clicked", () => {
		cy.mount(
			<FilterBar
				showResetButton={true}
				onReset={cy.stub().as("resetEvent")}
			></FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Transparent']")
			.first()
			.realClick();

		cy.get("@resetEvent").should("be.called");
	});
});

describe("FilterBar - Properties", () => {
	it("should have default property values", () => {
		cy.mount(<FilterBar></FilterBar>);

		cy.get("[ui5-filterbar]")
			.as("filterbar")
			.should("have.prop", "showBasicSearch", false)
			.and("have.prop", "showGoOnFB", true)
			.and("have.prop", "hideFilterConfiguration", false)
			.and("have.prop", "showRestoreOnFB", false)
			.and("have.prop", "showClearOnFB", false)
			.and("have.prop", "showResetButton", false)
			.and("have.prop", "filterContainerWidth", "13.125rem");
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
			.invoke("prop", "showGoOnFB", false);

		cy.get("@filterbar")
			.shadow()
			.find(".ui5-filterbar-buttons [ui5-button][design='Emphasized']")
			.should("not.exist");
	});
});

describe("FilterBar - Search slot", () => {
	it("should render a projected search control instead of the internal input", () => {
		cy.mount(
			<FilterBar showBasicSearch={true}>
				<Input slot="search" placeholder="custom search"></Input>
			</FilterBar>
		);

		cy.get("[ui5-filterbar]")
			.shadow()
			.find(".ui5-filterbar-basic-search slot[name='search']")
			.should("exist");
	});
});
