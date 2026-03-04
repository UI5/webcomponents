import { createReactComponent } from "@ui5/webcomponents-base";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import SearchItemClass from "@ui5/webcomponents-fiori/dist/SearchItem.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/share.js";
import "@ui5/webcomponents-icons/dist/copy.js";

const Search = createReactComponent(SearchClass);
const SearchItem = createReactComponent(SearchItemClass);
const Button = createReactComponent(ButtonClass);

function App() {

  return (
    <>
      <Search id="actions-search" showClearIcon={true}>
            <SearchItem text="List Item with Action" icon="globe" deletable={true}>
                <Button slot="actions" design="Transparent" icon="share" tooltip="Share" />
            </SearchItem>
            <SearchItem text="List Item with Action" icon="globe" deletable={true}>
                <Button slot="actions" design="Transparent" icon="share" tooltip="Copy" />
            </SearchItem>
            <SearchItem text="List Item with no Actions" icon="globe" />
        </Search>
    </>
  );
}

export default App;
