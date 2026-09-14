import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

const countries = [
  { text: "Austria", value: "AT", flag: "🇦🇹" },
  { text: "France", value: "FR", flag: "🇫🇷" },
  { text: "Germany", value: "DE", flag: "🇩🇪" },
  { text: "Italy", value: "IT", flag: "🇮🇹" },
  { text: "Spain", value: "ES", flag: "🇪🇸" },
];

function App() {
  const [labelContent, setLabelContent] = useState<{ flag: string; text: string } | null>(null);

  const handleSelectionChange = (
    e: UI5CustomEvent<ComboBoxClass, "selection-change">,
  ) => {
    const item = e.detail.item;
    if (item) {
      const country = countries.find((c) => c.value === item.value);
      setLabelContent(country ? { flag: country.flag, text: country.text } : null);
    } else {
      setLabelContent(null);
    }
  };

  return (
    <ComboBox
      placeholder="Select a country"
      style={{ width: "300px" }}
      onSelectionChange={handleSelectionChange}
    >
      {labelContent && (
        <span slot="label">
          {labelContent.flag} {labelContent.text}
        </span>
      )}
      {countries.map((country) => (
        <ComboBoxItem key={country.value} text={country.text} value={country.value} />
      ))}
    </ComboBox>
  );
}

export default App;
