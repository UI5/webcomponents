import { createReactComponent } from "@ui5/webcomponents-base";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

function App() {

  const handleSelectionChange = (e) => {
    const item = e.detail.item;
	if (item) {
			output.textContent = item.value || "(no value)";
  };

  return (
    <>
      <ComboBox id="country-combo" placeholder="Select a country" selected-value="DE">
    		<ComboBoxItem text="Austria" value="AT" />
    		<ComboBoxItem text="Belgium" value="BE" />
    		<ComboBoxItem text="France" value="FR" />
    		<ComboBoxItem text="Germany" value="DE" />
    		<ComboBoxItem text="Italy" value="IT" />
    		<ComboBoxItem text="Spain" value="ES" />
    	</ComboBox>

    	<div id="output" style={{ marginTop: "1rem", fontFamily: "var(--sapFontFamily)", color: "var(--sapTextColor)" }}>
    		Selected value: <strong id="selected-value">DE</strong>
    	</div>
    </>
  );
}

export default App;
