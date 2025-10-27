import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Toast.js";
import "@ui5/webcomponents-fiori/dist/Search.js";
import "@ui5/webcomponents-icons/dist/filter.js";

const toast = document.getElementById("advancedFilterToast");
document.getElementById("advancedButton").addEventListener("click", () => {
    toast.open = true;
});