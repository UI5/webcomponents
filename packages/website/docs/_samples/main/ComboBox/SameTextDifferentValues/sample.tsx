import { createReactComponent } from "@ui5/webcomponents-base";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

function App() {

  const handleSelectionChange = (e) => {
    const item = e.detail.item;
	if (item) {
			employeeId.textContent = item.value;
			employeeName.textContent = item.text;
			employeeDept.textContent = item.additionalText;
  };

  return (
    <>
      <ComboBox id="employee-combo" placeholder="Select an employee">
    		<ComboBoxItem text="John Smith" additional-text="Sales" value="emp-101" />
    		<ComboBoxItem text="John Smith" additional-text="Engineering" value="emp-205" />
    		<ComboBoxItem text="John Smith" additional-text="Marketing" value="emp-342" />
    		<ComboBoxItem text="Jane Doe" additional-text="HR" value="emp-118" />
    		<ComboBoxItem text="Jane Doe" additional-text="Finance" value="emp-267" />
    	</ComboBox>

    	<div id="output" style={{ marginTop: "1rem", fontFamily: "var(--sapFontFamily)", color: "var(--sapTextColor)" }}>
    		<div>Employee ID: <strong id="employee-id">-</strong></div>
    		<div>Name: <strong id="employee-name">-</strong></div>
    		<div>Department: <strong id="employee-dept">-</strong></div>
    	</div>
    </>
  );
}

export default App;
