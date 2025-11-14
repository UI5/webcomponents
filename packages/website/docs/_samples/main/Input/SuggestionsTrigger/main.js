import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/SuggestionItem.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

const input = document.getElementById("input");
input.addEventListener("input", () => {
    const value = input.value;
    let suggestionItems = [];
    const ui5_database_entries = ["Argentina", "Albania", "Algeria", "Angola",
        "Austria", "Australia", "Bulgaria", "Canada", "Columbia", "Croatia", "Denmark",
        "England", "Finland", "France", "Germany", "Hungary", "Ireland", "Italy", "Kuwait",
        "Luxembourg", "Mexico", "Morocco", "Norway", "Paraguay", "Philippines", "Portugal",
        "Spain", "Sweden", "Sri Lanka", "Senegal", "Thailand", "The United Kingdom of Great Britain and Northern Ireland", "USA"];

    if (value) {
        suggestionItems = ui5_database_entries.filter((item) => {
            return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
        });
    }
    Array.from(input.children).forEach((child) => {
        input.removeChild(child);
    });
    suggestionItems.forEach((item) => {
        const li = document.createElement("ui5-suggestion-item");
        li.text = item;
        input.appendChild(li);
    });
});