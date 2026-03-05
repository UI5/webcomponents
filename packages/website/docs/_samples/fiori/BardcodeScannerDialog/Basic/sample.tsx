import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import BarcodeScannerDialogClass from "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/camera.js";

const BarcodeScannerDialog = createComponent(BarcodeScannerDialogClass);
const Button = createComponent(ButtonClass);
const Label = createComponent(LabelClass);

function App() {
  const dlgScanRef = useRef(null);

  const handleBtnScanClick = () => {
    dlgScanRef.current!.open = true;
  };

  const handleDlgScanUi5ScanSuccess = (e: UI5CustomEvent<BarcodeScannerDialogClass, "scan-success">) => {
    scanResult.innerHTML = e.detail.text;
	dlgScanRef.current!.open = false;
  };

  const handleDlgScanUi5ScanError = (e: UI5CustomEvent<BarcodeScannerDialogClass, "scan-error">) => {
    scanError.innerHTML = e.detail.message;
	dlgScanRef.current!.open = false;
  };

  return (
    <>
      <BarcodeScannerDialog ref={dlgScanRef} id="dlgScan" onScanSuccess={handleDlgScanUi5ScanSuccess} onScanError={handleDlgScanUi5ScanError} />

        <Button id="btnScan" icon="camera" tooltip="Start Camera" onClick={handleBtnScanClick}>Scan</Button>
        <div>
            <Label id="scanResult" />
            <Label id="scanError" />
        </div>
    </>
  );
}

export default App;
