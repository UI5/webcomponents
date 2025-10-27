import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/MessageStrip.js";
import "@ui5/webcomponents-icons/dist/action-settings.js"
import "@ui5/webcomponents-icons/dist/sort.js"
import "@ui5/webcomponents-icons/dist/crm-sales.js";
import "@ui5/webcomponents-icons/dist/expense-report.js";
import "@ui5/webcomponents/dist/Link.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import "@ui5/webcomponents-fiori/dist/NotificationList.js";
import "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import "@ui5/webcomponents-fiori/dist/illustrations/NoNotifications.js";

const shellbar = document.querySelector("ui5-shellbar");
const notificationsPopover = document.querySelector(".notificationsPopover");
const notificationList = document.querySelector(".notificationsPopoverList");
const notificationsPopoverMessageStrip = document.querySelector(".notificationsMessageStrip");
const btnShowMessageStrip = document.querySelector("#show-message-strip");
const btnClearAll = document.querySelector("#clear-all");
const clearAllDialog = document.querySelector("#clear-all-dialog");
var dialogClosers = [...clearAllDialog.querySelectorAll(".dialogCloser")];
const btnClearAllAction = document.querySelector("#clear-all-action");
const notificationsListGroupGrowing = document.querySelector("#notificationsListGroupGrowing");
const btnOpenMenuSort = document.getElementById("btn-sort");
const menu = document.getElementById("sort-menu");

const itemsToLoad = 10;
let itemsLoaded = 6;

notificationList.addEventListener("item-close", e => {
	let visibleItems = 0;

	// hide the closed Notification item
	e.detail.item.hidden = true;

	Array.from(e.detail.item.parentElement.childNodes).forEach((element) => {
		if (element.nodeName === "UI5-LI-NOTIFICATION" && !element.hidden) {
			visibleItems++;
		}
	});

	// hide the Notification group if empty
	if (visibleItems === 0) {
		e.detail.item.parentElement.hidden = true;
	}
});

shellbar.addEventListener("notifications-click", e => {
	e.preventDefault();
	notificationsPopover.opener = e.detail.targetRef;
	notificationsPopover.open = true;
});

const insertItems = (list) => {
	for (var i = itemsLoaded + 1; i <= itemsLoaded + itemsToLoad; i++) {
		list.insertAdjacentHTML("beforeend",
			`<ui5-li-notification title-text="Notification Title  ${i}" show-close>
				<ui5-avatar icon="expense-report" color-scheme="Accent1" shape="Square" size="XS" slot="avatar"></ui5-avatar>
				<span slot="footnotes">Product Name</span>
				<span slot="footnotes">Now</span>
				<ui5-menu slot="menu">
					<ui5-menu-item text="Unsubscribe"></ui5-menu-item>
				</ui5-menu>
				Description ${i}
			</ui5-li-notification>`);
	}

	itemsLoaded += itemsToLoad;
};

notificationsListGroupGrowing.addEventListener("load-more", (e) => {
	const focusIndex = notificationsListGroupGrowing.items.length;

	notificationsListGroupGrowing.loading = true;
	setTimeout(() => {
		insertItems(notificationsListGroupGrowing);
		notificationsListGroupGrowing.loading = false;

		setTimeout(() => {
			notificationsListGroupGrowing.items[focusIndex].focus();
		}, 500);
	}, 2000);
});

btnShowMessageStrip.addEventListener("click", function() {
	notificationsPopoverMessageStrip.style.display = "inline-block";
});

notificationsPopoverMessageStrip.addEventListener("close", function() {
	notificationsPopoverMessageStrip.style.display = "none";
});

btnClearAll.accessibilityAttributes = {
    hasPopup: "dialog",
    controls: clearAllDialog.id,
};

btnClearAll.addEventListener("click", () => {
    clearAllDialog.open = true;
});

dialogClosers.forEach(btn => {
    btn.addEventListener("click", () => {
        clearAllDialog.open = false;
    });
});

btnClearAllAction.addEventListener("click", () => {
	notificationList.innerHTML = `<ui5-illustrated-message name="NoNotifications"></ui5-illustrated-message>`;
});

btnOpenMenuSort.addEventListener("click", () => {
	menu.opener = btnOpenMenuSort;
	menu.open = true;
});
