import { createReactComponent } from "@ui5/webcomponents-base";
import BarcodeScannerDialogClass from "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const BarcodeScannerDialog = createReactComponent(BarcodeScannerDialogClass);
const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);

function App() {

  const handleClick = () => {
    dlgScan.open = true;
  };

  const handleUi5ScanSuccess = (e) => {
    scanResult.innerHTML = e.detail.text;
	dlgScan.open = false;
  };

  const handleUi5ScanError = (e) => {
    scanError.innerHTML = e.detail.message;
	dlgScan.open = false;
  };

  return (
    <>
      <BarcodeScannerDialog id="dlgScan" />

        <Button id="btnScan" icon="camera" tooltip="Start Camera">Scan</Button>
        <div>
            <Label id="scanResult" />
            <Label id="scanError" />
        </div>
    </>
  );
}

export default App;
