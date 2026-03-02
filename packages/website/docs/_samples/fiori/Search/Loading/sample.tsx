import { createReactComponent } from "@ui5/webcomponents-base";
import SearchFieldClass from "@ui5/webcomponents-fiori/dist/SearchField.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const SearchField = createReactComponent(SearchFieldClass);
const Label = createReactComponent(LabelClass);
const Text = createReactComponent(TextClass);

function App() {

  const handleUi5Input = () => {
    if (!searchField.value) {
        resultText.textContent = "Enter a search term and press Enter or click the search icon";
  };

  return (
    <>
      <SearchField id="search-loading" placeholder="Search..." />

    <Label style={{ marginTop: "1rem", display: "block" }}>Result:</Label>
    <Text id="result-text">Enter a search term and press Enter or click the search icon</Text>
    </>
  );
}

export default App;
