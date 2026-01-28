import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type Dialog from "@ui5/webcomponents/dist/Dialog.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type { Result, Exception } from "@zxing/library";
import type { Interval } from "@ui5/webcomponents-base/dist/types.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
// eslint-disable-next-line import/no-extraneous-dependencies
import ZXing from "@ui5/webcomponents-fiori/dist/ssr-zxing.js";

// Texts
import {
	BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT,
	BARCODE_SCANNER_DIALOG_LOADING_TXT,
} from "./generated/i18n/i18n-defaults.js";

// Template
import BarcodeScannerDialogTemplate from "./BarcodeScannerDialogTemplate.js";

// Styles
import BarcodeScannerDialogCss from "./generated/themes/BarcodeScannerDialog.css.js";

// some tools handle named exports from UMD files and the window object is not assigned but the imports work (vitejs)
// other tools do not handle named exports (they are undefined after the import), but the window global is assigned and can be used (web dev server)
const windowZXing = typeof window === "undefined" ? {} : window.ZXing;
const effectiveZXing = { ...ZXing, ...windowZXing };
const { BrowserMultiFormatReader, NotFoundException } = effectiveZXing;

const defaultMediaConstraints = {
	audio: false,
	video: {
		height: {
			min: 480,
			ideal: 960,
			max: 1440,
		},
		aspectRatio: 1.333333333,
		facingMode: "environment",
	},
};

type BarcodeScannerDialogScanSuccessEventDetail = {
	text: string,
	rawBytes: Uint8Array,
};

type BarcodeScannerDialogScanErrorEventDetail = {
	message: string,
};

/**
 * @class
 *
 * ### Overview
 *
 * The `BarcodeScannerDialog` component provides barcode scanning functionality for all devices that support the `MediaDevices.getUserMedia()` native API.
 * Opening the dialog launches the device camera and scans for known barcode formats.
 *
 * A `scanSuccess` event fires whenever a barcode is identified
 * and a `scanError` event fires when the scan failed (for example, due to missing permisions).
 *
 * Internally, the component  uses the zxing-js/library third party OSS.
 *
 * For a list of supported barcode formats, see the [zxing-js/library](https://github.com/zxing-js/library) documentation.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 */
@customElement({
	tag: "ui5-barcode-scanner-dialog",
	languageAware: true,
	renderer: jsxRenderer,
	template: BarcodeScannerDialogTemplate,
	styles: [BarcodeScannerDialogCss],
})

/**
 * Fired when the user closes the component.
 * @since 2.0.0
 * @public
 */
@event("close", {
	bubbles: true,
})

/**
 * Fires when the scan is completed successfuuly.
 * @param {string} text the scan result as string
 * @param {Object} rawBytes the scan result as a Uint8Array
 * @public
 */
@event("scan-success", {
	bubbles: true,
})

/**
 * Fires when the scan fails with error.
 * @param {string} message the error message
 * @public
 */
@event("scan-error", {
	bubbles: true,
})

class BarcodeScannerDialog extends UI5Element {
	eventDetails!: {
		close: void,
		"scan-success": BarcodeScannerDialogScanSuccessEventDetail,
		"scan-error": BarcodeScannerDialogScanErrorEventDetail,
	}
	/**
	 * Defines the header HTML Element.
	 *
	 * **Note:** If `header` slot is provided, the labelling of the dialog is a responsibility of the application developer.
	 * `accessibleName` should be used.
	 *
	 * @public
	 * @since 2.4.0
	 */
	@slot()
	header!: Slot<HTMLElement[]>;

	/**
	 * Defines the footer HTML Element.
	 *
	 * **Note:** When you provide custom content for the `footer` slot, the default close button is not rendered.
	 * This means you need to include your own mechanism within the custom `footer` to close the dialog,
	 * such as a button with an event listener that closes the dialog.
	 *
	 * **Note:** If the `footer` slot is not provided, a default footer with a close button is rendered automatically,
	 * allowing users to close the dialog without any additional implementation.
	 *
	 * @public
	 * @since 2.4.0
	 */
	@slot()
	footer!: Slot<HTMLElement[]>;

	/**
	 * Indicates whether the dialog is open.
	 *
	 * @public
	 * @default false
	 * @since 1.24.0
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Indicates whether a loading indicator should be displayed while the scanner is loading.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Indicates whether the scanner is ready to scan.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	isReadyToScan = false;

	dialog?: Dialog;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;
	_codeReader: InstanceType<typeof BrowserMultiFormatReader>;
	_tempCanvas!: HTMLCanvasElement;
	_scanInterval!: Interval | null;
	_handleVideoPlayingBound: () => void;
	_handleCaptureRegionBound: () => void;

	constructor() {
		super();
		this._codeReader = new BrowserMultiFormatReader();
		this._handleVideoPlayingBound = this._handleVideoPlaying.bind(this);
		this._handleCaptureRegionBound = this._handleDrawCaptureRegion.bind(this);
	}

	async onAfterRendering() {
		if (!this._hasGetUserMedia()) {
			this.fireDecoratorEvent("scan-error", { message: "getUserMedia() is not supported by your browser" });
			return;
		}

		if (!this.open || this.loading) {
			return;
		}

		if (!this.isReadyToScan) {
			this.loading = true;
		}

		const video = this._getVideoElement();
		if (video.srcObject) {
			return;
		}

		try {
			const stream = await this._getUserPermission();
			video.addEventListener("loadeddata", this._handleVideoPlayingBound);
			video.srcObject = stream;
		} catch (error) {
			this.fireDecoratorEvent("scan-error", { message: (error as Error).message });
			this.loading = false;
		}
	}

	onEnterDOM() {
		super.onEnterDOM();
		window.addEventListener("resize", this._handleCaptureRegionBound);
	}

	onExitDOM() {
		super.onExitDOM();
		window.removeEventListener("resize", this._handleCaptureRegionBound);
	}

	get _open() {
		return this.open && this.isReadyToScan;
	}

	get _cancelButtonText() {
		return BarcodeScannerDialog.i18nBundle.getText(BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT);
	}

	get _busyIndicatorText() {
		return BarcodeScannerDialog.i18nBundle.getText(BARCODE_SCANNER_DIALOG_LOADING_TXT);
	}

	_hasGetUserMedia() {
		return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
	}

	_getUserPermission() {
		return navigator.mediaDevices.getUserMedia(defaultMediaConstraints);
	}

	_getVideoElement() {
		return this.shadowRoot!.querySelector<HTMLVideoElement>(".ui5-barcode-scanner-dialog-video")!;
	}

	_getOverlayCanvasElement() {
		return this.shadowRoot!.querySelector<HTMLCanvasElement>(".ui5-barcode-scanner-dialog-overlay")!;
	}

	/**
	 * CALCULATIONS
	 *
	 * The following methods are used to calculate the capture region
	 * and draw it on the overlay canvas.
	 * The capture region is a square area in the center of the video element
	 * where the barcode scanning is performed.
	 * The region is defined as a proportion of the video element's dimensions.
	 * The overlay canvas is used to draw a semi-transparent black overlay
	 * over the video element and a red border around the capture region.
	 * The overlay canvas is updated on every frame to ensure the capture region is always visible.
	 * The capture region is used to crop the video frame and extract the barcode image.
	 * The extracted image is then processed by the zxing-js library to decode the barcode.
	 */

	_calculateCaptureRegion(clientWidth: number, clientHeight: number) {
		// Define the maximum scan size as a proportion of the video element
		const maxScanProportion = 0.66666667; // 2:3
		// Calculate maximum square dimension based on video dimensions and max proportion
		const maxScanDimension = Math.min(clientWidth, clientHeight) * maxScanProportion;
		// Calculate offset to center the square scan region
		const xOffset = (clientWidth - maxScanDimension) / 2;
		const yOffset = (clientHeight - maxScanDimension) / 2;
		// Calculate the width and height of the scan region
		const scanWidth = Math.floor(maxScanDimension);
		const scanHeight = Math.floor(maxScanDimension);

		return {
			scanHeight,
			scanWidth,
			xOffset,
			yOffset,
		};
	}

	_drawCaptureRegion() {
		const videoElement = this._getVideoElement();
		const canvasElement = this._getOverlayCanvasElement();
		const context = canvasElement.getContext("2d")!;

		const videoClientWidth = videoElement.clientWidth;
		const videoClientHeight = videoElement.clientHeight;

		// Set canvas dimensions to match the video element's dimensions
		canvasElement.width = videoClientWidth;
		canvasElement.height = videoClientHeight;

		// Clear the canvas
		context.clearRect(0, 0, videoClientWidth, videoClientHeight);
		// Calculate the capture region
		const captureRegion = this._calculateCaptureRegion(videoClientWidth, videoClientHeight);

		// Draw a semi-transparent black overlay over the video
		context.fillStyle = "rgba(0, 0, 0, 0.5)";
		context.fillRect(0, 0, videoClientWidth, videoClientHeight);
		context.clearRect(captureRegion.xOffset, captureRegion.yOffset, captureRegion.scanWidth, captureRegion.scanHeight);

		// Draw red border around the capture region
		context.strokeStyle = "red";
		context.lineWidth = 1;
		context.strokeRect(captureRegion.xOffset, captureRegion.yOffset, captureRegion.scanWidth, captureRegion.scanHeight);

		// Display the overlay
		canvasElement.style.display = "block";
	}

	_getTempCanvasElement() {
		if (!this._tempCanvas) {
			this._tempCanvas = document.createElement("canvas");
		}
		return this._tempCanvas;
	}

	_captureFrame() {
		const video = this._getVideoElement();
		const tempCanvas = this._getTempCanvasElement();
		const context = tempCanvas.getContext("2d")!;

		const videoWidth = video.videoWidth;
		const videoHeight = video.videoHeight;
		const clientWidth = video.clientWidth;
		const clientHeight = video.clientHeight;

		const captureRegion = this._calculateCaptureRegion(clientWidth, clientHeight);

		// Calculate the ratio of videoSize to clientSize
		const ratioX = videoWidth / clientWidth;
		const ratioY = videoHeight / clientHeight;
		const scale = Math.min(ratioX, ratioY);

		// Calculate the scaled capture region
		const scaledXOffset = captureRegion.xOffset * scale;
		const scaledYOffset = captureRegion.yOffset * scale;
		const scaledScanWidth = captureRegion.scanWidth * scale;
		const scaledScanHeight = captureRegion.scanHeight * scale;

		// Set canvas dimensions to match the capture region dimensions
		tempCanvas.width = captureRegion.scanWidth;
		tempCanvas.height = captureRegion.scanHeight;

		// Clear the canvas
		context.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

		// Correct positioning if aspect ratios are different
		const positionX = (videoWidth - clientWidth * scale) / 2;
		const positionY = (videoHeight - clientHeight * scale) / 2;

		// Calculate final source position considering the video element's offset
		const finalXOffset = scaledXOffset + positionX;
		const finalYOffset = scaledYOffset + positionY;

		// Draw the portion of the video on the canvas
		context.drawImage(
			video,
			finalXOffset, finalYOffset, scaledScanWidth, scaledScanHeight, // Source rectangle
			0, 0, tempCanvas.width, tempCanvas.height, // Destination rectangle
		);

		return tempCanvas;
	}

	/**
	 * HANDLERS
	 */

	async _processFrame() {
		try {
			const canvas = this._captureFrame();
			const dataUrl = canvas.toDataURL();
			const result = await this._codeReader.decodeFromImageUrl(dataUrl);

			this._handleScanSuccess(result);
		} catch (error) {
			this._handleScanError(error as Exception);
		}
	}

	_handleScanSuccess(result: Result) {
		this.fireDecoratorEvent("scan-success", {
			text: result.getText(),
			rawBytes: result.getRawBytes(),
		});
	}

	_handleScanError(error: Exception) {
		if (error instanceof NotFoundException) {
			return;
		}

		this.fireDecoratorEvent("scan-error", { message: error.message });
	}

	_handleVideoPlaying() {
		const FRAME_PROCESSING_INTERVAL = 200; // 5 frames per second

		this.loading = false;
		this.isReadyToScan = true;

		// Wait for the next animation frame before drawing the capture region
		requestAnimationFrame(() => {
			this._drawCaptureRegion();
		});

		// Ensure any existing interval is cleared before setting a new one
		if (this._scanInterval) {
			clearInterval(this._scanInterval);
		}

		this._scanInterval = setInterval(() => {
			this._processFrame();
		}, FRAME_PROCESSING_INTERVAL);
	}

	_handleDrawCaptureRegion() {
		this._drawCaptureRegion();
	}

	_closeDialog() {
		this._resetReader();
		this.open = false;
		this.fireDecoratorEvent("close");
	}

	_resetReader() {
		const video = this._getVideoElement();
		video.pause();

		if (video.srcObject) {
			const stream = video.srcObject as MediaStream;
			const tracks = stream.getTracks();
			tracks.forEach(track => track.stop());
		}

		video.srcObject = null;
		video.removeEventListener("loadeddata", this._handleVideoPlayingBound);

		if (this._scanInterval) {
			clearInterval(this._scanInterval);
			this._scanInterval = null;
		}

		if (this._codeReader) {
			this._codeReader.reset();
		}

		const overlay = this._getOverlayCanvasElement();
		overlay.style.display = "none";

		// Reset the ready state
		this.isReadyToScan = false;
	}
}

BarcodeScannerDialog.define();

export default BarcodeScannerDialog;
export type {
	BarcodeScannerDialogScanErrorEventDetail,
	BarcodeScannerDialogScanSuccessEventDetail,
};
