import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";

export const LOADING_DELAY = 100;

type AnnounceState = "loading" | "loaded" | undefined;

export interface LoadingDelegateConfig {
	getItemCount: () => number;
	isLoading: () => boolean;
	isOpen: () => boolean;
	fireLoadStarted: (shouldOpenPicker: boolean) => void;
	loadingMessage: () => string;
	loadedMessage: () => string;
	loadedItemMessage: () => string;
	loadedItemsMessage: (count: number) => string;
	onLoadingEnd?: () => void;
}

export default class ComboBoxLazyLoading {
	_config: LoadingDelegateConfig;
	_prevLoading: boolean;
	_announceLoading: AnnounceState;

	constructor(config: LoadingDelegateConfig) {
		this._config = config;
		this._prevLoading = false;
	}

	init(loading: boolean) {
		this._prevLoading = loading;
	}

	onBeforeRendering(loading: boolean) {
		if (!this._prevLoading && loading) {
			this._announceLoading = "loading";
		} else if (this._prevLoading && !loading) {
			this._announceLoading = "loaded";
			this._config.onLoadingEnd?.();
		}
		this._prevLoading = loading;
	}

	announceLoadingState() {
		if (this._announceLoading === "loading") {
			announce(this._config.loadingMessage(), InvisibleMessageMode.Polite);
		} else if (this._announceLoading === "loaded") {
			const count = this._config.getItemCount();
			const itemsMsg = count === 1
				? this._config.loadedItemMessage()
				: this._config.loadedItemsMessage(count);
			announce(`${this._config.loadedMessage()}. ${itemsMsg}`, InvisibleMessageMode.Polite);
		}
		this._announceLoading = undefined;
	}

	// Fires load-start event when the picker is about to open and there are no items yet.
	// shouldOpenPicker=false: caller will open the picker itself (e.g. arrow click).
	// shouldOpenPicker=true: app must open the picker when loading starts.
	fireOnDropdownOpen() {
		if (!this._config.isOpen() && !this._config.isLoading() && this._config.getItemCount() === 0) {
			this._config.fireLoadStarted(false);
		}
	}

	fireOnInput() {
		if (!this._config.isLoading()) {
			this._config.fireLoadStarted(true);
		}
	}
}
