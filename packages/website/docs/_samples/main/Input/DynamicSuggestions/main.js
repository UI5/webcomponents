import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/SuggestionItem.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

const THRESHOLD = 3;

const countries = [
    "Argentina", "Albania", "Algeria", "Angola", "Austria", "Australia", 
    "Bulgaria", "Belgium", "Brazil", "Canada", "Columbia", "Croatia", 
    "Denmark", "England", "Finland", "France", "Germany", "Greece", 
    "Hungary", "Ireland", "Italy", "Japan", "Kuwait", "Luxembourg", 
    "Mexico", "Morocco", "Netherlands", "Norway", "Paraguay", "Philippines", 
    "Portugal", "Romania", "Spain", "Sweden", "Switzerland", "Sri Lanka", 
    "Senegal", "Thailand", "The United Kingdom of Great Britain and Northern Ireland", 
    "USA", "Ukraine", "Vietnam"
];

let suggestionItems = [];

const input = document.getElementById("input-threshold-3");

input.addEventListener("input", () => {
    const value = input.value;
    
    // Clear existing suggestions
    while (input.lastChild) {
        input.removeChild(input.lastChild);
    }
  
    if (value.length >= THRESHOLD) {
        // Enable suggestions and typeahead when threshold is met
        input.showSuggestions = true;
      
        // Filter and add matching suggestions
        suggestionItems = countries.filter((item) => {
            return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
        });
      
        suggestionItems.forEach((item) => {
            const li = document.createElement("ui5-suggestion-item");
            li.text = item;
            input.appendChild(li);
        });
    }
});
