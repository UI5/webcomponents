import "@ui5/webcomponents-fiori/dist/SearchField.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Text.js";

const searchField = document.getElementById("search-loading");
const resultText = document.getElementById("result-text");

searchField.addEventListener("ui5-search", async (event) => {
    const query = searchField.value;
    
    // Show loading indicator
    searchField.fieldLoading = true;
    resultText.textContent = `Searching for "${query}"...`;
    
    // Simulate async search operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Hide loading indicator and show results
    searchField.fieldLoading = false;
    resultText.textContent = `Search completed for "${query}". Found 5 results.`;
});

searchField.addEventListener("ui5-input", () => {
    if (!searchField.value) {
        resultText.textContent = "Enter a search term and press Enter or click the search icon";
    }
});
