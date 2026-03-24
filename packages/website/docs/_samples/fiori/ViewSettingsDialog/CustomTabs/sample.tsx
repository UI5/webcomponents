import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useState } from "react";
import SortItemClass from "@ui5/webcomponents-fiori/dist/SortItem.js";
import ViewSettingsDialogClass from "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";
import ViewSettingsDialogCustomTabClass from "@ui5/webcomponents-fiori/dist/ViewSettingsDialogCustomTab.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";

const SortItem = createComponent(SortItemClass);
const ViewSettingsDialog = createComponent(ViewSettingsDialogClass);
const ViewSettingsDialogCustomTab = createComponent(ViewSettingsDialogCustomTabClass);
const Button = createComponent(ButtonClass);
const Switch = createComponent(SwitchClass);
const SegmentedButton = createComponent(SegmentedButtonClass);
const SegmentedButtonItem = createComponent(SegmentedButtonItemClass);
const StepInput = createComponent(StepInputClass);

function App() {
	const [vsdOpen, setVsdOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setVsdOpen(true)}>Open ViewSettingsDialog with Custom Tabs</Button>

			<ViewSettingsDialog open={vsdOpen} enableReset={true} onClose={() => setVsdOpen(false)}>
				<SortItem slot="sortItems" text="Name" selected={true} />
				<SortItem slot="sortItems" text="Position" />
				<SortItem slot="sortItems" text="Company" />

				<ViewSettingsDialogCustomTab slot="customTabs" title="Preferences" tooltip="Preferences" icon="action-settings">
					<div style={{ padding: "0.75rem", display: "grid", gap: "0.75rem" }}>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
							<span>Compact mode</span>
							<Switch />
						</div>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
							<span>Live updates</span>
							<Switch checked={true} />
						</div>
					</div>
				</ViewSettingsDialogCustomTab>

				<ViewSettingsDialogCustomTab slot="customTabs" title="Display" tooltip="Display" icon="palette">
					<div style={{ padding: "0.75rem", display: "grid", gap: "0.75rem" }}>
						<SegmentedButton>
							<SegmentedButtonItem selected={true}>List</SegmentedButtonItem>
							<SegmentedButtonItem>Grid</SegmentedButtonItem>
						</SegmentedButton>
						<StepInput min={10} max={100} value={25} />
					</div>
				</ViewSettingsDialogCustomTab>
			</ViewSettingsDialog>
		</>
	);
}

export default App;
