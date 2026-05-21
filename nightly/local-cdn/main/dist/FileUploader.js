var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FileUploader_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts, getAllAccessibleNameRefTexts, getEffectiveAriaDescriptionText, getAllAccessibleDescriptionRefTexts, } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isUpAlt, isDownAlt, isEnter, isDelete, isF4, isSpace, isRight, isLeft, } from "@ui5/webcomponents-base/dist/Keys.js";
import { FILEUPLOADER_INPUT_TOOLTIP, FILEUPLOADER_VALUE_HELP_TOOLTIP, FILEUPLOADER_CLEAR_ICON_TOOLTIP, VALUE_STATE_SUCCESS, VALUE_STATE_INFORMATION, VALUE_STATE_ERROR, VALUE_STATE_WARNING, FILEUPLOADER_DEFAULT_PLACEHOLDER, FILEUPLOADER_DEFAULT_MULTIPLE_PLACEHOLDER, FILEUPLOADER_ROLE_DESCRIPTION, FILEUPLOAER_VALUE_MISSING, } from "./generated/i18n/i18n-defaults.js";
// Template
import FileUploaderTemplate from "./FileUploaderTemplate.js";
// Styles
import FileUploaderCss from "./generated/themes/FileUploader.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
const convertBytesToMegabytes = (bytes) => (bytes / 1024) / 1024;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-file-uploader` opens a file explorer dialog and enables users to upload files.
 * The component consists of input field, but you can provide an HTML element by your choice
 * to trigger the file upload, by using the default slot.
 * Furthermore, you can set the property "hideInput" to "true" to hide the input field.
 *
 * To get all selected files, you can simply use the read-only "files" property.
 * To restrict the types of files the user can select, you can use the "accept" property.
 *
 * And, similar to all input based components, the FileUploader supports "valueState", "placeholder", "name", and "disabled" properties.
 *
 * For the `ui5-file-uploader`
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/FileUploader.js";`
 * @constructor
 * @since 1.0.0-rc.6
 * @extends UI5Element
 * @public
 */
let FileUploader = FileUploader_1 = class FileUploader extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * If set to "true", the input field of component will not be rendered. Only the default slot that is passed will be rendered.
         *
         * **Note:** Use this property in combination with the default slot to achieve a button-only file uploader design.
         * @default false
         * @public
         */
        this.hideInput = false;
        /**
         * Defines whether the component is in disabled state.
         *
         * **Note:** A disabled component is completely noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Allows multiple files to be chosen.
         * @default false
         * @public
         */
        this.multiple = false;
        /**
         * Defines the name/names of the file/files to upload.
         * @default ""
         * @formEvents change
         * @formProperty
         * @public
         */
        this.value = "";
        /**
         * Defines the value state of the component.
         * @default "None"
         * @public
         */
        this.valueState = "None";
        /**
         * Defines whether the component is required.
         * @default false
         * @public
         * @since 2.13.0
         */
        this.required = false;
        /**
         * @private
         */
        this.focused = false;
        this._selectedFilesNames = [];
        this._tokenizerOpen = false;
    }
    get formValidityMessage() {
        const validity = this.formValidity;
        if (validity.valueMissing) {
            return FileUploader_1.i18nBundle.getText(FILEUPLOAER_VALUE_MISSING);
        }
        return "";
    }
    get formValidity() {
        return {
            valueMissing: this.required && (!this.files || this.files.length === 0),
        };
    }
    async formElementAnchor() {
        return this.getFocusDomRefAsync();
    }
    /**
     * @override
     */
    getFocusDomRef() {
        return this._input;
    }
    get formFormattedValue() {
        if (this.files && this.name) {
            const formData = new FormData();
            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i]);
            }
            return formData;
        }
        return null;
    }
    _onclick() {
        if (this.getFocusDomRef()?.matches(":focus-within")) {
            this._openFileBrowser();
        }
    }
    _onNativeInputClick(e) {
        e.stopPropagation();
    }
    _onmousedown(e) {
        e.preventDefault();
        this._input.focus();
    }
    _onkeydown(e) {
        const firstToken = this._tokenizer?.tokens.find(token => !token.hasAttribute("overflows"));
        const isToken = e.target.hasAttribute("ui5-token");
        const isArrowNavigation = this.effectiveDir === "ltr" ? isRight(e) : isLeft(e);
        if (this.hideInput) {
            return;
        }
        if (isEnter(e)) {
            e.preventDefault();
            this._openFileBrowser();
        }
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isArrowNavigation && !isToken) {
            e.preventDefault();
            firstToken?.focus();
        }
    }
    _onkeyup(e) {
        if (this.hideInput) {
            return;
        }
        if (isSpace(e) || isF4(e) || isUpAlt(e) || isDownAlt(e)) {
            this._openFileBrowser();
        }
        else if (isDelete(e)) {
            this._clearFileSelection();
        }
    }
    _ondrag(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    _ondrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer?.files;
        if (!files) {
            return;
        }
        const validatedFiles = this._validateFiles(files);
        if (!this.value && !validatedFiles.length) {
            return;
        }
        this._input.files = validatedFiles;
        this._selectedFilesNames = this._fileNamesList(files);
        this.value = this.computedValue;
        this.fireDecoratorEvent("change", {
            files: validatedFiles,
        });
    }
    _onfocusin() {
        this.focused = true;
        if (this._tokenizer) {
            this._tokenizer.expanded = true;
        }
    }
    _onfocusout() {
        if (this.matches(":focus-within")) {
            return;
        }
        this.focused = false;
        if (this._tokenizer) {
            this._tokenizer.expanded = this._tokenizer.open;
        }
    }
    get _tokenizerExpanded() {
        if (!this._tokenizer) {
            return true;
        }
        return this._tokenizer.expanded;
    }
    _onTokenizerKeyUp(e) {
        if (isSpace(e) || isDelete(e)) {
            e.stopPropagation();
        }
    }
    _onTokenizerKeyDown(e) {
        const firstToken = this._tokenizer?.tokens.find(token => !token.hasAttribute("overflows"));
        const isArrowNavigation = this.effectiveDir === "ltr" ? isLeft(e) : isRight(e);
        if (isEnter(e)) {
            e.stopPropagation();
        }
        if (e.target === firstToken && isArrowNavigation) {
            this._input.focus();
            e.preventDefault();
        }
    }
    _onTokenizerClick(e) {
        e.stopPropagation();
    }
    _onTokenizerMouseDown(e) {
        e.stopPropagation();
    }
    _onClearIconClick(e) {
        e.stopPropagation();
        this._clearFileSelection();
    }
    _openFileBrowser() {
        this._input.click();
    }
    _clearFileSelection() {
        this._selectedFilesNames = [];
        this.value = "";
        this._input.files = new DataTransfer().files;
        this.fireDecoratorEvent("change", {
            files: this.files,
        });
    }
    /**
     * FileList of all selected files.
     * @public
     * @default null
     */
    get files() {
        if (this._input) {
            return this._input.files;
        }
        return null;
    }
    onAfterRendering() {
        if (!this.value) {
            this._input.value = "";
        }
        this._tokenizerOpen = this._tokenizer ? this._tokenizer.open : false;
        if (this.hideInput && this.content.length > 0) {
            this.content.forEach(element => {
                element.setAttribute("tabindex", "-1");
            });
        }
        this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover);
    }
    get computedValue() {
        return this._selectedFilesNames.join(" ");
    }
    get _formWidth() {
        return this._form ? this._form.offsetWidth : 0;
    }
    _onChange(e) {
        let changedFiles = e.target.files;
        if (changedFiles) {
            changedFiles = this._validateFiles(changedFiles);
        }
        if (!this.value && !changedFiles?.length) {
            return;
        }
        this._selectedFilesNames = this._fileNamesList(changedFiles);
        this.value = this.computedValue;
        this.fireDecoratorEvent("change", {
            files: changedFiles,
        });
    }
    _fileNamesList(files) {
        return Array.from(files)
            .map(file => file.name)
            .sort((a, b) => a.length - b.length); // workaround for incident #11824
    }
    /**
     * Checks whether all files are below `maxFileSize` (if set),
     * and fires a `file-size-exceed` event if any file exceeds it.
     * @private
     */
    _validateFiles(changedFiles) {
        const exceededFilesData = this.maxFileSize ? this._getExceededFiles(changedFiles) : [];
        if (exceededFilesData.length) {
            this.fireDecoratorEvent("file-size-exceed", {
                filesData: exceededFilesData,
            });
            changedFiles = new DataTransfer().files;
        }
        return changedFiles;
    }
    _getExceededFiles(files) {
        const filesArray = Array.from(files);
        const exceededFiles = [];
        for (let i = 0; i < filesArray.length; i++) {
            const fileSize = convertBytesToMegabytes(filesArray[i].size);
            if (fileSize > this.maxFileSize) {
                exceededFiles.push({
                    fileName: filesArray[i].name,
                    fileSize,
                });
            }
        }
        return exceededFiles;
    }
    toggleValueStatePopover(open) {
        if (open) {
            this.openValueStatePopover();
        }
        else {
            this.closeValueStatePopover();
        }
    }
    openValueStatePopover() {
        if (this._messagePopover) {
            this._messagePopover.opener = this;
            this._messagePopover.open = true;
        }
    }
    closeValueStatePopover() {
        if (this._messagePopover) {
            this._messagePopover.open = false;
        }
    }
    get accInfo() {
        return {
            "ariaRoledescription": FileUploader_1.i18nBundle.getText(FILEUPLOADER_ROLE_DESCRIPTION),
            "ariaRequired": this.required || undefined,
            "ariaInvalid": this.valueState === ValueState.Negative || undefined,
            "ariaHasPopup": "dialog",
            "ariaLabel": getAllAccessibleNameRefTexts(this) || getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this) || undefined,
            "ariaDescription": getAllAccessibleDescriptionRefTexts(this) || getEffectiveAriaDescriptionText(this) || undefined,
        };
    }
    get inputTitle() {
        return FileUploader_1.i18nBundle.getText(FILEUPLOADER_INPUT_TOOLTIP);
    }
    get valueHelpTitle() {
        return FileUploader_1.i18nBundle.getText(FILEUPLOADER_VALUE_HELP_TOOLTIP);
    }
    get clearIconTitle() {
        return FileUploader_1.i18nBundle.getText(FILEUPLOADER_CLEAR_ICON_TOOLTIP);
    }
    get resolvedPlaceholder() {
        const singlePlaceholder = FileUploader_1.i18nBundle.getText(FILEUPLOADER_DEFAULT_PLACEHOLDER);
        const multiplePlaceholder = FileUploader_1.i18nBundle.getText(FILEUPLOADER_DEFAULT_MULTIPLE_PLACEHOLDER);
        return this.placeholder ?? (this.multiple ? multiplePlaceholder : singlePlaceholder);
    }
    get valueStateTextMappings() {
        return {
            "Positive": FileUploader_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            "Information": FileUploader_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
            "Negative": FileUploader_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Critical": FileUploader_1.i18nBundle.getText(VALUE_STATE_WARNING),
        };
    }
    get valueStateText() {
        return this.valueStateTextMappings[this.valueState];
    }
    get hasValueState() {
        return this.valueState !== ValueState.None;
    }
    get shouldDisplayDefaultValueStateMessage() {
        return !this.valueStateMessage.length && this.hasValueState;
    }
    get shouldOpenValueStateMessagePopover() {
        return this.focused && this.hasValueState && !this.hideInput && !this._tokenizer?.open;
    }
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageInputIcon() {
        const iconPerValueState = {
            Negative: "error",
            Critical: "alert",
            Positive: "sys-enter-2",
            Information: "information",
        };
        return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
    }
};
__decorate([
    property()
], FileUploader.prototype, "accept", void 0);
__decorate([
    property({ type: Boolean })
], FileUploader.prototype, "hideInput", void 0);
__decorate([
    property({ type: Boolean })
], FileUploader.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], FileUploader.prototype, "multiple", void 0);
__decorate([
    property()
], FileUploader.prototype, "name", void 0);
__decorate([
    property()
], FileUploader.prototype, "placeholder", void 0);
__decorate([
    property()
], FileUploader.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], FileUploader.prototype, "maxFileSize", void 0);
__decorate([
    property()
], FileUploader.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], FileUploader.prototype, "required", void 0);
__decorate([
    property()
], FileUploader.prototype, "accessibleName", void 0);
__decorate([
    property()
], FileUploader.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], FileUploader.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], FileUploader.prototype, "accessibleDescriptionRef", void 0);
__decorate([
    property({ type: Boolean })
], FileUploader.prototype, "focused", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], FileUploader.prototype, "content", void 0);
__decorate([
    slot()
], FileUploader.prototype, "valueStateMessage", void 0);
__decorate([
    query(".ui5-file-uploader-form")
], FileUploader.prototype, "_form", void 0);
__decorate([
    query("input[type=file]")
], FileUploader.prototype, "_input", void 0);
__decorate([
    query("[ui5-tokenizer]")
], FileUploader.prototype, "_tokenizer", void 0);
__decorate([
    query(".ui5-valuestatemessage-popover")
], FileUploader.prototype, "_messagePopover", void 0);
__decorate([
    property({ type: Array, noAttribute: true })
], FileUploader.prototype, "_selectedFilesNames", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], FileUploader.prototype, "_tokenizerOpen", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], FileUploader, "i18nBundle", void 0);
FileUploader = FileUploader_1 = __decorate([
    customElement({
        tag: "ui5-file-uploader",
        languageAware: true,
        formAssociated: true,
        renderer: jsxRenderer,
        styles: [
            FileUploaderCss,
            ResponsivePopoverCommonCss,
            ValueStateMessageCss,
        ],
        template: FileUploaderTemplate,
    })
    /**
     * Event is fired when the value of the file path has been changed.
     *
     * **Note:** Keep in mind that because of the HTML input element of type file, the event is also fired in Chrome browser when the Cancel button of the uploads window is pressed.
     * @param {FileList | null} files The current files.
     * @public
     */
    ,
    event("change", {
        bubbles: true,
    })
    /**
     * Event is fired when the size of a file is above the `maxFileSize` property value.
     * @param {Array<FileData>} filesData An array of `FileData` objects containing the`fileName` and `fileSize` in MB of each file that exceeds the upload limit.
     * @since 2.2.0
     * @public
     */
    ,
    event("file-size-exceed", {
        bubbles: true,
    })
], FileUploader);
FileUploader.define();
export default FileUploader;
//# sourceMappingURL=FileUploader.js.map