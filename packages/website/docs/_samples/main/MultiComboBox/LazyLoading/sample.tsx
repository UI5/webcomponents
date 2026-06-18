import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";
import { useState, useRef, useCallback } from "react";

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
  const mcbRef = useRef(null);

  const handleLoadItems = useCallback((e) => {
    const { shouldOpenPicker } = e.detail;
    const value = mcbRef.current?.value ?? "";

    setLoading(true);
    setItems([]);

    setTimeout(() => {
      const matches = COUNTRIES.filter((c) =>
        c.toLowerCase().includes(value.toLowerCase())
      );
      setItems(matches);
      setLoading(false);
      if (shouldOpenPicker) {
        setOpen(true);
      }
    }, 500);
  }, []);

  const handleSelectionChange = useCallback((e) => {
    setSelectedValues(e.detail.items.map((item) => item.text));
  }, []);

  return (
    <MultiComboBox
      ref={mcbRef}
      placeholder="Type a country name"
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
