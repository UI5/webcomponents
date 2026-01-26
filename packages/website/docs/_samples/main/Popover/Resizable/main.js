import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Toolbar.js";
import "@ui5/webcomponents/dist/ToolbarButton.js";

var popoverOpener = document.getElementById("popoverOpener");
var popover = document.getElementById("popover");
var popoverClosers = popover.querySelector(".popoverCloser");

popoverOpener.accessibilityAttributes = {
    hasPopup: "dialog",
    controls: popover.id,
};
popoverOpener.addEventListener("click", () => {
	popover.open = true;
});
popoverClosers.forEach(btn => {
    btn.addEventListener("click", () => {
		popover.open = false;
    });
})