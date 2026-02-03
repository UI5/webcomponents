import FilterBarItem from "../../src/FilterBarItem.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import DatePicker from "@ui5/webcomponents/dist/DatePicker.js";

describe("FilterBarItem - Rendering", () => {
	it("should render the FilterBarItem component", () => {
		cy.mount(
			<FilterBarItem>
				<Label slot="label">Name</Label>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("exist");
	});

	it("should render label slot content", () => {
		cy.mount(
			<FilterBarItem>
				<Label slot="label">Test Label</Label>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item] [ui5-label]")
			.should("contain.text", "Test Label");
	});

	it("should render control slot content", () => {
		cy.mount(
			<FilterBarItem>
				<Label slot="label">Name</Label>
				<Input placeholder="Enter name"></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item] [ui5-input]")
			.should("exist")
			.should("have.attr", "placeholder", "Enter name");
	});

	it("should render with Select control", () => {
		cy.mount(
			<FilterBarItem>
				<Label slot="label">Country</Label>
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
			<FilterBarItem>
				<Label slot="label">Date</Label>
				<DatePicker></DatePicker>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item] [ui5-date-picker]")
			.should("exist");
	});
});

describe("FilterBarItem - Properties", () => {
	it("should have text property", () => {
		cy.mount(
			<FilterBarItem text="Filter Name">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "text", "Filter Name");
	});

	it("should have groupName property", () => {
		cy.mount(
			<FilterBarItem groupName="Basic">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "groupName", "Basic");
	});

	it("should have groupOrder property", () => {
		cy.mount(
			<FilterBarItem groupOrder={5}>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "groupOrder", 5);
	});

	it("should have visible property defaulting to true", () => {
		cy.mount(
			<FilterBarItem>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "visible", true);
	});

	it("should have visible property set to false", () => {
		cy.mount(
			<FilterBarItem visible={false}>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "visible", false);
	});

	it("should have required property defaulting to false", () => {
		cy.mount(
			<FilterBarItem>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "required", false);
	});

	it("should have required property set to true", () => {
		cy.mount(
			<FilterBarItem required={true}>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "required", true);
	});

	it("should have key property", () => {
		cy.mount(
			<FilterBarItem key="filter-name">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.attr", "key", "filter-name");
	});

	it("should have additionalText property", () => {
		cy.mount(
			<FilterBarItem additionalText="=value1 × =value2 ×">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "additionalText", "=value1 × =value2 ×");
	});
});

describe("FilterBarItem - effectiveText getter", () => {
	it("should return text property when set", () => {
		cy.mount(
			<FilterBarItem text="My Filter">
				<Label slot="label">Label Text</Label>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "effectiveText", "My Filter");
	});

	it("should return label text when text property is not set", () => {
		cy.mount(
			<FilterBarItem>
				<Label slot="label">Label Text</Label>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "effectiveText", "Label Text");
	});

	it("should return empty string when neither text nor label is set", () => {
		cy.mount(
			<FilterBarItem>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.should("have.prop", "effectiveText", "");
	});
});

describe("FilterBarItem - effectiveKey getter", () => {
	it("should return key property when set", () => {
		cy.mount(
			<FilterBarItem key="my-key" text="My Filter">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.invoke("prop", "effectiveKey")
			.should("equal", "my-key");
	});

	it("should generate key from text when key property is not set", () => {
		cy.mount(
			<FilterBarItem text="My Filter Name">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.invoke("prop", "effectiveKey")
			.should("equal", "my-filter-name");
	});
});

describe("FilterBarItem - Multiple Controls", () => {
	it("should handle Input control", () => {
		cy.mount(
			<FilterBarItem text="Name">
				<Input value="Test Value"></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item] [ui5-input]")
			.should("have.prop", "value", "Test Value");
	});

	it("should handle Select control", () => {
		cy.mount(
			<FilterBarItem text="Country">
				<Select>
					<Option value="us">USA</Option>
					<Option value="de" selected>Germany</Option>
				</Select>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item] [ui5-select]")
			.should("exist");
	});

	it("should handle DatePicker control", () => {
		cy.mount(
			<FilterBarItem text="Date">
				<DatePicker value="2024-01-15"></DatePicker>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item] [ui5-date-picker]")
			.should("have.prop", "value", "2024-01-15");
	});
});

describe("FilterBarItem - Dynamic Property Updates", () => {
	it("should update visible property dynamically", () => {
		cy.mount(
			<FilterBarItem visible={true}>
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.as("item")
			.should("have.prop", "visible", true);

		cy.get("@item")
			.invoke("prop", "visible", false);

		cy.get("@item")
			.should("have.prop", "visible", false);
	});

	it("should update text property dynamically", () => {
		cy.mount(
			<FilterBarItem text="Initial Text">
				<Input></Input>
			</FilterBarItem>
		);

		cy.get("[ui5-filterbar-item]")
			.as("item")
			.should("have.prop", "text", "Initial Text");

		cy.get("@item")
			.invoke("prop", "text", "Updated Text");

		cy.get("@item")
			.should("have.prop", "text", "Updated Text");
	});

	it("should update groupName property dynamically", () => {
		cy.mount(
			<FilterBarItem groupName="Basic">
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
