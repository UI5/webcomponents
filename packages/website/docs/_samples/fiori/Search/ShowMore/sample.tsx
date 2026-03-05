import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useState } from "react";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import SearchItemClass from "@ui5/webcomponents-fiori/dist/SearchItem.js";
import SearchItemGroupClass from "@ui5/webcomponents-fiori/dist/SearchItemGroup.js";
import SearchItemShowMoreClass from "@ui5/webcomponents-fiori/dist/SearchItemShowMore.js";
import SearchMessageAreaClass from "@ui5/webcomponents-fiori/dist/SearchMessageArea.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/history.js";

const Search = createComponent(SearchClass);
const SearchItem = createComponent(SearchItemClass);
const SearchItemGroup = createComponent(SearchItemGroupClass);
const SearchItemShowMore = createComponent(SearchItemShowMoreClass);
const SearchMessageArea = createComponent(SearchMessageAreaClass);
const Label = createComponent(LabelClass);

const allItems = [
  { text: "List Item 1", icon: "history" },
  { text: "List Item 2", icon: "search" },
  { text: "List Item 3", icon: "history" },
  { text: "List Item 4", icon: "history" },
  { text: "List Item 5", icon: "search" },
  { text: "List Item 6", icon: "globe" },
];

const visibleCount = 3;

function App() {
  const [expanded, setExpanded] = useState(false);
  const [group1Items, setGroup1Items] = useState(allItems);

  const displayedItems = expanded ? group1Items : group1Items.slice(0, visibleCount);
  const hiddenCount = expanded ? 0 : group1Items.length - visibleCount;

  const handleShowMoreClick = () => {
    setExpanded(true);
  };

  const handleItemDelete = (index) => {
    setGroup1Items(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Label>Search with Grouped Suggestions and Show More (N) Item</Label>
        <Search id="searchShowMore" showClearIcon={true} placeholder="Placeholder">
            <SearchMessageArea slot="messageArea" description="You can try the following" text="Oh, there are no results" />
            <SearchItemGroup id="group1" headerText="Group Header">
              {displayedItems.map((item, index) => (
                <SearchItem key={item.text + index} text={item.text} icon={item.icon} deletable={true} onDelete={() => handleItemDelete(index)} />
              ))}
              {!expanded && hiddenCount > 0 && (
                <SearchItemShowMore itemsToShowCount={hiddenCount} onClick={handleShowMoreClick} />
              )}
            </SearchItemGroup>
    		<SearchItemGroup id="group2" headerText="Group Header">
    			<SearchItem text="List Item" icon="history" />
    			<SearchItem text="List Item" icon="history" />
    			<SearchItem text="List Item" icon="globe" />
            </SearchItemGroup>
        </Search>
    </>
  );
}

export default App;
