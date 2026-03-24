import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useRef, useState } from "react";
import FilterItemClass from "@ui5/webcomponents-fiori/dist/FilterItem.js";
import FilterItemOptionClass from "@ui5/webcomponents-fiori/dist/FilterItemOption.js";
import GroupItemClass from "@ui5/webcomponents-fiori/dist/GroupItem.js";
import SortItemClass from "@ui5/webcomponents-fiori/dist/SortItem.js";
import ViewSettingsDialogClass from "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const FilterItem = createReactComponent(FilterItemClass);
const FilterItemOption = createReactComponent(FilterItemOptionClass);
const SortItem = createReactComponent(SortItemClass);
const ViewSettingsDialog = createReactComponent(ViewSettingsDialogClass);
const Button = createReactComponent(ButtonClass);
const GroupItem = createReactComponent(GroupItemClass);

export const Example = () => {
  const [vsdOpen, setVsdOpen] = useState(false);
  const vsdResultsRef = useRef(null);

  const handleBtnOpenDialog1Click = () => {
    vsdResultsRef.current!.innerHTML = "";
    setVsdOpen(true);
  };

  const handleVsd1Confirm = (evt: CustomEvent) => {
    vsdResultsRef.current!.innerHTML = JSON.stringify(evt.detail);
  };

  return (
    <>
      <Button id="btnOpenDialog1" onClick={handleBtnOpenDialog1Click}>
        Open ViewSettingsDialog
      </Button>

      <ViewSettingsDialog
        open={vsdOpen}
        id="vsd1"
        sortDescending={true}
        onConfirm={handleVsd1Confirm}
        onClose={() => setVsdOpen(false)}
      >
        <SortItem slot="sortItems" text="Name" selected={true} />
        <SortItem slot="sortItems" text="Position" />
        <SortItem slot="sortItems" text="Company" />
        <SortItem slot="sortItems" text="Department" />
        <FilterItem slot="filterItems" text="Position">
          <FilterItemOption slot="values" text="CTO" />
          <FilterItemOption slot="values" text="CPO" />
          <FilterItemOption slot="values" text="VP" />
        </FilterItem>
        <FilterItem slot="filterItems" text="Department">
          <FilterItemOption slot="values" text="Sales" />
          <FilterItemOption slot="values" text="Management" />
          <FilterItemOption slot="values" text="PR" />
        </FilterItem>
        <FilterItem slot="filterItems" text="Location">
          <FilterItemOption slot="values" text="Walldorf" />
          <FilterItemOption slot="values" text="New York" />
          <FilterItemOption slot="values" text="London" />
        </FilterItem>
        <FilterItem slot="filterItems" text="Reports to">
          <FilterItemOption slot="values" text="CTO" />
          <FilterItemOption slot="values" text="CPO" />
          <FilterItemOption slot="values" text="VP" />
        </FilterItem>
        <GroupItem
          slot="groupItems"
          text="Name"
          selected={true}
        ></GroupItem>
        <GroupItem slot="groupItems" text="Position"></GroupItem>
        <GroupItem slot="groupItems" text="Company"></GroupItem>
        <GroupItem slot="groupItems" text="Department"></GroupItem>
        <GroupItem slot="groupItems" text="(Not Grouped)"></GroupItem>
      </ViewSettingsDialog>
      <br />
      <br />
      <div ref={vsdResultsRef} id="vsdResults"></div>
    </>
  );
}
