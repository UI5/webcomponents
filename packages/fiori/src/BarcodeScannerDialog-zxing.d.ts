declare module "@zxing/library/umd/index.min.js" {
	import type { BrowserMultiFormatReader as BrowserMultiFormatReaderT, NotFoundException as NotFoundExceptionT, BarcodeFormat as BarcodeFormatT } from "@zxing/library";

	export const BrowserMultiFormatReader: typeof BrowserMultiFormatReaderT;
	export const NotFoundException: typeof NotFoundExceptionT;
	export const BarcodeFormat: typeof BarcodeFormatT;
}
