import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import BarcodeScannerDialogClass from "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/camera.js";

const BarcodeScannerDialog = createReactComponent(BarcodeScannerDialogClass);
const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);

function App() {
  const dlgScanRef = useRef(null);

  const handleBtnScanClick = () => {
    dlgScanRef.current!.open = true;
  };

  const handleDlgScanUi5ScanSuccess = (e) => {
    scanResult.innerHTML = e.detail.text;
	dlgScanRef.current!.open = false;
  };

  const handleDlgScanUi5ScanError = (e) => {
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
