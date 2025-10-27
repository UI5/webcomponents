import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import "@ui5/webcomponents-fiori/dist/UserMenu.js";
import "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";

import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/collaborate.js";
import "@ui5/webcomponents-icons/dist/official-service.js";
import "@ui5/webcomponents-icons/dist/private.js";
import "@ui5/webcomponents-icons/dist/accelerated.js";

const shellbar = document.getElementById("shellbar");
const menu = document.getElementById("userMenu");

shellbar.addEventListener("ui5-profile-click", (event) => {
	menu.opener = event.detail.targetRef;
	menu.open = true;
});

menu.addEventListener("item-click", function (event) {
	const item = event.detail.item.getAttribute("data-id");

	switch (item) {
		case "setting":
			console.log("Open Setting Dialog");
			break;
		case "privacy-policy":
			console.log("Privacy Policy");
			break;
		case "terms-of-use":
			console.log("Terms of Use");
			break;
		case "account-action1":
			console.log("Product-specific account action 1");
			break;
		case "account-action2":
			console.log("Product-specific account action 2");
			break;
		default:
			console.log("Default");
	}
});

menu.addEventListener("avatar-click", function () {
	console.log("Avatar clicked");
});

menu.addEventListener("sign-out-click", function (event) {
	console.log("Sign Out clicked");

	const result = prompt("Sign Out", "Are you sure you want to sign out?");
	if (result) {
		menu.open = false;
	}
	event.preventDefault();
});