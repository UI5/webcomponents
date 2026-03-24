import ViewSettingsDialog from "../../src/ViewSettingsDialog.js";
import GroupItem from "../../src/GroupItem.js";
import SortItem from "../../src/SortItem.js";
import FilterItem from "../../src/FilterItem.js";
import FilterItemOption from "../../src/FilterItemOption.js";
import ViewSettingsDialogCustomTab from "../../src/ViewSettingsDialogCustomTab.js";

describe("View settings dialog - confirm event", () => {
	it("should throw confirm event after selecting sort options and confirm button", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" onConfirm={cy.stub().as("confirm")}>
				<SortItem slot="sortItems" text="Name" selected={true}></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
			</ViewSettingsDialog>
		);

		// Open the dialog and wait until it's visible
		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");

		// There should be 4 list items in the dialog - Ascending, Descending, Name, Position
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.should("have.length", 4);

		// Click the TEXT of the 4th item (Position)
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(3)
			.shadow()
			.find("span[part=title]") // we click the text itself first
			.realClick();

		// Click the OK button of the dialog
		cy.get("@vsd")
			.shadow()
			.find("ui5-button[design=Emphasized]")
			.realClick();

		// Check if the confirm event was fired with sortBy = "Position"
		cy.get("@confirm")
			.should("be.called")
			.its("firstCall.args.0.detail.sortBy")
			.should("equal", "Position");

		// Wait until the dialog is closed
		cy.get("@vsd")
			.shadow()
			.find("[ui5-dialog]")
			.should("not.be.visible");

		// Open the dialog again and wait until it's visible
		cy.get("@vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");

		// Click the RADIO BUTTON of the 3th item (Name) instead of the text this time
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(2)
			.shadow()
			.find("[ui5-radio-button]")
			.realClick();

		// Click the OK button of the dialog again
		cy.get("@vsd")
			.shadow()
			.find("ui5-button[design=Emphasized]")
			.realClick();

		// Check if the confirm event was fired for a second time, now with sortBy = "Name"
		cy.get("@confirm")
			.should("be.called")
			.its("secondCall.args.0.detail.sortBy")
			.should("equal", "Name");
	});

	it("should throw confirm event after selecting filter options and confirm button", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" onConfirm={cy.stub().as("confirm")}>
				<FilterItem slot="filterItems" text="Filter 1">
					<FilterItemOption slot="values" text="Some filter 1"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 2"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 3"></FilterItemOption>
				</FilterItem>
				<FilterItem slot="filterItems" text="Filter 2">
					<FilterItemOption slot="values" text="Some filter 4"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 5"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 6"></FilterItemOption>
				</FilterItem>
			</ViewSettingsDialog>
		);

		// Open the dialog and wait until it's visible
		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true)
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");

		// There should be 2 list items in the dialog - Filter 1 and Filter 2
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.should("have.length", 2);

		// Click the "Filter 1" item
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(0)
			.shadow()
			.find("span[part=title]")
			.realClick();

		// There should be 3 list items in the dialog - Some filter 1, Some filter 2, Some filter 3
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.should("have.length", 3);

		// Click on the text of the first list item (Some filter 1)
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(0)
			.shadow()
			.find("span[part=title]")
			.realClick();

		// Click on the checkbox of the third list item (Some filter 3)
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(2)
			.shadow()
			.find("[ui5-checkbox]")
			.realClick();

		// Click the OK button of the dialog
		cy.get("@vsd")
			.shadow()
			.find("ui5-button[design=Emphasized]")
			.realClick();

		// Check if the confirm event was fired with: filters = [{"Filter 1":["Some filter 1","Some filter 3"]}]
		cy.get("@confirm")
			.should("be.called")
			.its("firstCall.args.0.detail.filters")
			.should("deep.equal", [{ "Filter 1": ["Some filter 1", "Some filter 3"] }]);

		// Wait until the dialog is closed
		cy.get("@vsd")
			.shadow()
			.find("[ui5-dialog]")
			.should("not.be.visible");
	});

	it("should throw confirm event after selecting group options and confirm button", () => {
		cy.mount(
			<ViewSettingsDialog onConfirm={cy.stub().as("confirm")}>
				<GroupItem slot="groupItems" text="Name"></GroupItem>
				<GroupItem slot="groupItems" text="Position"></GroupItem>
				<GroupItem slot="groupItems" text="(No Group)"></GroupItem>
			</ViewSettingsDialog>
		);

		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[group-order] ui5-li")
			.as("groupOrderItems");

		cy.get("@groupOrderItems")
			.should("have.length", 2);

		// Select the group order (Descending)
		cy.get("@groupOrderItems")
			.eq(1)
			.realClick();

		cy.get("@vsd")
			.shadow()
			.find("[group-by] ui5-li")
			.as("groupByItems");

		cy.get("@groupByItems")
			.should("have.length", 3);

		// Select the group by (No Group)
		cy.get("@groupByItems")
			.eq(2)
			.realClick();

		// Confirm the selection
		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-footer ui5-button")
			.realClick();

		 // Check the confirm event for groupOrder and groupBy
		 cy.get("@confirm")
			.should("be.calledWithMatch", {
				detail: {
					groupOrder: "Descending",
					groupBy: "(No Group)",
				},
			});
	});
});

describe("ViewSettingsDialog Tests", () => {
	it("should open the ViewSettingsDialog and verify initial state", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name"></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
				<SortItem slot="sortItems" text="Company"></SortItem>
				<SortItem slot="sortItems" text="Department"></SortItem>
			</ViewSettingsDialog>
		);

		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find("[root-element='true']")
			.first()
			.should("have.attr", "aria-label", "View Settings");

		cy.get("@vsd")
			.shadow()
			.find("ui5-list ui5-li[selected]")
			.should("exist")
			.should("contain.text", "Ascending");

		cy.get("@vsd")
			.shadow()
			.find("[sort-by] ui5-li[selected]")
			.should("not.exist");

		cy.get("@vsd")
			.invoke("prop", "open", false);
	});

	it("should change sortOrder and confirm selection", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name"></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
				<SortItem slot="sortItems" text="Company"></SortItem>
				<SortItem slot="sortItems" text="Department"></SortItem>
			</ViewSettingsDialog>
		);

		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("ui5-list ui5-li")
			.eq(1)
			.realClick();

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-footer ui5-button")
			.realClick();

		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("ui5-list ui5-li[selected]")
			.should("contain.text", "Descending");

		cy.get("@vsd")
			.invoke("prop", "open", false);
	});

	it("should change sortBy selection and verify persistence", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name"></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
				<SortItem slot="sortItems" text="Company"></SortItem>
				<SortItem slot="sortItems" text="Department"></SortItem>
			</ViewSettingsDialog>
		);

		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[sort-by] ui5-li")
			.realClick();

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-footer ui5-button")
			.realClick();

		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[sort-by] ui5-li[selected]")
			.should("contain.text", "Name");

		cy.get("@vsd")
			.invoke("prop", "open", false);
	});

	it("should reset settings to initial values", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name"></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
				<SortItem slot="sortItems" text="Company"></SortItem>
				<SortItem slot="sortItems" text="Department"></SortItem>
			</ViewSettingsDialog>
		);

		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-header ui5-button")
			.realClick();

		cy.get("@vsd")
			.shadow()
			.find("ui5-list ui5-li[selected]")
			.should("contain.text", "Ascending");

		cy.get("@vsd")
			.shadow()
			.find("[sort-by] ui5-li[selected]")
			.should("not.exist");

		cy.get("@vsd")
			.invoke("prop", "open", false);
	});

	it("should handle filter-only mode", () => {
		cy.mount(
			<ViewSettingsDialog id="vsdFilter">
				<FilterItem slot="filterItems" text="Filter 1">
					<FilterItemOption slot="values" text="Some filter 1"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 2"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 3"></FilterItemOption>
				</FilterItem>
				<FilterItem slot="filterItems" text="Filter 2">
					<FilterItemOption slot="values" text="Some filter 4"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 5"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 6"></FilterItemOption>
				</FilterItem>
			</ViewSettingsDialog>
		);

		cy.get("#vsdFilter")
			.as("vsd");

		cy.get("@vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-segmented-button]")
			.should("not.exist");

		cy.get("@vsd")
			.invoke("prop", "open", false);
	});

	it("should handle sort-only mode", () => {
		cy.mount(
			<ViewSettingsDialog id="vsdSort">
				<SortItem slot="sortItems" text="Name"></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
				<SortItem slot="sortItems" text="Company"></SortItem>
				<SortItem slot="sortItems" text="Department"></SortItem>
			</ViewSettingsDialog>
		);

		cy.get("#vsdSort")
			.as("vsd");

		cy.get("@vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-segmented-button]")
			.should("not.exist");

		cy.get("@vsd")
			.invoke("prop", "open", false);
	});

	it("should handle group-only mode", () => {
		cy.mount(
			<ViewSettingsDialog id="vsdGroup">
				<GroupItem slot="groupItems" text="Name"></GroupItem>
				<GroupItem slot="groupItems" text="Position"></GroupItem>
				<GroupItem slot="groupItems" text="Company"></GroupItem>
				<GroupItem slot="groupItems" text="Department"></GroupItem>
			</ViewSettingsDialog>
		);

		cy.get("#vsdGroup")
			.as("vsd");

		cy.get("@vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-segmented-button]")
			.should("not.exist");

		cy.get("@vsd")
			.invoke("prop", "open", false);
	});

	it("should show a split button with all loaded VSD options", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name"></SortItem>
				<FilterItem slot="filterItems" text="Filter 1">
					<FilterItemOption slot="values" text="Some filter 1"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 2"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 3"></FilterItemOption>
				</FilterItem>
				<GroupItem slot="groupItems" text="Name"></GroupItem>
			</ViewSettingsDialog>
		);

		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get("@segmentedButton")
			.should("be.visible");

		cy.get("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.as("items");

		cy.get("@items")
			.should("have.length", 3);
	});

	it("should render custom tabs after built-in tabs", () => {
		cy.mount(
			<ViewSettingsDialog id="vsdCustomOrder">
				<SortItem slot="sortItems" text="Name"></SortItem>
				<FilterItem slot="filterItems" text="Category">
					<FilterItemOption slot="values" text="A"></FilterItemOption>
				</FilterItem>
				<GroupItem slot="groupItems" text="Department"></GroupItem>
				<ViewSettingsDialogCustomTab slot="customTabs" title="Advanced Settings" tooltip="Advanced" icon="action-settings">
					<div id="advanced-tab-content">Advanced settings</div>
				</ViewSettingsDialogCustomTab>
				<ViewSettingsDialogCustomTab slot="customTabs" title="Metrics Panel" tooltip="Metrics" icon="table-view">
					<div id="metrics-tab-content">Metrics settings</div>
				</ViewSettingsDialogCustomTab>
			</ViewSettingsDialog>
		);

		cy.get("#vsdCustomOrder")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-segmented-button-item]")
			.as("items")
			.should("have.length", 5);

		cy.get("@items")
			.eq(0)
			.should("have.attr", "data-mode", "Sort");

		cy.get("@items")
			.eq(1)
			.should("have.attr", "data-mode", "Filter");

		cy.get("@items")
			.eq(2)
			.should("have.attr", "data-mode", "Group");

		cy.get("@items")
			.eq(3)
			.invoke("attr", "data-mode")
			.should("match", /^customTabs-\d+$/);

		cy.get("@items")
			.eq(3)
			.should("have.attr", "tooltip", "Advanced");

		cy.get("@items")
			.eq(4)
			.invoke("attr", "data-mode")
			.should("match", /^customTabs-\d+$/);

		cy.get("@items")
			.eq(3)
			.realClick();

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-title")
			.should("have.text", "View Settings");

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-custom-tab-title")
			.should("have.text", "Advanced Settings");

		cy.get("@vsd")
			.find("#advanced-tab-content")
			.should("be.visible");
	});

	it("should render only custom tabs when no built-in tabs are provided", () => {
		cy.mount(
			<ViewSettingsDialog id="vsdCustomOnly">
				<ViewSettingsDialogCustomTab slot="customTabs" title="General Settings" tooltip="General" icon="action-settings">
					<div id="general-tab-content">General content</div>
				</ViewSettingsDialogCustomTab>
				<ViewSettingsDialogCustomTab slot="customTabs" title="Extra Settings" tooltip="Extra" icon="table-view">
					<div id="extra-tab-content">Extra content</div>
				</ViewSettingsDialogCustomTab>
			</ViewSettingsDialog>
		);

		cy.get("#vsdCustomOnly")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-segmented-button-item]")
			.should("have.length", 2);

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-title")
			.should("have.text", "View Settings");

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-custom-tab-title")
			.should("have.text", "General Settings");

		cy.get("@vsd")
			.find("#general-tab-content")
			.should("be.visible");

		cy.get("@vsd")
			.shadow()
			.find("[ui5-segmented-button-item]")
			.eq(1)
			.realClick();

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-custom-tab-title")
			.should("have.text", "Extra Settings");
	});

	it("should keep Reset button disabled by default when settings are initial", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name"></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
			</ViewSettingsDialog>
		);

		cy.get("#vsd")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-header ui5-button")
			.should("have.attr", "disabled");
	});

	it("should keep Reset button always enabled when enableReset is set", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" enableReset={true}>
				<SortItem slot="sortItems" text="Name"></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
			</ViewSettingsDialog>
		);

		cy.get("#vsd")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-header ui5-button")
			.should("not.have.attr", "disabled");
	});

	it("should fire reset-click event when Reset button is clicked", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" enableReset={true} onResetClick={cy.stub().as("resetClick")}>
				<SortItem slot="sortItems" text="Name"></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
			</ViewSettingsDialog>
		);

		cy.get("#vsd")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-header ui5-button")
			.should("not.have.attr", "disabled");

		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-header ui5-button")
			.realClick();

		cy.get("@resetClick")
			.should("have.been.calledOnce");
	});

	it("should reset built-in settings and fire reset-click when Reset is clicked", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" enableReset={true} onResetClick={cy.stub().as("resetClick")}>
				<SortItem slot="sortItems" text="Name"></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
			</ViewSettingsDialog>
		);

		cy.get("#vsd")
			.as("vsd")
			.invoke("prop", "open", true);

		// Change sort order to Descending
		cy.get("@vsd")
			.shadow()
			.find("[sort-order] ui5-li")
			.eq(1)
			.realClick();

		// Verify Descending is selected
		cy.get("@vsd")
			.shadow()
			.find("[sort-order] ui5-li")
			.eq(1)
			.should("have.attr", "selected");

		// Click Reset
		cy.get("@vsd")
			.shadow()
			.find(".ui5-vsd-header ui5-button")
			.realClick();

		// Verify Ascending is selected again
		cy.get("@vsd")
			.shadow()
			.find("[sort-order] ui5-li")
			.eq(0)
			.should("have.attr", "selected");

		cy.get("@resetClick")
			.should("have.been.calledOnce");
	});
});
