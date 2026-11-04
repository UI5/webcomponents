import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";
import "@ui5/webcomponents-icons/dist/camera.js"

const dlgScan = document.getElementById("dlgScan");
const btnScan = document.getElementById("btnScan");
const scanResult = document.getElementById("scanResult");
const scanError = document.getElementById("scanError");

btnScan.addEventListener("click", (event) => {
	dlgScan.open = true;
});

dlgScan.addEventListener("ui5-scan-success", (event) => {
	scanResult.innerHTML = event.detail.text;
	dlgScan.open = false;
});

dlgScan.addEventListener("ui5-scan-error", (event) => {
	scanError.innerHTML = event.detail.message;
	dlgScan.open = false;
});
