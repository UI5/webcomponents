export {};

declare global {

	type VersionInfo = {
		version: string,
		major: number,
		minor: number,
		patch: number,
		suffix: string,
		isNext: boolean,
		buildTime: number,
	}

	interface Window {
		sap: any;
		chrome: any;
		v8: any;
	}

	module "*generated/AssetParameters.js" {
		const DEFAULT_THEME: string;
		const SUPPORTED_THEMES: Array<string>;
		const DEFAULT_LANGUAGE: string;
		const DEFAULT_LOCALE: string;
		const SUPPORTED_LOCALES: Array<string>;
		export {
			DEFAULT_THEME,
			SUPPORTED_THEMES,
			DEFAULT_LANGUAGE,
			DEFAULT_LOCALE,
			SUPPORTED_LOCALES,
		};
	}

	module "*generated/VersionInfo.js" {
		const content: VersionInfo;
		export default content;
	}
}
