import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents-icons/dist/decline.js";

var dialogOpener = document.getElementById("dialogOpener");
var dialog = document.getElementById("dialog");
var dialogClosers = [...dialog.querySelectorAll(".dialogCloser")];

dialogOpener.accessibilityAttributes = {
    hasPopup: "dialog",
    controls: dialog.id,
};
dialogOpener.addEventListener("click", () => {
    dialog.open = true;
});
dialogClosers.forEach(btn => {
    btn.addEventListener("click", () => {
        dialog.open = false;
    });
})