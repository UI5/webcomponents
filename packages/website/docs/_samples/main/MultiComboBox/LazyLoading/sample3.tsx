import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";
import { useState, useCallback } from "react";

const MultiComboBox = createReactComponent(MultiComboBoxClass);
const MultiComboBoxItem = createReactComponent(MultiComboBoxItemClass);

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
  const [selectedValues, setSelectedValues] = useState([]);

  // Simulates a server-side search: resolves after a delay with countries filtered
  // by "value", and rejects with an "AbortError" when the request is cancelled.
  const searchCountries = (value, signal) =>
    new Promise<string[]>((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve(
          COUNTRIES.filter((c) => c.toLowerCase().includes(value.toLowerCase()))
        );
      }, 600);

      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });

  // This is a pure "search as you type" flow. With filter="None" every keystroke fires a
  // load-items event with reason "input"; the component aborts the previous request's
  // signal, so an outdated search is cancelled and only the latest query resolves.
  const handleLoadItems = useCallback(async (e) => {
    const { value, signal } = e.detail;

    if (!value) {
      return;
    }

    setLoading(true);
    setOpen(true);

    try {
      const matches = await searchCountries(value, signal);
      setItems(matches);
      setLoading(false);
    } catch (err) {
      // Superseded by a newer search - the fresh request now owns the loading state.
      if (err.name !== "AbortError") {
        throw err;
      }
    }
  }, []);

  const handleSelectionChange = useCallback((e) => {
    setSelectedValues(e.detail.items.map((item) => item.text));
  }, []);

  return (
    <MultiComboBox
      placeholder="Type to search countries"
      filter="None"
      loading={loading}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onLoadItems={handleLoadItems}
      onSelectionChange={handleSelectionChange}
    >
      {items.map((country) => (
        <MultiComboBoxItem
          key={country}
          text={country}
          selected={selectedValues.includes(country)}
        />
      ))}
    </MultiComboBox>
  );
}

export default App;
