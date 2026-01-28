import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/MenuSeparator.js";
import "@ui5/webcomponents/dist/MenuItemGroup.js";
import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/text-align-left.js";
import "@ui5/webcomponents-icons/dist/text-align-center.js";
import "@ui5/webcomponents-icons/dist/text-align-right.js";
import "@ui5/webcomponents-icons/dist/bold-text.js";
import "@ui5/webcomponents-icons/dist/italic-text.js";
import "@ui5/webcomponents-icons/dist/underline-text.js";
import "@ui5/webcomponents-icons/dist/locked.js";

const btnOpenGroups = document.getElementById("btnOpenGroups");
const menuGroups = document.getElementById("menuGroups");

btnOpenGroups.addEventListener("click", function(event) {
	menuGroups.opener = btnOpenGroups;
	menuGroups.open = !menuGroups.open;
});

