import "@ui5/webcomponents/dist/MultiComboBox.js";
import "@ui5/webcomponents/dist/MultiComboBoxItem.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";

const mcb = document.getElementById("mcb");
const output = document.getElementById("output");

const europeanCountries = ["DE", "FR", "IT"];
const allCountries = ["DE", "FR", "IT", "US", "CA", "JP"];

function updateOutput() {
    output.textContent = `Selected values: ${JSON.stringify(mcb.selectedValues)}`;
}

mcb.addEventListener("selection-change", updateOutput);

document.getElementById("btnSelectAll").addEventListener("click", () => {
    mcb.selectedValues = [...allCountries];
    updateOutput();
});

document.getElementById("btnClearAll").addEventListener("click", () => {
    mcb.selectedValues = [];
    updateOutput();
});

document.getElementById("btnSelectEurope").addEventListener("click", () => {
    mcb.selectedValues = [...europeanCountries];
    updateOutput();
});
