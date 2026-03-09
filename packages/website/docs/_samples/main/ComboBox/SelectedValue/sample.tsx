import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

function App() {
  const [selectedValue, setSelectedValue] = useState("DE");

  const handleSelectionChange = (
    e: UI5CustomEvent<ComboBoxClass, "selection-change">,
  ) => {
    const item = e.detail.item;
    if (item) {
      setSelectedValue(item.value || "(no value)");
    } else {
      setSelectedValue("(none)");
    }
  };

  return (
    <>
      <ComboBox
        id="country-combo"
        placeholder="Select a country"
        selectedValue="DE"
        onSelectionChange={handleSelectionChange}
      >
        <ComboBoxItem text="Austria" value="AT" />
        <ComboBoxItem text="Belgium" value="BE" />
        <ComboBoxItem text="France" value="FR" />
        <ComboBoxItem text="Germany" value="DE" />
        <ComboBoxItem text="Italy" value="IT" />
        <ComboBoxItem text="Spain" value="ES" />
      </ComboBox>

      <div
        id="output"
        style={{
          marginTop: "1rem",
          fontFamily: "var(--sapFontFamily)",
          color: "var(--sapTextColor)",
        }}
      >
        Selected value: <strong id="selected-value">{selectedValue}</strong>
      </div>
    </>
  );
}

export default App;
