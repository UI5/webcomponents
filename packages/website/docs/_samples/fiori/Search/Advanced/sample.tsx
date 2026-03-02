import { createReactComponent } from "@ui5/webcomponents-base";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import SearchMessageAreaClass from "@ui5/webcomponents-fiori/dist/SearchMessageArea.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const Search = createReactComponent(SearchClass);
const SearchMessageArea = createReactComponent(SearchMessageAreaClass);
const Button = createReactComponent(ButtonClass);

function App() {

  const handleUi5Input = (e) => {
    const value = e.target.value.toLowerCase();
	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(value)
	);

	filtering.items.forEach((item) => {
		item.remove();
  };

  return (
    <>
      <Search id="filtering" show-clear-icon={true} placeholder="Start typing ...">
    			<SearchMessageArea slot="messageArea" description="Search for example “All my open Objects”" text="Try This!" />
    			<Button design="Transparent" slot="action">Show all search results</Button>
    		</Search>
    	</div>
    </>
  );
}

export default App;
