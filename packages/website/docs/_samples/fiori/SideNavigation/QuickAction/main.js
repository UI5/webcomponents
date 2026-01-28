import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigation.js";

import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/write-new.js";

import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Text.js";

const quickAction = document.getElementById("quickAction");
const dialog = document.getElementById("quickActionDialog");

// mandatory attribute for action items that open dialog
quickAction.accessibilityAttributes = {
	hasPopup: "dialog"
};

quickAction.addEventListener("click", () => {
	dialog.open = true;
});

document.getElementById("quickActionCloseBtn").addEventListener("click", () => {
	dialog.open = false;
});
