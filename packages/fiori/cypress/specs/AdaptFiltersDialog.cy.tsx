import AdaptFiltersDialog from "../../src/AdaptFiltersDialog.js";
import FilterBarItem from "../../src/FilterBarItem.js";
import FilterBar from "../../src/FilterBar.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";

describe("AdaptFiltersDialog - Opening and Closing", () => {
	it("should open the dialog when open property is set to true", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.invoke("prop", "open", true);

		cy.get("@dialog")
			.shadow()
			.find("[ui5-dialog]")
			.should("have.prop", "open", true);
	});

	it("should open dialog via show() method", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any).show();
			});

		cy.get("@dialog")
			.should("have.prop", "open", true);
	});

	it("should fire filters-dialog-open when show() is called", () => {
		cy.mount(
			<AdaptFiltersDialog onFiltersDialogOpen={cy.stub().as("openEvent")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.then($el => {
				($el[0] as any).show();
			});

		cy.get("@openEvent").should("be.called");
	});

	it("should close dialog via close() method", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any).close();
			});

		cy.get("@dialog")
			.should("have.prop", "open", false);
	});
});

describe("AdaptFiltersDialog - Rendering", () => {
	it("should render filter items in list view", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item:not(.ui5-adapt-filter-item-grouped)")
			.should("have.length", 2);
	});

	it("should render a hidden-in-filter-bar item in the dialog list", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age" hiddenInFilterBar={true}>
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		// hiddenInFilterBar affects the FilterBar, not the dialog list
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item:not(.ui5-adapt-filter-item-grouped)")
			.should("have.length", 2);
	});

	it("should render tabs for List and Groups views", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find("[ui5-tab]")
			.should("have.length", 2);
	});

	it("should render footer with OK, Filter, and Cancel buttons", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button]")
			.should("have.length", 3);
	});
});

describe("AdaptFiltersDialog - View Mode Switching", () => {
	it("should default to list view mode", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.should("have.prop", "viewMode", "list");
	});

	it("should switch to groups view when the groups tab is selected", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		// Drive the tab-select handler the TabContainer would fire on a real click
		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any)._handleTabSelect({ detail: { tabIndex: 1 } });
			});

		cy.get("@dialog")
			.should("have.prop", "viewMode", "groups");

		// Groups view renders group headers
		cy.get("@dialog")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.should("have.length.greaterThan", 0);
	});
});

describe("AdaptFiltersDialog - Events", () => {
	it("should fire filters-dialog-save with selectedFilters and visibilityMap when OK is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFiltersDialogSave={cy.stub().as("saveEvent")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button][design='Emphasized']")
			.realClick();

		cy.get("@saveEvent")
			.should("be.called")
			.its("firstCall.args.0.detail")
			.should("include.all.keys", "selectedFilters", "visibilityMap");
	});

	it("should fire filters-dialog-cancel when Cancel button is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFiltersDialogCancel={cy.stub().as("cancelEvent")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button]")
			.eq(2) // Cancel is the 3rd button
			.realClick();

		cy.get("@cancelEvent")
			.should("be.called")
			.its("firstCall.args.0.detail")
			.should("have.property", "escPressed", false);
	});

	it("should fire filters-dialog-close with trigger when OK is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFiltersDialogClose={cy.stub().as("closeEvent")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button][design='Emphasized']")
			.realClick();

		cy.get("@closeEvent")
			.should("be.called")
			.its("firstCall.args.0.detail.closeTrigger")
			.should("equal", "okButtonPressed");
	});

	it("should fire filter event when Filter button is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFilter={cy.stub().as("filterEvent")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button]")
			.eq(1) // Filter is the 2nd button
			.realClick();

		cy.get("@filterEvent")
			.should("be.called")
			.its("firstCall.args.0.detail")
			.should("include.all.keys", "selectedFilters", "visibilityMap");
	});

	it("should report filterButtonPressed as the close trigger for the Filter button", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFiltersDialogClose={cy.stub().as("closeEvent")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button]")
			.eq(1)
			.realClick();

		cy.get("@closeEvent")
			.should("be.called")
			.its("firstCall.args.0.detail.closeTrigger")
			.should("equal", "filterButtonPressed");
	});

	it("should close dialog after OK button is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button][design='Emphasized']")
			.realClick();

		cy.get("@dialog")
			.should("have.prop", "open", false);
	});
});

describe("AdaptFiltersDialog - Visibility Toggle", () => {
	it("should fire filters-dialog-selection-change when visibility is toggled", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFiltersDialogSelectionChange={cy.stub().as("selectionEvent")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.realClick();

		cy.get("@selectionEvent")
			.should("be.called")
			.its("firstCall.args.0.detail")
			.should("include.all.keys", "filter", "visible");
	});

	it("should toggle visibility icon when clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("have.attr", "icon", "show");

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.realClick();

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("have.attr", "icon", "hide");
	});
});

describe("AdaptFiltersDialog - Search Functionality", () => {
	it("should filter items based on search value", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="City" filterKey="city">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item:not(.ui5-adapt-filter-item-grouped)")
			.should("have.length", 3);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-search-input")
			.shadow()
			.find("input")
			.type("Name");

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item:not(.ui5-adapt-filter-item-grouped)")
			.should("have.length", 1);
	});

	it("should fire filters-dialog-search on input", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFiltersDialogSearch={cy.stub().as("searchEvent")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-search-input")
			.shadow()
			.find("input")
			.type("N");

		cy.get("@searchEvent").should("be.called");
	});
});

describe("AdaptFiltersDialog - Reset", () => {
	it("should not duplicate ui5-select options when restoring controls on cancel", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem label="Category" filterKey="category">
					<Select>
						<Option>Electronics</Option>
						<Option>Clothing</Option>
						<Option>Food</Option>
					</Select>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				const dialog = $el[0] as any;
				const optionCount = () => dialog.items[0].control[0].querySelectorAll("[ui5-option]").length;

				expect(optionCount(), "initial options").to.equal(3);

				// open → cancel twice; options must stay at 3 (no compounding duplication)
				dialog.show();
				dialog._handleCancel(false);
				expect(optionCount(), "after 1st cancel").to.equal(3);

				dialog.show();
				dialog._handleCancel(false);
				expect(optionCount(), "after 2nd cancel").to.equal(3);
			});
	});

	it("should not leak stale visibility keys across re-shows", () => {
		cy.mount(
			<AdaptFiltersDialog onFiltersDialogSave={cy.stub().as("save")}>
				<FilterBarItem label="A" filterKey="a">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="B" filterKey="b">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				const dialog = $el[0] as any;

				// First session establishes visibility for a + b
				dialog.show();
				dialog._handleOK();

				// Remove item "b" from the DOM, then reopen with only "a"
				dialog.items.find((i: any) => i.filterKey === "b").remove();
			});

		// wait for the slot to reflect the removal
		cy.get("@dialog")
			.its("0.items.length")
			.should("equal", 1);

		cy.get("@dialog")
			.then($el => {
				const dialog = $el[0] as any;
				dialog.show();
				dialog._handleOK();
			});

		// The stale "b" key must not appear in the emitted visibilityMap
		cy.get("@save")
			.its("lastCall.args.0.detail.visibilityMap")
			.then((map: any) => {
				expect(Object.keys(map), "visibilityMap keys").to.deep.equal(["a"]);
			});
	});

	it("should restore the item order to the open-time snapshot", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="City" filterKey="city">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		// Open via show() so the open-time order snapshot is captured
		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any).show(["name", "age", "city"]);
			});

		cy.get("@dialog")
			.should("have.prop", "open", true);

		// Simulate a reorder: move "city" to the front
		cy.get("@dialog")
			.then($el => {
				($el[0] as any)._itemOrder = ["city", "name", "age"];
			});

		cy.get("@dialog")
			.its("0._itemOrder")
			.should("deep.equal", ["city", "name", "age"]);

		// Reset should restore the open-time order
		cy.get("@dialog")
			.then($el => {
				($el[0] as any)._handleReset();
			});

		cy.get("@dialog")
			.its("0._itemOrder")
			.should("deep.equal", ["name", "age", "city"]);
	});

	it("should restore edit mode (not sort, not neutral) after Reset", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any).show(["name"]);
			});

		// Enter sort mode
		cy.get("@dialog")
			.then($el => {
				($el[0] as any)._handleSort();
			});

		cy.get("@dialog")
			.its("0._sortMode")
			.should("equal", true);

		// Reset
		cy.get("@dialog")
			.shadow()
			.find(".ui5-adapt-filters-header [ui5-button]")
			.realClick();

		// Back to edit mode: sort off, edit on
		cy.get("@dialog")
			.its("0._sortMode")
			.should("equal", false);

		cy.get("@dialog")
			.its("0._editMode")
			.should("equal", true);

		// The remove (decline) button is present; the drag handle is not
		cy.get("@dialog")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button][icon='decline']")
			.should("exist");

		cy.get("@dialog")
			.shadow()
			.find(".ui5-adapt-filter-drag-handle")
			.should("not.exist");
	});
});

describe("AdaptFiltersDialog - Groups View", () => {
	it("should render filters grouped by groupName", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem label="Name" filterKey="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Company" filterKey="company" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age" groupName="Advanced">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.should("have.length", 2);
	});

	it("should treat groupName 'default' as the ungrouped bucket", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem label="Name" filterKey="name" groupName="Advanced">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Ungrouped" filterKey="ungrouped">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		// "Advanced" group + the ungrouped bucket
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.should("have.length", 2);
	});

	it("should show Basic group first", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem label="Age" filterKey="age" groupName="Advanced" groupOrder={1}>
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Name" filterKey="name" groupName="Basic" groupOrder={0}>
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.first()
			.find(".ui5-adapt-filter-group-title")
			.should("contain.text", "Basic");
	});

	it("should expand/collapse groups when header is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem label="Name" filterKey="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item-grouped")
			.should("have.length", 1);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.first()
			.realClick();

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item-grouped")
			.should("have.length", 0);
	});
});

describe("AdaptFiltersDialog - Required Filters", () => {
	it("should disable visibility toggle for required filters without values", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Required Filter" filterKey="required" required={true}>
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("have.attr", "disabled");
	});

	it("should enable visibility toggle for required filters with values", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Required Filter" filterKey="required" required={true}>
					<Input value="SomeValue"></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("not.have.attr", "disabled");
	});
});

describe("AdaptFiltersDialog - Add Filters (edit mode)", () => {
	it("should show the add-filter row after show() enables edit mode", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem slot="availableFilters" label="Country" filterKey="country">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.then($el => {
				($el[0] as any).show();
			});

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-add-row")
			.should("exist");

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-add-combobox")
			.should("exist");
	});

	it("should not show the add-filter row in view mode (edit off)", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-add-row")
			.should("not.exist");
	});

	it("should offer an availableFilters item in the add combobox", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem slot="availableFilters" label="Country" filterKey="country">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.then($el => {
				($el[0] as any).show();
			});

		// The availableFilters item is offered for adding, and is NOT in the active list
		cy.get("[ui5-adapt-filters-dialog]")
			.its("0._availableFiltersToAdd")
			.should("have.length", 1);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-add-combobox")
			.first()
			.find("[ui5-cb-item]")
			.should("have.length", 1);
	});

	it("should make a removed item available to add again", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any).show();
			});

		// Nothing available to add yet
		cy.get("@dialog")
			.its("0._availableFiltersToAdd")
			.should("have.length", 0);

		// Stage "age" for removal (what the decline button does)
		cy.get("@dialog")
			.then($el => {
				const dialog = $el[0] as any;
				const age = dialog.items.find((i: any) => i.filterKey === "age");
				dialog._handleRemove(age);
			});

		// The removed item is now offered in the add list
		cy.get("@dialog")
			.its("0._availableFiltersToAdd")
			.should("have.length", 1);

		cy.get("@dialog")
			.its("0._availableFiltersToAdd.0.filterKey")
			.should("equal", "age");
	});

	it("should move a removed item out of the standard list and into the add pool on OK", () => {
		cy.mount(
			<AdaptFiltersDialog onFilterRemove={cy.stub().as("rm")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any).show();
			});

		// Remove "age" and confirm with OK
		cy.get("@dialog")
			.then($el => {
				const dialog = $el[0] as any;
				const age = dialog.items.find((i: any) => i.filterKey === "age");
				dialog._handleRemove(age);
				dialog._handleOK();
			});

		cy.get("@rm").should("be.called");

		// The removal is committed persistently by key
		cy.get("@dialog")
			.its("0._removedKeys")
			.should("include", "age");

		// Reopen: standard list no longer renders "age", but it's offered to add again
		cy.get("@dialog")
			.then($el => {
				($el[0] as any).show();
			});

		cy.get("@dialog")
			.then($el => {
				const dialog = $el[0] as any;
				const listKeys = dialog._filteredItems.map((i: any) => i.filterKey);
				expect(listKeys, "standard list").to.not.include("age");
				expect(listKeys, "standard list").to.include("name");
				expect(
					dialog._availableFiltersToAdd.map((i: any) => i.filterKey),
					"add pool"
				).to.include("age");
			});
	});

	it("should report a removed filter as not-visible in the save payload (not resurrect it)", () => {
		cy.mount(
			<AdaptFiltersDialog onFiltersDialogSave={cy.stub().as("save")}>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				const dialog = $el[0] as any;
				dialog.show();
				const age = dialog.items.find((i: any) => i.filterKey === "age");
				dialog._handleRemove(age);
				dialog._handleOK();
			});

		cy.get("@save")
			.should("be.called")
			.its("firstCall.args.0.detail")
			.then((detail: any) => {
				expect(detail.visibilityMap.age, "age in visibilityMap").to.equal(false);
				expect(
					detail.selectedFilters.map((f: any) => f.filterKey),
					"selectedFilters"
				).to.not.include("age");
			});
	});

	it("should keep a prior-session removal excluded from a later save", () => {
		cy.mount(
			<AdaptFiltersDialog onFiltersDialogSave={cy.stub().as("save")}>
				<FilterBarItem label="A" filterKey="a">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="B" filterKey="b">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		// Session 1: remove A, OK
		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				const dialog = $el[0] as any;
				dialog.show();
				dialog._handleRemove(dialog.items.find((i: any) => i.filterKey === "a"));
				dialog._handleOK();
			});

		// Session 2: remove B, OK — A must NOT come back
		cy.get("@dialog")
			.then($el => {
				const dialog = $el[0] as any;
				dialog.show();
				dialog._handleRemove(dialog.items.find((i: any) => i.filterKey === "b"));
				dialog._handleOK();
			});

		cy.get("@save")
			.its("lastCall.args.0.detail")
			.then((detail: any) => {
				const keys = detail.selectedFilters.map((f: any) => f.filterKey);
				expect(keys, "selectedFilters").to.not.include("a");
				expect(keys, "selectedFilters").to.not.include("b");
				expect(detail.visibilityMap.a, "a in visibilityMap").to.equal(false);
				expect(detail.visibilityMap.b, "b in visibilityMap").to.equal(false);
			});
	});

	it("should restore a committed-removed item to the list when re-added", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem label="Name" filterKey="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem label="Age" filterKey="age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				const dialog = $el[0] as any;
				dialog.show();
				const age = dialog.items.find((i: any) => i.filterKey === "age");
				dialog._handleRemove(age);
				dialog._handleOK();
			});

		cy.get("@dialog")
			.its("0._removedKeys")
			.should("include", "age");

		// Re-add "age" via the add handler
		cy.get("@dialog")
			.then($el => {
				const dialog = $el[0] as any;
				dialog.show();
				dialog._handleAddFilter({
					detail: { item: { getAttribute: () => "age" } },
					target: { value: "" },
				});
			});

		cy.get("@dialog")
			.then($el => {
				const dialog = $el[0] as any;
				expect(dialog._removedKeys, "removed keys").to.not.include("age");
				expect(
					dialog._filteredItems.map((i: any) => i.filterKey),
					"standard list"
				).to.include("age");
			});
	});
});

describe("AdaptFiltersDialog - FilterBar integration", () => {
	it("should read visibility from a linked FilterBar via show()", () => {
		cy.mount(
			<div>
				<FilterBar id="fb">
					<FilterBarItem label="Name" filterKey="name">
						<Input></Input>
					</FilterBarItem>
					<FilterBarItem label="Age" filterKey="age" hiddenInFilterBar={true}>
						<Input></Input>
					</FilterBarItem>
				</FilterBar>
				<AdaptFiltersDialog filterBar="fb">
					<FilterBarItem label="Name" filterKey="name">
						<Input></Input>
					</FilterBarItem>
					<FilterBarItem label="Age" filterKey="age">
						<Input></Input>
					</FilterBarItem>
				</AdaptFiltersDialog>
			</div>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.then($el => {
				($el[0] as any).show();
			});

		// Both items appear in the dialog list regardless of FilterBar visibility
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item:not(.ui5-adapt-filter-item-grouped)")
			.should("have.length", 2);
	});

	it("should sync a linked item whose filterKey contains CSS-special characters", () => {
		const trickyKey = 'a"b[c]';
		cy.mount(
			<div>
				<FilterBar id="fb2">
					<FilterBarItem label="Tricky" filterKey={trickyKey}>
						<Input value="from-bar"></Input>
					</FilterBarItem>
				</FilterBar>
				<AdaptFiltersDialog filterBar="fb2">
					<FilterBarItem label="Tricky" filterKey={trickyKey}>
						<Input></Input>
					</FilterBarItem>
				</AdaptFiltersDialog>
			</div>
		);

		// show() must not throw and must pull the bar's control value into the dialog item
		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any).show();
			});

		cy.get("@dialog")
			.then($el => {
				const dialog = $el[0] as any;
				const dlgInput = dialog.items[0].control[0];
				expect(dlgInput.value, "synced value").to.equal("from-bar");
			});
	});
});
