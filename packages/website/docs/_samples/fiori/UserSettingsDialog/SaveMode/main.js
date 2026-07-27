import "@ui5/webcomponents-fiori/dist/UserSettingsAccountView.js";
import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js";
import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js";
import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewGroup.js";
import "@ui5/webcomponents-fiori/dist/UserSettingsView.js";
import "@ui5/webcomponents-fiori/dist/UserSettingsItem.js";
import "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import "@ui5/webcomponents-fiori/dist/UserMenu.js"
import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";
import "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Panel.js";
import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Switch.js";
import "@ui5/webcomponents/dist/Toast.js";

import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/user-settings.js";
import "@ui5/webcomponents-icons/dist/person-placeholder.js";
import "@ui5/webcomponents-icons/dist/palette.js";
import "@ui5/webcomponents-icons/dist/reset.js";

const shellbar = document.getElementById("shellbar");
const menuShellBar = document.getElementById("userMenuShellBar");
const settingsDialog = document.getElementById("settings");
const settingsDialogItems = [...document.getElementsByTagName("ui5-user-settings-item")];
const account = document.getElementById("account");
const resetAllButton = document.getElementById("reset-all-button");
// Theme change
const appearanceView = document.querySelector("ui5-user-settings-appearance-view");
//Language and Region
const languageRegion = document.getElementById("language-region-container");
const language = document.getElementById("language");
const regionSettings = [...languageRegion.querySelectorAll(".language-region-control")];
const additionalDialog = document.getElementById("additionalDialog");
const dialogClosers = [...additionalDialog.querySelectorAll(".dialogCloser")];

const resetAll = document.getElementById("resetAll");
const resetPersonalization = document.getElementById("resetPersonalization");
const toastReset =  document.getElementById("toastReset");
const toastResetAll =  document.getElementById("toastResetAll");

shellbar.addEventListener("ui5-profile-click", (event) => {
	console.log(" menuShellBar ui5-profile-click")

	menuShellBar.opener = event.detail.targetRef;
	if (menuShellBar.open) {
		menuShellBar.open = false;
	} else {
		menuShellBar.open = true;
	}
});

menuShellBar.addEventListener("item-click", function (event) {
	console.log(" menuShellBar item-click")
	const item = event.detail.item.getAttribute("data-id");

	switch (item) {
		case "setting":
			settingsDialog.open = true;
	}
});

account.addEventListener("edit-accounts-click", function () {
	console.log("Avatar clicked");
});

account.addEventListener("manage-account-click", function () {
	console.log("Manage account clicked");
});

resetAllButton.addEventListener("click", function () {
	additionalDialog.open = true;
});

//Language and Region
language.addEventListener("selection-change",  function (event) {
	additionalDialog.open = true;
});

// Theme change
appearanceView.addEventListener("selection-change", (e) => {
	const selectedItem = e.detail.item;

	if (selectedItem?.itemKey) {
		setTheme(selectedItem.itemKey);
	}
});

dialogClosers.forEach(btn => {
	btn.addEventListener("click", () => {
		additionalDialog.open = false;
	});
});

regionSettings.forEach((settingsItem) => {
	settingsItem.addEventListener("selection-change",  function (event) {
		console.log(`Selection change: ${event?.detail.item?.text}`, event.detail);
	});
});

resetPersonalization.addEventListener("click", function () {
	toastReset.open = true;
});

resetAll.addEventListener("click", function () {
	toastResetAll.open = true;
});

settingsDialog.addEventListener("selection-change", function (event) {
	console.log(`Selection change: ${event.detail.item.text}`, event.detail);
	if(event.detail.item.text ==="Language and Region"){
		event.detail.item.loading=true;
		event.detail.item.loadingReason="Language & Region loading data...";
		setTimeout(function(){
			event.detail.item.loading=false;
		}, 500);
	}
});

settingsDialogItems.forEach((settingsDialogItem) => {
	settingsDialogItem.addEventListener("selection-change", function (event) {
		console.log(`Selection change: ${event.detail.view.text}`, event.detail);
	});
});

settingsDialog.addEventListener("open", function (event) {
	console.log("Settings dialog opened", event);
});

settingsDialog.addEventListener("before-close", function (event) {
	console.log("Settings dialog before close", event.detail);
	if (!confirm("Are you sure you want to close the dialog?")) {
		event.preventDefault();
	}
});

settingsDialog.addEventListener("close", function (event) {
	console.log("Settings dialog closed", event);
});

// Save-mode demo: Save opens a confirmation dialog; Yes closes the settings dialog, No returns to it.
// Cancel closes the settings dialog directly. In a real application the Save flow would trigger
// the backend persistence and close after success.
const confirmSaveDialog = document.getElementById("confirmSaveDialog");
const confirmSaveYes = document.getElementById("confirmSaveYes");
const confirmSaveNo = document.getElementById("confirmSaveNo");

settingsDialog.addEventListener("save", function () {
	console.log("Save clicked");
	confirmSaveDialog.open = true;
});

settingsDialog.addEventListener("cancel", function () {
	console.log("Cancel clicked — closing dialog");
	settingsDialog.open = false;
});

confirmSaveYes.addEventListener("click", function () {
	confirmSaveDialog.open = false;
	settingsDialog.open = false;
});
confirmSaveNo.addEventListener("click", function () {
	confirmSaveDialog.open = false;
});
