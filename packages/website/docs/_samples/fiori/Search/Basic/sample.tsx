import { createReactComponent } from "@ui5/webcomponents-base";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";

const Search = createReactComponent(SearchClass);

function App() {

  const handleUi5ScopeChange = (e) => {
    const scope = e.detail.scope.value === "all" ? "" : e.detail.scope.value;
    
    searchScope.items.forEach(item => {
        item.remove();
  };

  return (
    <>
      <Search id="search-scope" scope-value="all" show-clear-icon={true} placeholder="Search Apps, Products">
    			<ui5-search-scope text="All" value="all" slot="scopes"></ui5-search-scope>
    			<ui5-search-scope text="Apps" value="apps" slot="scopes"></ui5-search-scope>
    			<ui5-search-scope text="Products" value="products" slot="scopes"></ui5-search-scope>
    		</Search>
    	</div>
    </>
  );
}

export default App;
