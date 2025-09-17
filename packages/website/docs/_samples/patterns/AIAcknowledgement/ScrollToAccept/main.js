import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/CheckBox.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Panel.js";
import "@ui5/webcomponents/dist/Icon.js";

const dialog = document.getElementById("dialog"),
	acceptButton = document.getElementById("acceptButton"),
	termsPanel = document.getElementById("termsPanel"),
	checkbox = document.getElementById("termsCheck");

let hasScrolledToBottom = false;

dialog.open = true;

acceptButton.addEventListener("click", function (event) {
	if (!hasScrolledToBottom || !checkbox.checked) {
		event.preventDefault();
	}
});

checkbox.addEventListener("mousedown", (event) => {
	if (!hasScrolledToBottom) {
		event.preventDefault();
	}
});

checkbox.addEventListener("change", () => {
	acceptButton.disabled = !(hasScrolledToBottom && checkbox.checked);
});

termsPanel.addEventListener("scroll", function () {
	const scrollTop = termsPanel.scrollTop,
		clientHeight = termsPanel.clientHeight,
		scrollHeight = termsPanel.scrollHeight,
		atBottom = scrollTop + clientHeight >= scrollHeight - 1;

	if (atBottom) {
		hasScrolledToBottom = true;
		acceptButton.disabled = !checkbox.checked;
	}
});