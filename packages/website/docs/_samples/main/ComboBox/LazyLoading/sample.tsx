import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import { useState, useRef, useCallback } from "react";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
  "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia",
  "Croatia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany",
  "Greece", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "South Korea", "Malaysia",
  "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
  "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia",
  "Serbia", "Singapore", "South Africa", "Spain", "Sweden", "Switzerland", "Thailand",
  "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam",
];

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const cbRef = useRef(null);

  // Simulates a network request that resolves after a delay and honors an AbortSignal.
  // Rejects with an "AbortError" when the signal is aborted (superseded by newer input).
  const fetchCountries = (value, signal) =>
    new Promise<string[]>((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve(
          COUNTRIES.filter((c) => c.toLowerCase().includes(value.toLowerCase()))
        );
      }, 500);

      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });

  const handleLoadItems = useCallback(async (e) => {
    const { reason, value, signal } = e.detail;

    setLoading(true);
    // On "input" the app opens the picker; on "open" (arrow down) the component opens it itself.
    if (reason === "input") {
      setOpen(true);
    }

    try {
      const matches = await fetchCountries(value, signal);
      // A newer load-items event would have aborted this signal before we reach here.
      setItems(matches);
      setLoading(false);
    } catch (err) {
      // Superseded by a newer load-items event - a fresh request now owns the loading state.
      if (err.name !== "AbortError") {
        throw err;
      }
    }
  }, []);

  return (
    <ComboBox
      ref={cbRef}
      placeholder="Type a country name"
      filter="None"
      loading={loading}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onLoadItems={handleLoadItems}
    >
      {items.map((country) => (
        <ComboBoxItem key={country} text={country} />
      ))}
    </ComboBox>
  );
}

export default App;
