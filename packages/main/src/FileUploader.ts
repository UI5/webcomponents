import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
	getEffectiveAriaLabelText,
	getAssociatedLabelForTexts,
	getAllAccessibleNameRefTexts,
	getEffectiveAriaDescriptionText,
	getAllAccessibleDescriptionRefTexts,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	isUpAlt,
	isDownAlt,
	isEnter,
	isDelete,
	isF4,
	isSpace,
	isRight,
	isLeft,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import {
	FILEUPLOADER_INPUT_TOOLTIP,
	FILEUPLOADER_VALUE_HELP_TOOLTIP,
	FILEUPLOADER_CLEAR_ICON_TOOLTIP,
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	FILEUPLOADER_DEFAULT_PLACEHOLDER,
	FILEUPLOADER_DEFAULT_MULTIPLE_PLACEHOLDER,
	FILEUPLOADER_ROLE_DESCRIPTION,
	FILEUPLOAER_VALUE_MISSING,
} from "./generated/i18n/i18n-defaults.js";

import type { InputAccInfo } from "./Input.js";
import type Popover from "./Popover.js";
import type Tokenizer from "./Tokenizer.js";

// Template
import FileUploaderTemplate from "./FileUploaderTemplate.js";

// Styles
import FileUploaderCss from "./generated/themes/FileUploader.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

const convertBytesToMegabytes = (bytes: number) => (bytes / 1024) / 1024;

type FileData = {
	fileName: string,
	fileSize: number,
}

type FileUploaderFileSizeExceedEventDetail = {
	filesData: Array<FileData>,
}

type FileUploaderChangeEventDetail = {
	files: FileList | null,
}

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
@customElement({
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
@event("change", {
	bubbles: true,
})
/**
 * Event is fired when the size of a file is above the `maxFileSize` property value.
 * @param {Array<FileData>} filesData An array of `FileData` objects containing the`fileName` and `fileSize` in MB of each file that exceeds the upload limit.
 * @since 2.2.0
 * @public
 */
@event("file-size-exceed", {
	bubbles: true,
})
class FileUploader extends UI5Element implements IFormInputElement {
	eventDetails!: {
		"change": FileUploaderChangeEventDetail,
		"file-size-exceed": FileUploaderFileSizeExceedEventDetail,
	}
	/**
	 * Comma-separated list of file types that the component should accept.
	 *
	 * **Note:** Please make sure you are adding the `.` in front on the file type, e.g. `.png` in case you want to accept png's only.
	 * @default undefined
	 * @public
	 */
	@property()
	accept?: string;

	/**
	 * If set to "true", the input field of component will not be rendered. Only the default slot that is passed will be rendered.
	 *
	 * **Note:** Use this property in combination with the default slot to achieve a button-only file uploader design.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideInput = false;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Allows multiple files to be chosen.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	multiple = false;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Defines a short hint intended to aid the user with data entry when the component has no value.
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Defines the name/names of the file/files to upload.
	 * @default ""
	 * @formEvents change
	 * @formProperty
	 * @public
	 */
	@property()
	value = "";

	/**
	 * Defines the maximum file size in megabytes which prevents the upload if at least one file exceeds it.
	 * @default undefined
	 * @since 2.2.0
	 * @public
	 */
	@property({ type: Number })
	maxFileSize?: number;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 * @since 2.13.0
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 2.13.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the input.
	 * @default undefined
	 * @public
	 * @since 2.13.0
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the accessible description of the component.
	 * @default undefined
	 * @public
	 * @since 2.14.0
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Receives id(or many ids) of the elements that describe the input.
	 * @default undefined
	 * @public
	 * @since 2.14.0
	 */
	@property()
	accessibleDescriptionRef?: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * This slot allows you to add custom content to the component, such as a button or any other interactive element to trigger the file selection dialog.
	 *
	 * **Note:** For best accessibility experience, set a `tabindex` of "-1" on your interactive element, or it will be set automatically.
	 * This slot is intended for use cases where you want a button-only file uploader.
	 * It is recommended to set `hideInput` property to "true" when using this slot.
	 * Not setting `hideInput` may negatively impact the screen reader users.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the component is in `Information`, `Critical` or `Negative` value state.
	 * @since 1.0.0-rc.9
	 * @public
	 */
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	@query(".ui5-file-uploader-form")
	_form!: HTMLFormElement;

	@query("input[type=file]")
	_input!: HTMLInputElement;

	@query("[ui5-tokenizer]")
	_tokenizer!: Tokenizer;

	@query(".ui5-valuestatemessage-popover")
	_messagePopover!: Popover;

	@property({ type: Array, noAttribute: true })
	_selectedFilesNames: Array<string> = [];

	@property({ type: Boolean, noAttribute: true })
	_tokenizerOpen = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get formValidityMessage() {
		const validity = this.formValidity;

		if (validity.valueMissing) {
			return FileUploader.i18nBundle.getText(FILEUPLOAER_VALUE_MISSING);
		}

		return "";
	}

	get formValidity(): ValidityStateFlags {
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
	getFocusDomRef(): HTMLElement | undefined {
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

	_onNativeInputClick(e: MouseEvent) {
		e.stopPropagation();
	}

	_onmousedown(e: MouseEvent) {
		e.preventDefault();
		this._input.focus();
	}

	_onkeydown(e: KeyboardEvent) {
		const firstToken = this._tokenizer?.tokens.find(token => !token.hasAttribute("overflows"));
		const isToken = (<HTMLElement>e.target).hasAttribute("ui5-token");
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

	_onkeyup(e: KeyboardEvent) {
		if (this.hideInput) {
			return;
		}

		if (isSpace(e) || isF4(e) || isUpAlt(e) || isDownAlt(e)) {
			this._openFileBrowser();
		} else if (isDelete(e)) {
			this._clearFileSelection();
		}
	}

	_ondrag(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
	}

	_ondrop(e: DragEvent) {
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

	get _tokenizerExpanded(): boolean {
		if (!this._tokenizer) {
			return true;
		}

		return this._tokenizer.expanded;
	}

	_onTokenizerKeyUp(e: KeyboardEvent) {
		if (isSpace(e) || isDelete(e)) {
			e.stopPropagation();
		}
	}

	_onTokenizerKeyDown(e: KeyboardEvent) {
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

	_onTokenizerClick(e: MouseEvent) {
		e.stopPropagation();
	}

	_onTokenizerMouseDown(e: MouseEvent) {
		e.stopPropagation();
	}

	_onClearIconClick(e: CustomEvent) {
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
	get files(): FileList | null {
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

	get computedValue(): string {
		return this._selectedFilesNames.join(" ");
	}

	get _formWidth() : number {
		return this._form ? this._form.offsetWidth : 0;
	}

	_onChange(e: Event) {
		let changedFiles = (e.target as HTMLInputElement).files;

		if (changedFiles) {
			changedFiles = this._validateFiles(changedFiles);
		}

		if (!this.value && !changedFiles?.length) {
			return;
		}

		this._selectedFilesNames = this._fileNamesList(changedFiles as FileList);
		this.value = this.computedValue;
		this.fireDecoratorEvent("change", {
			files: changedFiles,
		});
	}

	_fileNamesList(files: FileList) : Array<string> {
		return Array.from(files)
			.map(file => file.name)
			.sort((a, b) => a.length - b.length); // workaround for incident #11824
	}

	/**
	 * Checks whether all files are below `maxFileSize` (if set),
	 * and fires a `file-size-exceed` event if any file exceeds it.
	 * @private
	 */
	_validateFiles(changedFiles: FileList): FileList {
		const exceededFilesData = this.maxFileSize ? this._getExceededFiles(changedFiles) : [];

		if (exceededFilesData.length) {
			this.fireDecoratorEvent("file-size-exceed", {
				filesData: exceededFilesData,
			});
			changedFiles = new DataTransfer().files;
		}

		return changedFiles;
	}

	_getExceededFiles(files: FileList): Array<FileData> {
		const filesArray = Array.from(files);
		const exceededFiles: Array<FileData> = [];

		for (let i = 0; i < filesArray.length; i++) {
			const fileSize = convertBytesToMegabytes(filesArray[i].size);
			if (fileSize > this.maxFileSize!) {
				exceededFiles.push({
					fileName: filesArray[i].name,
					fileSize,
				});
			}
		}
		return exceededFiles;
	}

	toggleValueStatePopover(open: boolean) {
		if (open) {
			this.openValueStatePopover();
		} else {
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

	get accInfo(): InputAccInfo {
		return {
			"ariaRoledescription": FileUploader.i18nBundle.getText(FILEUPLOADER_ROLE_DESCRIPTION),
			"ariaRequired": this.required || undefined,
			"ariaInvalid": this.valueState === ValueState.Negative || undefined,
			"ariaHasPopup": "dialog",
			"ariaLabel": getAllAccessibleNameRefTexts(this) || getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this) || undefined,
			"ariaDescription": getAllAccessibleDescriptionRefTexts(this) || getEffectiveAriaDescriptionText(this) || undefined,
		};
	}

	get inputTitle(): string {
		return FileUploader.i18nBundle.getText(FILEUPLOADER_INPUT_TOOLTIP);
	}

	get valueHelpTitle(): string {
		return FileUploader.i18nBundle.getText(FILEUPLOADER_VALUE_HELP_TOOLTIP);
	}

	get clearIconTitle(): string {
		return FileUploader.i18nBundle.getText(FILEUPLOADER_CLEAR_ICON_TOOLTIP);
	}

	get resolvedPlaceholder(): string {
		const singlePlaceholder = FileUploader.i18nBundle.getText(FILEUPLOADER_DEFAULT_PLACEHOLDER);
		const multiplePlaceholder = FileUploader.i18nBundle.getText(FILEUPLOADER_DEFAULT_MULTIPLE_PLACEHOLDER);
		return this.placeholder ?? (this.multiple ? multiplePlaceholder : singlePlaceholder);
	}

	get valueStateTextMappings(): Record<string, string> {
		return {
			"Positive": FileUploader.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": FileUploader.i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Negative": FileUploader.i18nBundle.getText(VALUE_STATE_ERROR),
			"Critical": FileUploader.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get valueStateText(): string {
		return this.valueStateTextMappings[this.valueState];
	}

	get hasValueState(): boolean {
		return this.valueState !== ValueState.None;
	}

	get shouldDisplayDefaultValueStateMessage(): boolean {
		return !this.valueStateMessage.length && this.hasValueState;
	}

	get shouldOpenValueStateMessagePopover(): boolean {
		return this.focused && this.hasValueState && !this.hideInput && !this._tokenizer?.open;
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageInputIcon(): string {
		const iconPerValueState = {
			Negative: "error",
			Critical: "alert",
			Positive: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}
}

FileUploader.define();

export default FileUploader;
export type {
	FileData,
	FileUploaderChangeEventDetail,
	FileUploaderFileSizeExceedEventDetail,
};
