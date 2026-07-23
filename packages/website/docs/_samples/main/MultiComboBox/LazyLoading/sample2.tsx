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
  const [selectedValues, setSelectedValues] = useState([]);

  // Simulates a network request that returns the full list after a delay.
  // This request is intentionally NOT abortable - once started, it runs to completion.
  const fetchAllCountries = () =>
    new Promise<string[]>((resolve) => {
      setTimeout(() => resolve(COUNTRIES.slice()), 1500);
    });

  // The default filter is left in place, so the MultiComboBox filters the loaded items on
  // the client as the user types. We only fetch once - when the picker opens with no items -
  // and we ignore e.detail.signal, so typing while the request is in flight does NOT
  // cancel it. When it resolves, the already-typed value filters the list client-side.
  const handleLoadItems = useCallback(async (e) => {
    if (e.detail.reason !== "open") {
      return;
    }

    setLoading(true);

    const matches = await fetchAllCountries();
    setItems(matches);
    setLoading(false);
  }, []);

  const handleSelectionChange = useCallback((e) => {
    setSelectedValues(e.detail.items.map((item) => item.text));
  }, []);

  return (
    <MultiComboBox
      placeholder="Open to load all, then filter"
      loading={loading}
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
