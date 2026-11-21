export declare const LOADING_DELAY = 100;
type AnnounceState = "Loading" | "Loaded" | "None";
type LoadItemsReason = "input" | "open" | "arrowNav";
export interface LoadingDelegateConfig {
    getItemCount: () => number;
    isLoading: () => boolean;
    isOpen: () => boolean;
    fireLoadItems: (reason: LoadItemsReason) => void;
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
    constructor(config: LoadingDelegateConfig);
    init(loading: boolean): void;
    onBeforeRendering(loading: boolean): void;
    announceLoadingState(): void;
    fireOnDropdownOpen(): void;
    fireOnInput(): void;
}
export type { LoadItemsReason };
