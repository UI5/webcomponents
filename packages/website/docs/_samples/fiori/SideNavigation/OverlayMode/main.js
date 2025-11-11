import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import "@ui5/webcomponents/dist/ResponsivePopover.js"
import "@ui5/webcomponents-fiori/dist/Page.js"
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/chain-link.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/write-new.js";
import "@ui5/webcomponents-icons/dist/widgets.js";
import "@ui5/webcomponents-icons/dist/compare.js";

menuBtn.addEventListener("click", function () {
	respPopover.open = !respPopover.open;
});

//By design on clicking on an element the popover should close
sideNavigation.addEventListener("selection-change", function (event) {
	if (event.detail.item.getAttribute("target")) {
		respPopover.open=false;
		return;
	}

	const contentItems = document.querySelectorAll(".contentItem");
	contentItems.forEach(item => {
		item.classList.remove("contentItemVisible");
	});
	document.getElementById(event.detail.item.getAttribute("href").replace("#", ""))?.classList.add("contentItemVisible");

	respPopover.open=false;
});

quickAction.accessibilityAttributes = {
	hasPopup: "dialog"
};

quickAction.addEventListener("click", () => {
	quickActionDialog.open = true;
});

quickActionCloseBtn.addEventListener("click", () => {
	quickActionDialog.open = false;
});