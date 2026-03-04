import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createComponent(ComboBoxClass);
const ComboBoxItem = createComponent(ComboBoxItemClass);

function App() {
  const [selectedValue, setSelectedValue] = useState("DE");

  const handleSelectionChange = (e: any) => {
    const item = e.detail.item;
    if (item) {
      setSelectedValue(item.value || "(no value)");
    } else {
      setSelectedValue("(none)");
    }
  };

  return (
    <>
      <ComboBox id="country-combo" placeholder="Select a country" selectedValue="DE" onSelectionChange={handleSelectionChange}>
        <ComboBoxItem text="Austria" value="AT" />
        <ComboBoxItem text="Belgium" value="BE" />
        <ComboBoxItem text="France" value="FR" />
        <ComboBoxItem text="Germany" value="DE" />
        <ComboBoxItem text="Italy" value="IT" />
        <ComboBoxItem text="Spain" value="ES" />
      </ComboBox>

      <div id="output" style={{ marginTop: "1rem", fontFamily: "var(--sapFontFamily)", color: "var(--sapTextColor)" }}>
        Selected value: <strong id="selected-value">{selectedValue}</strong>
      </div>
    </>
  );
}

export default App;
