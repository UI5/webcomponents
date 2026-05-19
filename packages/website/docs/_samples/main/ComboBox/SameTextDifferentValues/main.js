import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";

const combo = document.getElementById("employee-combo");
const employeeId = document.getElementById("employee-id");
const employeeName = document.getElementById("employee-name");
const employeeDept = document.getElementById("employee-dept");

combo.addEventListener("selection-change", (event) => {
	const item = event.detail.item;
	if (item) {
			employeeId.textContent = item.value;
			employeeName.textContent = item.text;
			employeeDept.textContent = item.additionalText;
	} else {
			employeeId.textContent = "-";
			employeeName.textContent = "-";
			employeeDept.textContent = "-";
	}
});
