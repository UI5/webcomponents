import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";

const cb = document.getElementById("cbLazy");
const COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
    "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia",
    "Croatia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany",
    "Greece", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "South Korea", "Malaysia",
    "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
    "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia",
    "Serbia", "Singapore", "South Africa", "Spain", "Sweden", "Switzerland", "Thailand",
    "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam"];

// Simulates a server-side search: resolves after a delay with countries filtered
// by "value" (an empty value returns all), and rejects with an "AbortError" when
// the request is cancelled.
const fetchCountries = (value, signal) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
        resolve(COUNTRIES.filter(c => c.toLowerCase().includes(value.toLowerCase())));
    }, 800);

    signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
    });
});

// Arrow down fires load-items with an empty value, so the "server" returns all countries.
// Because filter="None", each typed character fires a new load-items - the app aborts the
// previous request's AbortController, so the in-flight fetch is cancelled and a fresh
// server-side filtered request takes over.
let abortController;
cb.addEventListener("load-items", async (e) => {
    const { value, reason } = e.detail;

    // Cancel any in-flight request and create a fresh signal for this one.
    abortController?.abort();
    abortController = new AbortController();
    const { signal } = abortController;

    cb.loading = true;

    if(reason !== "open"){
        cb.open = true;
    }

    try {
        const matches = await fetchCountries(value, signal);
        cb.innerHTML = "";
        matches.forEach(country => {
            const item = document.createElement("ui5-cb-item");
            item.setAttribute("text", country);
            cb.appendChild(item);
        });
        cb.loading = false;
    } catch (err) {
        // A newer load-items event superseded this one - the fresh request owns loading now.
        if (err.name !== "AbortError") {
            throw err;
        }
    }
});
