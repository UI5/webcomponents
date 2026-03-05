import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState } from "react";
import BarcodeScannerDialogClass from "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/camera.js";

const BarcodeScannerDialog = createComponent(BarcodeScannerDialogClass);
const Button = createComponent(ButtonClass);
const Label = createComponent(LabelClass);

function App() {
  const [open, setOpen] = useState(false);

  const handleDlgScanUi5ScanSuccess = (e: UI5CustomEvent<BarcodeScannerDialogClass, "scan-success">) => {
    scanResult.innerHTML = e.detail.text;
	setOpen(false);
  };

  const handleDlgScanUi5ScanError = (e: UI5CustomEvent<BarcodeScannerDialogClass, "scan-error">) => {
    scanError.innerHTML = e.detail.message;
	setOpen(false);
  };

  return (
    <>
      <BarcodeScannerDialog open={open} id="dlgScan" onScanSuccess={handleDlgScanUi5ScanSuccess} onScanError={handleDlgScanUi5ScanError} onClose={() => setOpen(false)} />

        <Button id="btnScan" icon="camera" tooltip="Start Camera" onClick={() => setOpen(true)}>Scan</Button>
        <div>
            <Label id="scanResult" />
            <Label id="scanError" />
        </div>
    </>
  );
}

export default App;
