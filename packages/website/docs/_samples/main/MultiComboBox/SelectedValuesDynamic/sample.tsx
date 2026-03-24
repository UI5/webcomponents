import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";

const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);
const MultiComboBox = createReactComponent(MultiComboBoxClass);
const MultiComboBoxItem = createReactComponent(MultiComboBoxItemClass);

const europeanCountries = ["DE", "FR", "IT"];
const allCountries = ["DE", "FR", "IT", "US", "CA", "JP"];

export const Example = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectionChange = (
    e: UI5CustomEvent<MultiComboBoxClass, "selection-change">,
  ) => {
    const items = e.detail.items || [];
    setSelectedValues(
      items.map((item: any) => item.getAttribute("value")).filter(Boolean),
    );
  };

  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <Button
          onClick={() => {
            setSelectedValues([...allCountries]);
          }}
        >
          Select All
        </Button>
        <Button
          onClick={() => {
            setSelectedValues([]);
          }}
        >
          Clear All
        </Button>
        <Button
          onClick={() => {
            setSelectedValues([...europeanCountries]);
          }}
        >
          Select Europe
        </Button>
      </div>

      <MultiComboBox
        placeholder="Select countries"
        style={{ width: "100%" }}
        selectedValues={selectedValues}
        onSelectionChange={handleSelectionChange}
      >
        <MultiComboBoxItem text="Germany" value="DE" />
        <MultiComboBoxItem text="France" value="FR" />
        <MultiComboBoxItem text="Italy" value="IT" />
        <MultiComboBoxItem text="United States" value="US" />
        <MultiComboBoxItem text="Canada" value="CA" />
        <MultiComboBoxItem text="Japan" value="JP" />
      </MultiComboBox>

      <Label style={{ display: "block", marginTop: "1rem" }}>
        Selected values: {JSON.stringify(selectedValues)}
      </Label>
    </>
  );
}
