import { createReactComponent } from "@ui5/webcomponents-base";
import { useState } from "react";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import SearchItemClass from "@ui5/webcomponents-fiori/dist/SearchItem.js";
import SearchScopeClass from "@ui5/webcomponents-fiori/dist/SearchScope.js";

const Search = createReactComponent(SearchClass);
const SearchItem = createReactComponent(SearchItemClass);
const SearchScope = createReactComponent(SearchScopeClass);

const scopeData = [
    { name: "Laptop", scope: "products" },
    { name: "Leave Requests", scope: "apps" },
    { name: "Log work", scope: "apps" },
    { name: "Manage Products", scope: "apps" },
    { name: "Mobile Phones", scope: "products" },
    { name: "Tablet", scope: "products" },
];

function App() {
  const [currentScope, setCurrentScope] = useState("");

  const filteredItems = currentScope
    ? scopeData.filter(item => item.scope === currentScope)
    : scopeData;

  const handleScopeChange = (e) => {
    const scope = e.detail.scope.value === "all" ? "" : e.detail.scope.value;
    setCurrentScope(scope);
  };

  return (
    <>
      <Search id="search-scope" scopeValue="all" showClearIcon={true} placeholder="Search Apps, Products" onScopeChange={handleScopeChange}>
    			<SearchScope text="All" value="all" slot="scopes" />
    			<SearchScope text="Apps" value="apps" slot="scopes" />
    			<SearchScope text="Products" value="products" slot="scopes" />
          {filteredItems.map((item, index) => (
            <SearchItem key={index} text={item.name} scopeName={item.scope} />
          ))}
    		</Search>
    </>
  );
}

export default App;
