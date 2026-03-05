import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createComponent(ComboBoxClass);
const ComboBoxItem = createComponent(ComboBoxItemClass);

function App() {
  const [employeeId, setEmployeeId] = useState("-");
  const [employeeName, setEmployeeName] = useState("-");
  const [employeeDept, setEmployeeDept] = useState("-");

  const handleSelectionChange = (
    e: UI5CustomEvent<ComboBoxClass, "selection-change">,
  ) => {
    const item = e.detail.item;
    if (item) {
      setEmployeeId(item.value);
      setEmployeeName(item.text);
      setEmployeeDept(item.additionalText);
    } else {
      setEmployeeId("-");
      setEmployeeName("-");
      setEmployeeDept("-");
    }
  };

  return (
    <>
      <ComboBox
        id="employee-combo"
        placeholder="Select an employee"
        onSelectionChange={handleSelectionChange}
      >
        <ComboBoxItem
          text="John Smith"
          additionalText="Sales"
          value="emp-101"
        />
        <ComboBoxItem
          text="John Smith"
          additionalText="Engineering"
          value="emp-205"
        />
        <ComboBoxItem
          text="John Smith"
          additionalText="Marketing"
          value="emp-342"
        />
        <ComboBoxItem text="Jane Doe" additionalText="HR" value="emp-118" />
        <ComboBoxItem
          text="Jane Doe"
          additionalText="Finance"
          value="emp-267"
        />
      </ComboBox>

      <div
        id="output"
        style={{
          marginTop: "1rem",
          fontFamily: "var(--sapFontFamily)",
          color: "var(--sapTextColor)",
        }}
      >
        <div>
          Employee ID: <strong id="employee-id">{employeeId}</strong>
        </div>
        <div>
          Name: <strong id="employee-name">{employeeName}</strong>
        </div>
        <div>
          Department: <strong id="employee-dept">{employeeDept}</strong>
        </div>
      </div>
    </>
  );
}

export default App;
