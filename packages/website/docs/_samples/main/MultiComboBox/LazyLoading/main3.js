import "@ui5/webcomponents/dist/MultiComboBox.js";
import "@ui5/webcomponents/dist/MultiComboBoxItem.js";

const mcb3 = document.getElementById("mcbSearch");
const COUNTRIES3 = ["Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
    "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia",
    "Croatia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany",
    "Greece", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "South Korea", "Malaysia",
    "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
    "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia",
    "Serbia", "Singapore", "South Africa", "Spain", "Sweden", "Switzerland", "Thailand",
    "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam"];

// Simulates a server-side search: resolves after a delay with countries filtered
// by "value", and rejects with an "AbortError" when the request is cancelled.
const searchCountries = (value, signal) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
        if (value.trim().length > 0) {
            resolve(COUNTRIES3.filter(c => c.toLowerCase().includes(value.toLowerCase())));
        } else {
            resolve(COUNTRIES3);
        }
    }, 600);

    signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
    });
});


// This is a pure "search as you type" flow. Every keystroke fires a
// load-items event with reason "input"; the app aborts the previous request's
// AbortController, so an outdated search is cancelled and only the latest query resolves.
let abortController3;
mcb3.addEventListener("load-items", async (e) => {
    const { value, reason } = e.detail;

    // Cancel any in-flight request and create a fresh signal for this one.
    abortController3?.abort();
    abortController3 = new AbortController();
    const { signal } = abortController3;

    mcb3.loading = true;

    if(reason === "input"){
        mcb3.open = true;
    }

    // Preserve the current selection so it survives re-populating the list.
    const selectedTexts = Array.from(mcb3.querySelectorAll("ui5-mcb-item[selected]"))
        .map(item => item.getAttribute("text"));

    try {
        const matches = await searchCountries(value, signal);
        mcb3.innerHTML = "";
        matches.forEach(country => {
            const item = document.createElement("ui5-mcb-item");
            item.setAttribute("text", country);
            if (selectedTexts.includes(country)) {
                item.setAttribute("selected", "");
            }
            mcb3.appendChild(item);
        });
        mcb3.loading = false;
    } catch (err) {
        // Superseded by a newer search - the fresh request now owns the loading state.
        if (err.name !== "AbortError") {
            throw err;
        }
    }
});
