import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import FilterItemClass from "@ui5/webcomponents-fiori/dist/FilterItem.js";
import FilterItemOptionClass from "@ui5/webcomponents-fiori/dist/FilterItemOption.js";
import SortItemClass from "@ui5/webcomponents-fiori/dist/SortItem.js";
import ViewSettingsDialogClass from "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const FilterItem = createReactComponent(FilterItemClass);
const FilterItemOption = createReactComponent(FilterItemOptionClass);
const SortItem = createReactComponent(SortItemClass);
const ViewSettingsDialog = createReactComponent(ViewSettingsDialogClass);
const Button = createReactComponent(ButtonClass);

function App() {
  const vsd1Ref = useRef(null);
  const vsdResultsRef = useRef(null);

  const handleBtnOpenDialog1Click = () => {
    vsdResultsRef.current.innerHTML = "";
    vsd1Ref.current.open = true;
  };

  const handleVsd1Confirm = (evt) => {
    vsdResultsRef.current.innerHTML = JSON.stringify(evt.detail);
  };

  return (
    <>
      <Button id="btnOpenDialog1" onClick={handleBtnOpenDialog1Click}>Open ViewSettingsDialog</Button>

        <ViewSettingsDialog ref={vsd1Ref} id="vsd1" sort-descending={true} onConfirm={handleVsd1Confirm}>
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
            <ui5-group-item slot="groupItems" text="Name" selected=""></ui5-group-item>
            <ui5-group-item slot="groupItems" text="Position"></ui5-group-item>
            <ui5-group-item slot="groupItems" text="Company"></ui5-group-item>
            <ui5-group-item slot="groupItems" text="Department"></ui5-group-item>
            <ui5-group-item slot="groupItems" text="(Not Grouped)"></ui5-group-item>
        </ViewSettingsDialog>
        <br />
        <br />
        <div ref={vsdResultsRef} id="vsdResults"></div>
    </>
  );
}

export default App;
