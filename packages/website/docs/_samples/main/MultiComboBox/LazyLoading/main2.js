import "@ui5/webcomponents/dist/MultiComboBox.js";
import "@ui5/webcomponents/dist/MultiComboBoxItem.js";

const mcb2 = document.getElementById("mcbWait");
const COUNTRIES2 = ["Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
    "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia",
    "Croatia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany",
    "Greece", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "South Korea", "Malaysia",
    "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
    "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia",
    "Serbia", "Singapore", "South Africa", "Spain", "Sweden", "Switzerland", "Thailand",
    "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam"];

// Simulates a network request that returns the full list after a delay.
// This request is intentionally NOT abortable - once started, it runs to completion.
const fetchAllCountries = () => new Promise((resolve) => {
    setTimeout(() => resolve(COUNTRIES2.slice()), 1500);
});

// The default filter is left in place, so the MultiComboBox filters the loaded items on
// the client as the user types. We only fetch once - when the picker opens with no items or when user starts typing.
// The request is not abortable, so typing while it is in flight does NOT cancel it.
// When it resolves, the already-typed value filters the list client-side.
mcb2.addEventListener("load-items", async (e) => {
    if (e.detail.reason === "input") {
        if (mcb2.loading) {
            return;
        }

        mcb2.open = true;
    }

    mcb2.loading = true;

    const matches = await fetchAllCountries();
    matches.forEach(country => {
        const item = document.createElement("ui5-mcb-item");
        item.setAttribute("text", country);
        mcb2.appendChild(item);
    });
    mcb2.loading = false;
});
