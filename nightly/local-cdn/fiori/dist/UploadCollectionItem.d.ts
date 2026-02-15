import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import ListItem from "@ui5/webcomponents/dist/ListItem.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import UploadState from "./types/UploadState.js";
import "@ui5/webcomponents-icons/dist/refresh.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 * A component to be used within the `ui5-upload-collection`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";`
 * @constructor
 * @extends ListItem
 * @public
 * @slot {Node[]} default - Hold the description of the `ui5-upload-collection-item`. Will be shown below the file name.
 * @since 1.0.0-rc.7
 */
declare class UploadCollectionItem extends ListItem {
    eventDetails: ListItem["eventDetails"] & {
        "file-name-click": void;
        "rename": void;
        "terminate": void;
        "retry": void;
        "focus-requested": void;
        "_uci-delete": void;
        "request-delete": void;
    };
    /**
     * Holds an instance of `File` associated with this item.
     * @default null
     * @public
     */
    file: File | null;
    /**
     * The name of the file.
     * @default ""
     * @public
     */
    fileName: string;
    /**
     * If set to `true` the file name will be clickable and it will fire `file-name-click` event upon click.
     * @default false
     * @public
     */
    fileNameClickable: boolean;
    /**
     * Disables the delete button.
     * @default false
     * @public
     */
    disableDeleteButton: boolean;
    /**
     * Hides the delete button.
     * @default false
     * @public
     */
    hideDeleteButton: boolean;
    /**
     * Hides the retry button when `uploadState` property is `Error`.
     * @default false
     * @public
     */
    hideRetryButton: boolean;
    /**
     * Hides the terminate button when `uploadState` property is `Uploading`.
     * @default false
     * @public
     */
    hideTerminateButton: boolean;
    /**
     * The upload progress in percentage.
     *
     * **Note:** Expected values are in the interval [0, 100].
     * @default 0
     * @public
     */
    progress: number;
    /**
     * Upload state.
     *
     * Depending on this property, the item displays the following:
     *
     * - `Ready` - progress indicator is displayed.
     * - `Uploading` - progress indicator and terminate button are displayed. When the terminate button is pressed, `terminate` event is fired.
     * - `Error` - progress indicator and retry button are displayed. When the retry button is pressed, `retry` event is fired.
     * - `Complete` - progress indicator is not displayed.
     *
     * @default "Ready"
     * @public
     */
    uploadState: `${UploadState}`;
    /**
     * Indicates if editing.
     * @default false
     * @private
     */
    _editing: boolean;
    /**
     * A thumbnail, which will be shown in the beginning of the `ui5-upload-collection-item`.
     *
     * **Note:** Use `ui5-icon` or `img` for the intended design.
     * @public
     */
    thumbnail: Slot<HTMLElement>;
    static i18nFioriBundle: I18nBundle;
    /**
     * @override
     */
    onDetailClick(): Promise<void>;
    _initInputField(): Promise<void>;
    get editInpElement(): Input | null;
    _onkeyup(e: KeyboardEvent): void;
    _onDetailKeyup(e: KeyboardEvent): void;
    _onInputFocusin(e: FocusEvent): void;
    _onInputKeyDown(e: KeyboardEvent): void;
    _onRename(): void;
    _onRenameKeyup(e: KeyboardEvent): void;
    _onRenameCancel(e: KeyboardEvent | UI5CustomEvent<Button, "click">): Promise<void>;
    _onRenameCancelKeyup(e: KeyboardEvent): void;
    _focus(): void;
    _onFileNameClick(): void;
    _onRetry(): void;
    _onRetryKeyup(e: KeyboardEvent): void;
    _onTerminate(): void;
    _onTerminateKeyup(e: KeyboardEvent): void;
    _onDelete(): void;
    getFocusDomRef(): HTMLElement | undefined;
    /**
     * @override
     */
    get classes(): {
        main: {
            "ui5-uci-root": boolean;
            "ui5-uci-root-editing": boolean;
            "ui5-uci-root-uploading": boolean;
        } | {
            "ui5-uci-root": boolean;
            "ui5-uci-root-editing": boolean;
            "ui5-uci-root-uploading": boolean;
        };
    };
    get _fileNameWithoutExtension(): string;
    get _fileExtension(): string;
    get _renameBtnText(): string;
    get _cancelRenameBtnText(): string;
    get _showProgressIndicator(): boolean;
    get _progressText(): string;
    get _showRetry(): boolean;
    get _showTerminate(): boolean;
    get _retryButtonTooltip(): string;
    get _terminateButtonTooltip(): string;
    get _editButtonTooltip(): string;
    get valueStateName(): ValueState;
    /**
     * override
     */
    get typeDetail(): boolean;
    get showEditButton(): boolean;
}
export default UploadCollectionItem;
