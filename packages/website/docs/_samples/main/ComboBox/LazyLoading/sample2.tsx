import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState, useCallback } from "react";

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

  // Simulates a network request that returns the full list after a delay.
  // This request is intentionally NOT abortable - once started, it runs to completion.
  const fetchAllCountries = () =>
    new Promise<string[]>((resolve) => {
      setTimeout(() => resolve(COUNTRIES.slice()), 1500);
    });

  // The default filter is left in place, so the ComboBox filters the loaded items on the
  // client as the user types. We only fetch once - when the picker opens with no items or when
  // the user starts typing. The request is not abortable, so typing while it is in flight does
  // NOT cancel it. When it resolves, the already-typed value filters the list client-side.
  const handleLoadItems = useCallback(async (e: UI5CustomEvent<ComboBoxClass, "load-items">) => {
    if (e.detail.reason === "input" && (e.target as unknown as ComboBoxClass).loading) {
      return;
    }

    setLoading(true);

    const matches = await fetchAllCountries();
    setItems(matches);
    setLoading(false);
  }, []);

  return (
    <ComboBox
      placeholder="Open to load all, then filter"
      loading={loading}
      onLoadItems={handleLoadItems}
    >
      {items.map((country: string) => (
        <ComboBoxItem key={country} text={country} />
      ))}
    </ComboBox>
  );
}

export default App;
