import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState } from "react";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import SearchItemClass from "@ui5/webcomponents-fiori/dist/SearchItem.js";
import SearchMessageAreaClass from "@ui5/webcomponents-fiori/dist/SearchMessageArea.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const Search = createComponent(SearchClass);
const SearchItem = createComponent(SearchItemClass);
const SearchMessageArea = createComponent(SearchMessageAreaClass);
const Button = createComponent(ButtonClass);

const data = [
  { name: "Red Apple", category: "Fruit" },
  { name: "Apple", category: "Fruit" },
  { name: "Cucumber", category: "Vegetable" },
  { name: "Orange", category: "Fruit" },
  { name: "Tomato", category: "Vegetable" },
];

function App() {
  const [items, setItems] = useState(data);

  const handleFilteringInput = (e: UI5CustomEvent<SearchClass, "input">) => {
    const value = e.currentTarget.value.toLowerCase();
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(value),
    );
    setItems(filteredData);
  };

  const handleItemDelete = (e, index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Search
        id="filtering"
        showClearIcon={true}
        placeholder="Start typing ..."
        onInput={handleFilteringInput}
      >
        <SearchMessageArea
          slot="messageArea"
          description={'Search for example "All my open Objects"'}
          text="Try This!"
        />
        <Button design="Transparent" slot="action">
          Show all search results
        </Button>
        {items.map((item, index) => (
          <SearchItem
            key={item.name + index}
            text={item.name}
            icon="search"
            onDelete={() => handleItemDelete(null, index)}
          />
        ))}
      </Search>
    </>
  );
}

export default App;
