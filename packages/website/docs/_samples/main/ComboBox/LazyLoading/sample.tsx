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

  const handleLoadItems = useCallback((e) => {
    const { shouldOpenPicker } = e.detail;
    const value = cbRef.current?.value ?? "";

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
