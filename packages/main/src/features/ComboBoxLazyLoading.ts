import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";

export const LOADING_DELAY = 100;

type AnnounceState = "Loading" | "Loaded" | "None";
type LoadItemsReason = "input" | "open";

export interface LoadingDelegateConfig {
	getItemCount: () => number;
	isLoading: () => boolean;
	isOpen: () => boolean;
	fireLoadItems: (reason: LoadItemsReason, signal: AbortSignal) => void;
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
	_abortController?: AbortController;

	constructor(config: LoadingDelegateConfig) {
		this._config = config;
		this._prevLoading = false;
		this._announceLoading = "None";
	}

	init(loading: boolean) {
		this._prevLoading = loading;
	}

	onBeforeRendering(loading: boolean) {
		if (!this._prevLoading && loading) {
			this._announceLoading = "Loading";
		} else if (this._prevLoading && !loading) {
			this._announceLoading = "Loaded";
			this._config.onLoadingEnd?.();
		}
		this._prevLoading = loading;
	}

	announceLoadingState() {
		if (this._announceLoading === "Loading") {
			announce(this._config.loadingMessage(), InvisibleMessageMode.Polite);
		} else if (this._announceLoading === "Loaded") {
			const count = this._config.getItemCount();
			const itemsMsg = count === 1
				? this._config.loadedItemMessage()
				: this._config.loadedItemsMessage(count);
			announce(`${this._config.loadedMessage()}. ${itemsMsg}`, InvisibleMessageMode.Polite);
		}
		this._announceLoading = "None";
	}

	// Aborts the AbortSignal of the previous load-items event (so the app can cancel
	// an outdated fetch), creates a fresh controller, and fires the new load-items.
	_fireLoadItems(reason: LoadItemsReason) {
		this._abortController?.abort();
		this._abortController = new AbortController();
		this._config.fireLoadItems(reason, this._abortController.signal);
	}

	// Fires load-items event when the picker is about to open and there are no items yet.
	// shouldOpenPicker=false: caller will open the picker itself (e.g. arrow click).
	// shouldOpenPicker=true: app must open the picker when loading starts.
	fireOnDropdownOpen() {
		if (!this._config.isOpen() && !this._config.isLoading() && this._config.getItemCount() === 0) {
			this._fireLoadItems("open");
		}
	}

	fireOnInput() {
		this._fireLoadItems("input");
	}
}

export type { LoadItemsReason };
