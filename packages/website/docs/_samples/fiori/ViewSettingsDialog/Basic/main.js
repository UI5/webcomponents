import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";
import "@ui5/webcomponents-fiori/dist/GroupItem.js";
import "@ui5/webcomponents-fiori/dist/SortItem.js";
import "@ui5/webcomponents-fiori/dist/FilterItem.js";
import "@ui5/webcomponents-fiori/dist/FilterItemOption.js";

var vsdResults = document.getElementById("vsdResults");

btnOpenDialog1.addEventListener("click", function () {
    vsdResults.innerHTML = "";
    vsd1.open = true;
});

vsd1.addEventListener("confirm", function (evt) {
    vsdResults.innerHTML = JSON.stringify(evt.detail);
});