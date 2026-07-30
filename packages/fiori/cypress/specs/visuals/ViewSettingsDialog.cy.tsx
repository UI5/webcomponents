import ViewSettingsDialog from "../../../src/ViewSettingsDialog.js";
import ViewSettingsDialogCustomTab from "../../../src/ViewSettingsDialogCustomTab.js";
import SortItem from "../../../src/SortItem.js";
import FilterItem from "../../../src/FilterItem.js";
import FilterItemOption from "../../../src/FilterItemOption.js";
import GroupItem from "../../../src/GroupItem.js";
import actionSettings from "@ui5/webcomponents-icons/dist/action-settings.js";
import tableView from "@ui5/webcomponents-icons/dist/table-view.js";

const openDialog = (id: string) => {
	cy.get(`[ui5-view-settings-dialog]#${id}`).invoke("prop", "open", true);
	cy.get(`[ui5-view-settings-dialog]#${id}`)
		.shadow()
		.find("[ui5-dialog]")
		.ui5DialogOpened();
};

describe("ViewSettingsDialog visual", () => {
	it("sort-only — initial state", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name" selected />
				<SortItem slot="sortItems" text="Position" />
				<SortItem slot="sortItems" text="Date" />
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("sort-only — descending pre-selected", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" sortDescending>
				<SortItem slot="sortItems" text="Name" selected />
				<SortItem slot="sortItems" text="Position" />
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("filter-only — category list (step 1)", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<FilterItem slot="filterItems" text="Category">
					<FilterItemOption slot="values" text="Electronics" />
					<FilterItemOption slot="values" text="Clothing" />
					<FilterItemOption slot="values" text="Books" />
				</FilterItem>
				<FilterItem slot="filterItems" text="Status">
					<FilterItemOption slot="values" text="Active" />
					<FilterItemOption slot="values" text="Inactive" />
				</FilterItem>
				<FilterItem slot="filterItems" text="Region">
					<FilterItemOption slot="values" text="EMEA" />
					<FilterItemOption slot="values" text="Americas" />
				</FilterItem>
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("filter-only — options list (step 2, back button visible)", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<FilterItem slot="filterItems" text="Category">
					<FilterItemOption slot="values" text="Electronics" />
					<FilterItemOption slot="values" text="Clothing" selected />
					<FilterItemOption slot="values" text="Books" />
				</FilterItem>
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		// drill into the filter category
		cy.get("[ui5-view-settings-dialog]#vsd")
			.shadow()
			.find("[ui5-li]")
			.first()
			.shadow()
			.find("span[part=title]")
			.realClick();
		cy.screenshot();
	});

	it("group-only — initial state", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<GroupItem slot="groupItems" text="Department" selected />
				<GroupItem slot="groupItems" text="Location" />
				<GroupItem slot="groupItems" text="(No Group)" />
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("group-only — descending pre-selected", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" groupDescending>
				<GroupItem slot="groupItems" text="Department" selected />
				<GroupItem slot="groupItems" text="Location" />
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("sort + filter + group — segmented button with all three tabs", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name" selected />
				<SortItem slot="sortItems" text="Date" />
				<FilterItem slot="filterItems" text="Status">
					<FilterItemOption slot="values" text="Active" />
					<FilterItemOption slot="values" text="Inactive" />
				</FilterItem>
				<GroupItem slot="groupItems" text="Department" />
				<GroupItem slot="groupItems" text="Region" />
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("sort + filter + group — filter tab active", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name" selected />
				<FilterItem slot="filterItems" text="Status">
					<FilterItemOption slot="values" text="Active" />
					<FilterItemOption slot="values" text="Inactive" />
				</FilterItem>
				<GroupItem slot="groupItems" text="Department" />
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		// click the Filter tab in the segmented button
		cy.get("[ui5-view-settings-dialog]#vsd")
			.shadow()
			.find("[ui5-segmented-button-item][data-mode=Filter]")
			.realClick();
		cy.screenshot();
	});

	it("sort + filter + group — group tab active", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name" selected />
				<FilterItem slot="filterItems" text="Status">
					<FilterItemOption slot="values" text="Active" />
				</FilterItem>
				<GroupItem slot="groupItems" text="Department" selected />
				<GroupItem slot="groupItems" text="Region" />
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		// click the Group tab
		cy.get("[ui5-view-settings-dialog]#vsd")
			.shadow()
			.find("[ui5-segmented-button-item][data-mode=Group]")
			.realClick();
		cy.screenshot();
	});

	it("filter with additionalText showing selection count", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<FilterItem slot="filterItems" text="Category" additionalText="2">
					<FilterItemOption slot="values" text="Electronics" selected />
					<FilterItemOption slot="values" text="Clothing" selected />
					<FilterItemOption slot="values" text="Books" />
				</FilterItem>
				<FilterItem slot="filterItems" text="Status" additionalText="1">
					<FilterItemOption slot="values" text="Active" selected />
					<FilterItemOption slot="values" text="Inactive" />
				</FilterItem>
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("reset button — enabled via resetEnabled prop", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" resetEnabled>
				<SortItem slot="sortItems" text="Name" selected />
				<SortItem slot="sortItems" text="Date" />
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("custom tabs only", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<ViewSettingsDialogCustomTab
					slot="customTabs"
					titleText="General Settings"
					tooltip="General"
					icon={actionSettings}
				>
					<div style={{ padding: "1rem" }}>General settings content</div>
				</ViewSettingsDialogCustomTab>
				<ViewSettingsDialogCustomTab
					slot="customTabs"
					titleText="Metrics Panel"
					tooltip="Metrics"
					icon={tableView}
				>
					<div style={{ padding: "1rem" }}>Metrics content</div>
				</ViewSettingsDialogCustomTab>
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("custom tab — second tab active", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<ViewSettingsDialogCustomTab
					slot="customTabs"
					titleText="General Settings"
					tooltip="General"
					icon={actionSettings}
				>
					<div style={{ padding: "1rem" }}>General settings content</div>
				</ViewSettingsDialogCustomTab>
				<ViewSettingsDialogCustomTab
					slot="customTabs"
					titleText="Metrics Panel"
					tooltip="Metrics"
					icon={tableView}
				>
					<div style={{ padding: "1rem" }}>Metrics content</div>
				</ViewSettingsDialogCustomTab>
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.get("[ui5-view-settings-dialog]#vsd")
			.shadow()
			.find("[ui5-segmented-button-item]")
			.eq(1)
			.realClick();
		cy.screenshot();
	});

	it("built-in tabs + custom tabs — all tabs in segmented button", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd">
				<SortItem slot="sortItems" text="Name" selected />
				<FilterItem slot="filterItems" text="Status">
					<FilterItemOption slot="values" text="Active" />
				</FilterItem>
				<GroupItem slot="groupItems" text="Department" />
				<ViewSettingsDialogCustomTab
					slot="customTabs"
					titleText="Advanced"
					tooltip="Advanced"
					icon={actionSettings}
				>
					<div style={{ padding: "1rem" }}>Advanced content</div>
				</ViewSettingsDialogCustomTab>
			</ViewSettingsDialog>,
		);
		openDialog("vsd");
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ViewSettingsDialog id="vsd">
					<SortItem slot="sortItems" text="Name" selected />
					<SortItem slot="sortItems" text="Date" />
					<FilterItem slot="filterItems" text="Status">
						<FilterItemOption slot="values" text="Active" />
						<FilterItemOption slot="values" text="Inactive" />
					</FilterItem>
					<GroupItem slot="groupItems" text="Department" />
				</ViewSettingsDialog>
			</div>,
		);
		openDialog("vsd");
		cy.screenshot();
	});
});
