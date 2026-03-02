import { createReactComponent } from "@ui5/webcomponents-base";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import SearchItemClass from "@ui5/webcomponents-fiori/dist/SearchItem.js";
import SearchItemGroupClass from "@ui5/webcomponents-fiori/dist/SearchItemGroup.js";
import SearchMessageAreaClass from "@ui5/webcomponents-fiori/dist/SearchMessageArea.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Search = createReactComponent(SearchClass);
const SearchItem = createReactComponent(SearchItemClass);
const SearchItemGroup = createReactComponent(SearchItemGroupClass);
const SearchMessageArea = createReactComponent(SearchMessageAreaClass);
const Label = createReactComponent(LabelClass);

function App() {

  const handleUi5Click = (e) => {
    expandHiddenItems({ focusFirst: e.detail.fromKeyboard
  };

  return (
    <>
      <Label>Search with Grouped Suggestions and Show More (N) Item</Label>
        <Search id="searchShowMore" show-clear-icon={true} placeholder="Placeholder">
            <SearchMessageArea slot="messageArea" description="You can try the following" text="Oh, there are no results" />
            <SearchItemGroup id="group1" header-text="Group Header" />
    		<SearchItemGroup id="group2" header-text="Group Header">
    			<SearchItem text="List Item" icon="history"  />
    			<SearchItem text="List Item" icon="history"  />
    			<SearchItem text="List Item" icon="globe"  />
            </SearchItemGroup>
        </Search>
    </>
  );
}

export default App;
