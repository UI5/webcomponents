var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UploadCollectionItem_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItemType from "@ui5/webcomponents/dist/types/ListItemType.js";
import ListItem from "@ui5/webcomponents/dist/ListItem.js";
import getFileExtension from "@ui5/webcomponents-base/dist/util/getFileExtension.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isDelete, isEnter, isEscape, isSpace, } from "@ui5/webcomponents-base/dist/Keys.js";
import UploadState from "./types/UploadState.js";
import "@ui5/webcomponents-icons/dist/refresh.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import { UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT, UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT, UPLOADCOLLECTIONITEM_ERROR_STATE, UPLOADCOLLECTIONITEM_UPLOADING_STATE, UPLOADCOLLECTIONITEM_READY_STATE, UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT, UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT, UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT, } from "./generated/i18n/i18n-defaults.js";
// Template
import UploadCollectionItemTemplate from "./UploadCollectionItemTemplate.js";
// Styles
import UploadCollectionItemCss from "./generated/themes/UploadCollectionItem.css.js";
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
let UploadCollectionItem = UploadCollectionItem_1 = class UploadCollectionItem extends ListItem {
    constructor() {
        super(...arguments);
        /**
         * Holds an instance of `File` associated with this item.
         * @default null
         * @public
         */
        this.file = null;
        /**
         * The name of the file.
         * @default ""
         * @public
         */
        this.fileName = "";
        /**
         * If set to `true` the file name will be clickable and it will fire `file-name-click` event upon click.
         * @default false
         * @public
         */
        this.fileNameClickable = false;
        /**
         * Disables the delete button.
         * @default false
         * @public
         */
        this.disableDeleteButton = false;
        /**
         * Hides the delete button.
         * @default false
         * @public
         */
        this.hideDeleteButton = false;
        /**
         * Hides the retry button when `uploadState` property is `Error`.
         * @default false
         * @public
         */
        this.hideRetryButton = false;
        /**
         * Hides the terminate button when `uploadState` property is `Uploading`.
         * @default false
         * @public
         */
        this.hideTerminateButton = false;
        /**
         * The upload progress in percentage.
         *
         * **Note:** Expected values are in the interval [0, 100].
         * @default 0
         * @public
         */
        this.progress = 0;
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
        this.uploadState = "Ready";
        /**
         * Indicates if editing.
         * @default false
         * @private
         */
        this._editing = false;
    }
    /**
     * @override
     */
    async onDetailClick() {
        super.onDetailClick();
        this._editing = true;
        await this._initInputField();
    }
    async _initInputField() {
        await renderFinished();
        if (this.editInpElement) {
            this.editInpElement.value = this._fileNameWithoutExtension;
        }
        await renderFinished();
        const inpFocusDomRef = this.editInpElement?.getFocusDomRef();
        if (inpFocusDomRef) {
            inpFocusDomRef.focus();
            inpFocusDomRef.setSelectionRange(0, this._fileNameWithoutExtension.length);
        }
    }
    get editInpElement() {
        return this.shadowRoot.querySelector("#ui5-uci-edit-input");
    }
    _onkeyup(e) {
        super._onkeyup(e);
        if (this.getFocusDomRef().matches(":has(:focus-within)")) {
            return;
        }
        if (isDelete(e) && !this.disableDeleteButton && !this.hideDeleteButton && !this.disabled) {
            this._onDelete();
        }
    }
    _onDetailKeyup(e) {
        if (isSpace(e)) {
            this.onDetailClick();
        }
    }
    _onInputFocusin(e) {
        // prevent focusing the whole upload collection item.
        e.stopPropagation();
    }
    _onInputKeyDown(e) {
        if (isEscape(e)) {
            this._onRenameCancel(e);
        }
        else if (isEnter(e)) {
            this._onRename();
        }
        else if (isSpace(e)) {
            e.stopImmediatePropagation();
        }
    }
    _onRename() {
        const inp = this.shadowRoot.querySelector("#ui5-uci-edit-input");
        this.fileName = inp.value + this._fileExtension;
        this.fireDecoratorEvent("rename");
        this._editing = false;
        this._focus();
    }
    _onRenameKeyup(e) {
        if (isSpace(e)) {
            this._onRename();
        }
    }
    async _onRenameCancel(e) {
        this._editing = false;
        if (isEscape(e)) {
            await renderFinished();
            this.shadowRoot.querySelector(`#${this._id}-editing-button`).focus();
        }
        else {
            this._focus();
        }
    }
    _onRenameCancelKeyup(e) {
        if (isSpace(e)) {
            this._onRenameCancel(e);
        }
    }
    _focus() {
        this.fireDecoratorEvent("focus-requested");
    }
    _onFileNameClick() {
        this.fireDecoratorEvent("file-name-click");
    }
    _onRetry() {
        this.fireDecoratorEvent("retry");
    }
    _onRetryKeyup(e) {
        if (isSpace(e)) {
            this._onRetry();
        }
    }
    _onTerminate() {
        this.fireDecoratorEvent("terminate");
    }
    _onTerminateKeyup(e) {
        if (isSpace(e)) {
            this._onTerminate();
        }
    }
    _onDelete() {
        this.fireDecoratorEvent("request-delete");
    }
    getFocusDomRef() {
        return this.getDomRef();
    }
    /**
     * @override
     */
    get classes() {
        const result = super.classes;
        return {
            main: {
                ...result.main,
                "ui5-uci-root": true,
                "ui5-uci-root-editing": this._editing,
                "ui5-uci-root-uploading": this.uploadState === UploadState.Uploading,
            },
        };
    }
    get _fileNameWithoutExtension() {
        return this.fileName.substring(0, this.fileName.length - this._fileExtension.length);
    }
    get _fileExtension() {
        return getFileExtension(this.fileName);
    }
    get _renameBtnText() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT);
    }
    get _cancelRenameBtnText() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT);
    }
    get _showProgressIndicator() {
        return this.uploadState !== UploadState.Complete;
    }
    get _progressText() {
        if (this.uploadState === UploadState.Uploading) {
            return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_UPLOADING_STATE);
        }
        if (this.uploadState === UploadState.Error) {
            return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_ERROR_STATE);
        }
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_READY_STATE);
    }
    get _showRetry() {
        return !this.hideRetryButton && this.uploadState === UploadState.Error;
    }
    get _showTerminate() {
        return !this.hideTerminateButton && this.uploadState === UploadState.Uploading;
    }
    get _retryButtonTooltip() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT);
    }
    get _terminateButtonTooltip() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT);
    }
    get _editButtonTooltip() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT);
    }
    get valueStateName() {
        if (this.uploadState === UploadState.Error) {
            return ValueState.Negative;
        }
        if (this.uploadState === UploadState.Ready || this.uploadState === UploadState.Uploading) {
            return ValueState.Information;
        }
        return ValueState.None;
    }
    /**
     * override
     */
    get typeDetail() {
        return false;
    }
    get showEditButton() {
        return this.type === ListItemType.Detail;
    }
};
__decorate([
    property({ type: Object, noAttribute: true })
], UploadCollectionItem.prototype, "file", void 0);
__decorate([
    property()
], UploadCollectionItem.prototype, "fileName", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "fileNameClickable", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "disableDeleteButton", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "hideDeleteButton", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "hideRetryButton", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "hideTerminateButton", void 0);
__decorate([
    property({ type: Number })
], UploadCollectionItem.prototype, "progress", void 0);
__decorate([
    property()
], UploadCollectionItem.prototype, "uploadState", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "_editing", void 0);
__decorate([
    slot({ type: HTMLElement })
], UploadCollectionItem.prototype, "thumbnail", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], UploadCollectionItem, "i18nFioriBundle", void 0);
UploadCollectionItem = UploadCollectionItem_1 = __decorate([
    customElement({
        tag: "ui5-upload-collection-item",
        languageAware: true,
        renderer: jsxRenderer,
        styles: [ListItem.styles, UploadCollectionItemCss],
        template: UploadCollectionItemTemplate,
    })
    /**
     * Fired when the file name is clicked.
     *
     * **Note:** This event is only available when `fileNameClickable` property is `true`.
     * @public
     */
    ,
    event("file-name-click", {
        bubbles: true,
    })
    /**
     * Fired when the `fileName` property gets changed.
     *
     * **Note:** An edit button is displayed on each item,
     * when the `ui5-upload-collection-item` `type` property is set to `Detail`.
     * @public
     */
    ,
    event("rename", {
        bubbles: true,
    })
    /**
     * Fired when the terminate button is pressed.
     *
     * **Note:** Terminate button is displayed when `uploadState` property is set to `Uploading`.
     * @public
     */
    ,
    event("terminate", {
        bubbles: true,
    })
    /**
     * Fired when the retry button is pressed.
     *
     * **Note:** Retry button is displayed when `uploadState` property is set to `Error`.
     * @public
     */
    ,
    event("retry", {
        bubbles: true,
    })
    /**
     * @since 1.0.0-rc.8
     * @private
     */
    ,
    event("focus-requested", {
        bubbles: true,
    })
    /**
     * @private
     */
    ,
    event("request-delete", {
        bubbles: true,
    })
], UploadCollectionItem);
UploadCollectionItem.define();
export default UploadCollectionItem;
//# sourceMappingURL=UploadCollectionItem.js.map