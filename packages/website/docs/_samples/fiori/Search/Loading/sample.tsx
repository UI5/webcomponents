import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useState, useRef } from "react";
import SearchFieldClass from "@ui5/webcomponents-fiori/dist/SearchField.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const SearchField = createComponent(SearchFieldClass);
const Label = createComponent(LabelClass);
const Text = createComponent(TextClass);

function App() {
  const [resultText, setResultText] = useState(
    "Enter a search term and press Enter or click the search icon",
  );
  const searchFieldRef = useRef(null);

  const handleSearch = async () => {
    const query = searchFieldRef.current!.value;
    searchFieldRef.current!.fieldLoading = true;
    setResultText(`Searching for "${query}"...`);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    searchFieldRef.current!.fieldLoading = false;
    setResultText(`Search completed for "${query}". Found 5 results.`);
  };

  const handleInput = () => {
    if (!searchFieldRef.current!.value) {
      setResultText(
        "Enter a search term and press Enter or click the search icon",
      );
    }
  };

  return (
    <>
      <SearchField
        ref={searchFieldRef}
        id="search-loading"
        placeholder="Search..."
        onSearch={handleSearch}
        onInput={handleInput}
      />

      <Label style={{ marginTop: "1rem", display: "block" }}>Result:</Label>
      <Text id="result-text">{resultText}</Text>
    </>
  );
}

export default App;
