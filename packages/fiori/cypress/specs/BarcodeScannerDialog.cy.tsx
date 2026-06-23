import BarcodeScannerDialog from "../../src/BarcodeScannerDialog.js";
import camera from "@ui5/webcomponents-icons/dist/camera.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Title from "@ui5/webcomponents/dist/Title.js";

describe("BarcodeScannerDialog", () => {
	let openDialogHandler: EventListener | null;
	let handleScanSuccess: (event: CustomEvent) => void;
	let handleScanError: (event: CustomEvent) => void;

	beforeEach(() => {
		cy.mount(
			<>
				<BarcodeScannerDialog id="dlgScan"></BarcodeScannerDialog>
				<Button id="btnScan" icon={camera}>Open Scanner Dialog</Button>

				<div>
					<Label id="scanResult"></Label>
					<Label id="scanError"></Label>
				</div>
			</>
		);

		cy.get("#dlgScan").as("dialog");
		cy.get("#btnScan").as("button");
		cy.get("@dialog")
			.shadow()
			.find(".ui5-barcode-scanner-dialog-video")
			.as("videoElement");

		// Add event listener to the button to open the dialog
		cy.document().then(doc => {
			const dlgScan = doc.querySelector<BarcodeScannerDialog>("#dlgScan")!;
			const btnScan = doc.querySelector("#btnScan")!;

			btnScan.addEventListener("click", () => {
				dlgScan.open = true;
			});
		});
	});

	afterEach(() => {
		// Remove event listeners if they were added
		cy.document().then(doc => {
			const dlgScan = doc.querySelector<BarcodeScannerDialog>("#dlgScan")!;
			if (handleScanSuccess) {
				dlgScan.removeEventListener("scan-success", handleScanSuccess as EventListener);
				handleScanSuccess = undefined!;
			}
			if (handleScanError) {
				dlgScan.removeEventListener("scan-error", handleScanError as EventListener);
				handleScanError = undefined!;
			}

			const btnScan = doc.querySelector("#btnScan");
			if (btnScan && openDialogHandler) {
				btnScan.removeEventListener("click", openDialogHandler);
			}
			openDialogHandler = null;

			// Clear the scan result and error
			const scanResultElement = doc.querySelector("#scanResult")!;
			const scanErrorElement = doc.querySelector("#scanError")!;
			scanResultElement.textContent = "";
			scanErrorElement.textContent = "";
		});
	});

	it("should open and close the dialog", () => {
		// Before clicking, the dialog should not be open
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog")
			.should("not.have.attr", "open");

		// Click the button to open the dialog
		cy.get("@button").realClick();

		// Wait for the video to be ready
		cy.get("@videoElement").should($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			expect(videoEl.readyState, "Video readyState should be >= 1").to.be.at.least(1);
		});

		// Assert that the dialog is open
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog")
			.should("have.attr", "open");

		// Close the dialog using the close button
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog slot[name=footer] ui5-button")
			.realClick();

		// Verify the dialog is closed
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog")
			.should("not.have.attr", "open");
	});

	it("closes barcode scanner dialog with escape key", () => {
		// Click the button to open the dialog
		cy.get("@button").realClick();

		// Wait for the video to be ready
		cy.get("@videoElement").should($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			expect(videoEl.readyState, "Video readyState should be >= 1").to.be.at.least(1);
		});

		// Assert that the dialog is open
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog")
			.should("have.attr", "open");

		// Simulate pressing the Escape key
		cy.get("@dialog").realPress("Escape");

		// Verify the dialog is closed
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog")
			.should("not.have.attr", "open");
	});

	it("opens barcode scanner dialog and checks video stream", () => {
		// Click the button to open the dialog
		cy.get("@button").realClick();

		// Wait for the video to be ready
		cy.get("@videoElement").should($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			expect(videoEl.readyState, "Video readyState should be >= 1").to.be.at.least(1);
		});

		// Assert that the dialog is open
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog")
			.should("have.attr", "open");

		// Check that video.srcObject is not null
		cy.get("@videoElement").should($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			// eslint-disable-next-line no-unused-expressions
			expect(videoEl.srcObject, "Video srcObject should not be null").to.not.be.null;
		});

		// Get the overlay canvas element
		cy.get("@dialog")
			.shadow()
			.find(".ui5-barcode-scanner-dialog-overlay")
			.as("overlayElement")
			.should("be.visible");

		// Check that the canvas dimensions match the video element's dimensions
		cy.get("@videoElement").then($video => {
			cy.get("@overlayElement").then($canvas => {
				expect(
					($canvas[0] as HTMLCanvasElement).width,
					"Canvas width should match video width",
				).to.equal($video[0].clientWidth);
				expect(
					($canvas[0] as HTMLCanvasElement).height,
					"Canvas height should match video height",
				).to.equal($video[0].clientHeight);
			});
		});
	});

	it("stops media tracks when the dialog is closed", () => {
		// Click the button to open the dialog
		cy.get("@button").realClick();

		// Wait for the video to be ready
		cy.get("@videoElement").should($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			expect(videoEl.readyState, "Video readyState should be >= 1").to.be.at.least(1);
		});

		// Assert that the dialog is open
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog")
			.should("have.attr", "open");

		// Save the media stream
		cy.get("@videoElement").then($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			cy.wrap(videoEl.srcObject).as("mediaStream");
		});

		// Close the dialog using the close button
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog slot[name=footer] ui5-button")
			.realClick();

		// Verify the dialog is closed
		cy.get("@dialog")
			.shadow()
			.find("ui5-dialog")
			.should("not.have.attr", "open");

		// Check that media tracks are stopped
		cy.get("@mediaStream").then(currentSubject => {
			const mediaStream = currentSubject as unknown as MediaStream;
			const tracksStopped = mediaStream
				.getTracks()
				.every(track => track.readyState === "ended");
			// eslint-disable-next-line no-unused-expressions
			expect(tracksStopped, "All media tracks should be stopped").to.be.true;
		});

		// Check that video srcObject is cleared
		cy.get("@videoElement").then($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			// eslint-disable-next-line no-unused-expressions
			expect(videoEl.srcObject, "Video srcObject should be null").to.be.null;
		});
	});

	it("displays the busy indicator while loading", () => {
		// Stub the _getUserPermission method to simulate delay
		cy.get("@dialog").then($dialog => {
			const dlgScan = $dialog.get(0) as BarcodeScannerDialog;

			const stub = cy
				.stub(dlgScan, "_getUserPermission")
				.callsFake(() => new Promise(() => { })); // Never resolves
			cy.wrap(stub).as("getUserPermissionStub");
		});

		// Open the dialog
		cy.get("@button").realClick();

		// Check that the busy indicator is visible
		cy.get("@dialog")
			.shadow()
			.find(".ui5-barcode-scanner-dialog-busy")
			.should("be.visible");

		// Restore the stub
		cy.get("@getUserPermissionStub").then(stub => {
			(stub as unknown as sinon.SinonStub).restore();
		});
	});

	it("handles scan success event", () => {
		// Define the event handler function
		handleScanSuccess = (event: CustomEvent) => {
			const detail = event.detail;
			const scanResultElement = document.querySelector("#scanResult")!;
			scanResultElement.textContent = detail.text;
		};

		// Get the scanResult element
		cy.get("#scanResult").as("scanResult");

		// Add event listener to display scan result
		cy.get("@dialog").then($dialog => {
			const dlgScan = $dialog.get(0) as BarcodeScannerDialog;
			dlgScan.addEventListener("scan-success", handleScanSuccess as EventListener);
		});

		// Open the dialog
		cy.get("@button").realClick();

		// Simulate scan success
		cy.get("@dialog").then($dialog => {
			const dlgScan = $dialog.get(0) as BarcodeScannerDialog;

			// Simulate the scan success
			dlgScan.fireDecoratorEvent("scan-success", {
				text: "mocked-scan-result",
				rawBytes: new Uint8Array(),
				format: "QR_CODE",
			});
		});

		// Check that the scan result is displayed
		cy.get("@scanResult").should("have.text", "mocked-scan-result");
	});

	it("includes barcode format string in scan-success event detail", () => {
		let capturedDetail: { text: string; rawBytes: Uint8Array; format: string } | undefined;

		handleScanSuccess = (event: CustomEvent) => {
			capturedDetail = event.detail;
		};

		cy.get("@dialog").then($dialog => {
			const dlgScan = $dialog.get(0) as BarcodeScannerDialog;
			dlgScan.addEventListener("scan-success", handleScanSuccess as EventListener);
		});

		cy.get("@button").realClick();

		// Wait for video to be ready (scan interval has started)
		cy.get("@videoElement").should($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			expect(videoEl.readyState, "Video readyState should be >= 1").to.be.at.least(1);
		});

		// Now stub _processFrame to call _handleScanSuccess with a mock Result returning QR_CODE format (11)
		cy.get("@dialog").then($dialog => {
			const dlgScan = $dialog.get(0) as BarcodeScannerDialog;
			const stub = cy.stub(dlgScan, "_processFrame").callsFake(() => {
				dlgScan._handleScanSuccess({
					getText: () => "mock-value",
					getRawBytes: () => new Uint8Array(),
					getBarcodeFormat: () => 11, // BarcodeFormat.QR_CODE
				} as any);
			});
			cy.wrap(stub).as("processFrameStub");
		});

		// Wait for the stub to be called at least once (scan interval is 200ms)
		cy.get("@processFrameStub").should("have.been.called");

		cy.then(() => {
			expect(capturedDetail).to.not.be.undefined;
			expect(capturedDetail!.text).to.equal("mock-value");
			expect(capturedDetail!.format).to.equal("QR_CODE");
		});
	});

	it("handles scan error event", () => {
		// Define the event handler function
		handleScanError = (event: CustomEvent) => {
			const detail = event.detail;
			const scanErrorElement = document.querySelector("#scanError")!;
			scanErrorElement.textContent = detail.message;
		};

		// Get the scanError element
		cy.get("#scanError").as("scanError");

		// Add event listener to display scan error
		cy.get("@dialog").then($dialog => {
			const dlgScan = $dialog.get(0) as BarcodeScannerDialog;
			dlgScan.addEventListener("scan-error", handleScanError as EventListener);
		});

		// Open the dialog
		cy.get("@button").realClick();

		// Simulate scan error
		cy.get("@dialog").then($dialog => {
			const dlgScan = $dialog.get(0) as BarcodeScannerDialog;

			// Simulate the scan error
			dlgScan.fireDecoratorEvent("scan-error", {
				message: "mocked-scan-error",
			});
		});

		// Check that the scan error is displayed
		cy.get("@scanError").should("have.text", "mocked-scan-error");
	});

	it("handles permission denied error", () => {
		// Define the event handler function
		handleScanError = (event: CustomEvent) => {
			const detail = event.detail;
			const scanErrorElement = document.querySelector("#scanError")!;
			scanErrorElement.textContent = detail.message;
		};

		// Get the scanError element
		cy.get("#scanError").as("scanError");

		// Stub getUserMedia to reject with "Permission denied"
		cy.window().then(win => {
			const stub = cy
				.stub(win.navigator.mediaDevices, "getUserMedia")
				.rejects(new DOMException("Permission denied", "NotAllowedError"));
			cy.wrap(stub).as("getUserMediaStub");
		});

		// Add event listener to display scan error
		cy.get("@dialog").then($dialog => {
			const dlgScan = $dialog.get(0) as BarcodeScannerDialog;
			dlgScan.addEventListener("scan-error", handleScanError as EventListener);
		});

		// Open the dialog
		cy.get("@button").realClick();

		// Check that the scan error is displayed
		cy.get("@scanError").should("contain.text", "Permission denied");

		// Restore the stub
		cy.get("@getUserMediaStub").then(stub => {
			(stub as unknown as sinon.SinonStub).restore();
		});
	});
});

describe("BarcodeScannerDialog with Custom Slots", () => {
	let openDialogHandler: EventListener | null;
	let closeDialogHandler: EventListener | null;

	beforeEach(() => {
		cy.mount(
			<>
				<BarcodeScannerDialog id="dlgScanCustom">
					<div slot="header" class="custom-dialog-header">
						<Title level="H2">My Custom Header</Title>
					</div>
					<div slot="footer" class="custom-dialog-footer">
						<Button id="customCloseBtn">My Custom Close Button</Button>
					</div>
				</BarcodeScannerDialog>
				<Button id="btnScanCustom" icon={camera}>Open Custom Scanner Dialog</Button>
			</>
		);

		cy.get("#dlgScanCustom").as("customDialog");
		cy.get("#btnScanCustom").as("customButton");
		cy.get("@customDialog")
			.shadow()
			.find(".ui5-barcode-scanner-dialog-video")
			.as("videoElement");

		cy.document().then(doc => {
			const dlgScanCustom = doc.querySelector<BarcodeScannerDialog>("#dlgScanCustom")!;
			const btnScanCustom = doc.querySelector("#btnScanCustom")!;
			const btnScanCustomClose = doc.querySelector("#customCloseBtn")!;

			btnScanCustom.addEventListener("click", () => {
				dlgScanCustom.open = true;
			});

			btnScanCustomClose.addEventListener("click", () => {
				dlgScanCustom.open = false;
			});
		});
	});

	afterEach(() => {
		cy.document().then(doc => {
			const btnScanCustom = doc.querySelector("#btnScanCustom");
			const btnScanCustomClose = doc.querySelector("#customCloseBtn");

			if (btnScanCustom && openDialogHandler) {
			  btnScanCustom.removeEventListener("click", openDialogHandler);
			}
			openDialogHandler = null;

			if (btnScanCustomClose && closeDialogHandler) {
			  btnScanCustomClose.removeEventListener("click", closeDialogHandler);
			}

			closeDialogHandler = null;
		});
	});

	it("renders custom header when provided", () => {
		// Click the button to open the custom dialog
		cy.get("@customButton").realClick();

		// Wait for the video to be ready
		cy.get("@videoElement").should($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			expect(videoEl.readyState, "Video readyState should be >= 1").to.be.at.least(1);
		});

		// Assert that the dialog is open
		cy.get("@customDialog")
			.shadow()
			.find("ui5-dialog")
			.should("have.attr", "open");

		// Verify that the custom header is rendered
		cy.get("@customDialog")
			.find("[slot=header] ui5-title")
			.should("contain.text", "My Custom Header");
	});

	it("renders custom footer and functions correctly", () => {
		// Click the button to open the custom dialog
		cy.get("@customButton").realClick();

		// Wait for the video to be ready
		cy.get("@videoElement").should($video => {
			const videoEl = $video[0] as HTMLVideoElement;
			expect(videoEl.readyState, "Video readyState should be >= 1").to.be.at.least(1);
		});

		// Assert that the dialog is open
		cy.get("@customDialog")
			.shadow()
			.find("ui5-dialog")
			.should("have.attr", "open");

		// Verify that the custom footer is rendered
		cy.get("@customDialog")
			.find("[slot=footer] ui5-button")
			.should("contain.text", "My Custom Close Button");

		// Test that the custom button closes the dialog
		cy.get("@customDialog")
			.find("#customCloseBtn")
			.realClick();

		// Verify the dialog is closed
		cy.get("@customDialog")
			.shadow()
			.find("ui5-dialog")
			.should("not.have.attr", "open");
	});
});
