import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState } from "react";
import BarcodeScannerDialogClass from "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/camera.js";

const BarcodeScannerDialog = createReactComponent(BarcodeScannerDialogClass);
const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);

function App() {
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [scanError, setScanError] = useState("");

  const handleDlgScanUi5ScanSuccess = (
    e: UI5CustomEvent<BarcodeScannerDialogClass, "scan-success">,
  ) => {
    setScanResult(e.detail.text);
    setOpen(false);
  };

  const handleDlgScanUi5ScanError = (
    e: UI5CustomEvent<BarcodeScannerDialogClass, "scan-error">,
  ) => {
    setScanError(e.detail.message);
    setOpen(false);
  };

  return (
    <>
      <BarcodeScannerDialog
        open={open}
        id="dlgScan"
        onScanSuccess={handleDlgScanUi5ScanSuccess}
        onScanError={handleDlgScanUi5ScanError}
        onClose={() => setOpen(false)}
      />

      <Button
        id="btnScan"
        icon="camera"
        tooltip="Start Camera"
        onClick={() => setOpen(true)}
      >
        Scan
      </Button>
      <div>
        <Label>{scanResult}</Label>
        <Label>{scanError}</Label>
      </div>
    </>
  );
}

export default App;
