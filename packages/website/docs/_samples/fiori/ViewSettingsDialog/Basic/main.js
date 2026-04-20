import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import "@ui5/webcomponents/dist/StepInput.js";
import "@ui5/webcomponents/dist/Switch.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/palette.js";

import "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";
import "@ui5/webcomponents-fiori/dist/GroupItem.js";
import "@ui5/webcomponents-fiori/dist/SortItem.js";
import "@ui5/webcomponents-fiori/dist/FilterItem.js";
import "@ui5/webcomponents-fiori/dist/FilterItemOption.js";
import "@ui5/webcomponents-fiori/dist/ViewSettingsCustomTab.js";

var vsdResults = document.getElementById("vsdResults");

btnOpenDialog1.addEventListener("click", function () {
    vsdResults.innerHTML = "";
    vsd1.open = true;
});

vsd1.addEventListener("confirm", function (evt) {
    vsdResults.innerHTML = JSON.stringify(evt.detail);
});