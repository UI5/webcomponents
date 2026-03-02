import { createReactComponent } from "@ui5/webcomponents-base";
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

  const handleClick = () => {
    vsdResults.innerHTML = "";
    vsd1.open = true;
  };

  const handleConfirm = () => {
    vsdResults.innerHTML = JSON.stringify(evt.detail);
  };

  return (
    <>
      <Button id="btnOpenDialog1">Open ViewSettingsDialog</Button>

        <ViewSettingsDialog id="vsd1" sort-descending={true}>
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
        <div id="vsdResults"></div>
    </>
  );
}

export default App;
