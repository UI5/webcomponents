import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";

const cb2 = document.getElementById("cbWait");
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

// The default filter is left in place, so the ComboBox filters the loaded items on the
// client as the user types. We only fetch once - when the picker opens with no items or when user starts typing.
// The request is not abortable, so typing while it is in flight does NOT cancel it.
// When it resolves, the already-typed value filters the list client-side.
cb2.addEventListener("load-items", async (e) => {
    if (e.detail.reason === "input" && cb2.loading) {
       return;
    }

    cb2.loading = true;

    const matches = await fetchAllCountries();
    matches.forEach(country => {
        const item = document.createElement("ui5-cb-item");
        item.setAttribute("text", country);
        cb2.appendChild(item);
    });
    cb2.loading = false;
});
