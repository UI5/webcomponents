import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";

const combo = document.getElementById("country-combo");
const output = document.getElementById("selected-value");

combo.addEventListener("selection-change", (event) => {
	const item = event.detail.item;
	if (item) {
			output.textContent = item.value || "(no value)";
	} else {
			output.textContent = "(none)";
	}
});
