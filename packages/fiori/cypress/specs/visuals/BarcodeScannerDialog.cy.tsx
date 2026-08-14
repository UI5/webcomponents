import BarcodeScannerDialog from "../../../src/BarcodeScannerDialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Title from "@ui5/webcomponents/dist/Title.js";

// Opens the dialog by bypassing the camera: stubs getUserMedia and sets isReadyToScan
// so the inner Dialog becomes visible without a real media stream.
const openDialog = (id: string) => {
	cy.get(`[ui5-barcode-scanner-dialog]#${id}`).then($el => {
		const dlg = $el.get(0) as BarcodeScannerDialog;
		cy.stub(dlg, "_getUserPermission").returns(
			Promise.resolve(new MediaStream()),
		);
		dlg.open = true;
		dlg.isReadyToScan = true;
	});
	cy.get(`[ui5-barcode-scanner-dialog]#${id}`)
		.shadow()
		.find("[ui5-dialog]")
		.ui5DialogOpened();
};

describe("BarcodeScannerDialog visual", () => {
	it("closed state — default", () => {
		cy.mount(<BarcodeScannerDialog id="dlg" />);
		cy.screenshot();
	});

	it("open state — default footer", () => {
		cy.mount(<BarcodeScannerDialog id="dlg" />);
		openDialog("dlg");
		cy.screenshot();
	});

	it("open state — custom header slot", () => {
		cy.mount(
			<BarcodeScannerDialog id="dlg">
				<div slot="header">
					<Title level="H2">Scan Barcode</Title>
				</div>
			</BarcodeScannerDialog>,
		);
		openDialog("dlg");
		cy.screenshot();
	});

	it("open state — custom footer slot", () => {
		cy.mount(
			<BarcodeScannerDialog id="dlg">
				<div slot="footer">
					<Button design="Emphasized">Done</Button>
					<Button>Cancel</Button>
				</div>
			</BarcodeScannerDialog>,
		);
		openDialog("dlg");
		cy.screenshot();
	});

	it("open state — custom header and footer slots", () => {
		cy.mount(
			<BarcodeScannerDialog id="dlg">
				<div slot="header">
					<Title level="H2">Scan QR Code</Title>
				</div>
				<div slot="footer">
					<Button design="Emphasized">Confirm</Button>
					<Button>Close</Button>
				</div>
			</BarcodeScannerDialog>,
		);
		openDialog("dlg");
		cy.screenshot();
	});

	it("compact mode — open state", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<BarcodeScannerDialog id="dlg" />
			</div>,
		);
		openDialog("dlg");
		cy.screenshot();
	});
});
