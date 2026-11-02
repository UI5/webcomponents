import FilterBarItem from "../../src/FilterBarItem.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import DatePicker from "@ui5/webcomponents/dist/DatePicker.js";

describe("FilterBarItem - Rendering", () => {
	it("should render the FilterBarItem component", () => {
		cy.mount(
			<FilterBarItem label="Name">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("exist");
	});

	it("should render the label string", () => {
		cy.mount(
			<FilterBarItem label="Test Label">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.shadow()
			.find(".ui5-filterbar-item-label")
			.should("contain.text", "Test Label");
	});

	it("should render control slot content", () => {
		cy.mount(
			<FilterBarItem label="Name">
				<Input placeholder="Enter name"></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item] [ui5-input]")
			.should("exist")
			.should("have.attr", "placeholder", "Enter name");
	});

	it("should render with Select control", () => {
		cy.mount(
			<FilterBarItem label="Country">
				<Select>
					<Option>USA</Option>
					<Option>Germany</Option>
				</Select>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item] [ui5-select]")
			.should("exist");
	});

	it("should render with DatePicker control", () => {
		cy.mount(
			<FilterBarItem label="Date">
				<DatePicker></DatePicker>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item] [ui5-date-picker]")
			.should("exist");
	});
});

describe("FilterBarItem - Properties", () => {
	it("should have label property", () => {
		cy.mount(
			<FilterBarItem label="Filter Name">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "label", "Filter Name");
	});

	it("should have default property values", () => {
		cy.mount(
			<FilterBarItem label="Name">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "hidden", false)
			.and("have.prop", "hiddenInFilterBar", false)
			.and("have.prop", "required", false)
			.and("have.prop", "active", false)
			.and("have.prop", "groupName", "default");
	});

	it("should have groupName property", () => {
		cy.mount(
			<FilterBarItem label="Name" groupName="Basic">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "groupName", "Basic");
	});

	it("should have groupOrder property", () => {
		cy.mount(
			<FilterBarItem label="Name" groupOrder={5}>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "groupOrder", 5);
	});

	it("should have hidden property set to true", () => {
		cy.mount(
			<FilterBarItem label="Name" hidden={true}>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "hidden", true);
	});

	it("should have hiddenInFilterBar property set to true", () => {
		cy.mount(
			<FilterBarItem label="Name" hiddenInFilterBar={true}>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "hiddenInFilterBar", true);
	});

	it("should have required property set to true", () => {
		cy.mount(
			<FilterBarItem label="Name" required={true}>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "required", true);
	});

	it("should reflect filterKey to the filter-key attribute", () => {
		cy.mount(
			<FilterBarItem label="Name" filterKey="filter-name">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.attr", "filter-key", "filter-name");
	});
});

describe("FilterBarItem - effectiveText getter", () => {
	it("should return the label property", () => {
		cy.mount(
			<FilterBarItem label="My Filter">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "effectiveText", "My Filter");
	});

	it("should return empty string when label is not set", () => {
		cy.mount(
			<FilterBarItem>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "effectiveText", "");
	});
});

describe("FilterBarItem - labelTooltip", () => {
	it("should expose labelTooltip as the label's title", () => {
		cy.mount(
			<FilterBarItem label="Name" labelTooltip="The person's name">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.shadow()
			.find(".ui5-filterbar-item-label")
			.should("have.attr", "title", "The person's name");
	});

	it("should fall back to label when labelTooltip is not set", () => {
		cy.mount(
			<FilterBarItem label="Name">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.shadow()
			.find(".ui5-filterbar-item-label")
			.should("have.attr", "title", "Name");
	});
});

describe("FilterBarItem - effectiveKey getter", () => {
	it("should return filterKey property when set", () => {
		cy.mount(
			<FilterBarItem filterKey="my-key" label="My Filter">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.invoke("prop", "effectiveKey")
			.should("equal", "my-key");
	});

	it("should fall back to the internal id when filterKey is not set", () => {
		cy.mount(
			<FilterBarItem label="My Filter">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.invoke("prop", "effectiveKey")
			.should("be.a", "string")
			.and("have.length.greaterThan", 0);
	});
});

describe("FilterBarItem - Dynamic Property Updates", () => {
	it("should update hidden property dynamically", () => {
		cy.mount(
			<FilterBarItem label="Name" hidden={false}>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.as("item")
			.should("have.prop", "hidden", false);

		cy.get("@item")
			.invoke("prop", "hidden", true);

		cy.get("@item")
			.should("have.prop", "hidden", true);
	});

	it("should update label property dynamically", () => {
		cy.mount(
			<FilterBarItem label="Initial Text">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.as("item")
			.should("have.prop", "label", "Initial Text");

		cy.get("@item")
			.invoke("prop", "label", "Updated Text");

		cy.get("@item")
			.shadow()
			.find(".ui5-filterbar-item-label")
			.should("contain.text", "Updated Text");
	});

	it("should update groupName property dynamically", () => {
		cy.mount(
			<FilterBarItem label="Name" groupName="Basic">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.as("item")
			.should("have.prop", "groupName", "Basic");

		cy.get("@item")
			.invoke("prop", "groupName", "Advanced");

		cy.get("@item")
			.should("have.prop", "groupName", "Advanced");
	});
});
