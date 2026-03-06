import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useRef, useState } from "react";
import FilterItemClass from "@ui5/webcomponents-fiori/dist/FilterItem.js";
import FilterItemOptionClass from "@ui5/webcomponents-fiori/dist/FilterItemOption.js";
import SortItemClass from "@ui5/webcomponents-fiori/dist/SortItem.js";
import ViewSettingsDialogClass from "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ListItemGroupClass from "@ui5/webcomponents/dist/ListItemGroup.js";

const FilterItem = createComponent(FilterItemClass);
const FilterItemOption = createComponent(FilterItemOptionClass);
const SortItem = createComponent(SortItemClass);
const ViewSettingsDialog = createComponent(ViewSettingsDialogClass);
const Button = createComponent(ButtonClass);
const ListItemGroup = createComponent(ListItemGroupClass);

function App() {
  const [vsdOpen, setVsdOpen] = useState(false);
  const vsdResultsRef = useRef(null);

  const handleBtnOpenDialog1Click = () => {
    vsdResultsRef.current!.innerHTML = "";
    setVsdOpen(true);
  };

  const handleVsd1Confirm = (evt) => {
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
        <ListItemGroup
          slot="groupItems"
          text="Name"
          selected=""
        ></ListItemGroup>
        <ListItemGroup slot="groupItems" text="Position"></ListItemGroup>
        <ListItemGroup slot="groupItems" text="Company"></ListItemGroup>
        <ListItemGroup slot="groupItems" text="Department"></ListItemGroup>
        <ListItemGroup slot="groupItems" text="(Not Grouped)"></ListItemGroup>
      </ViewSettingsDialog>
      <br />
      <br />
      <div ref={vsdResultsRef} id="vsdResults"></div>
    </>
  );
}

export default App;
