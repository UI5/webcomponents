import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type { InputAccInfo } from "./Input.js";
import type Popover from "./Popover.js";
import type Tokenizer from "./Tokenizer.js";
type FileData = {
    fileName: string;
    fileSize: number;
};
type FileUploaderFileSizeExceedEventDetail = {
    filesData: Array<FileData>;
};
type FileUploaderChangeEventDetail = {
    files: FileList | null;
};
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
declare class FileUploader extends UI5Element implements IFormInputElement {
    eventDetails: {
        "change": FileUploaderChangeEventDetail;
        "file-size-exceed": FileUploaderFileSizeExceedEventDetail;
    };
    /**
     * Comma-separated list of file types that the component should accept.
     *
     * **Note:** Please make sure you are adding the `.` in front on the file type, e.g. `.png` in case you want to accept png's only.
     * @default undefined
     * @public
     */
    accept?: string;
    /**
     * If set to "true", the input field of component will not be rendered. Only the default slot that is passed will be rendered.
     *
     * **Note:** Use this property in combination with the default slot to achieve a button-only file uploader design.
     * @default false
     * @public
     */
    hideInput: boolean;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Allows multiple files to be chosen.
     * @default false
     * @public
     */
    multiple: boolean;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Defines a short hint intended to aid the user with data entry when the component has no value.
     * @default undefined
     * @public
     */
    placeholder?: string;
    /**
     * Defines the name/names of the file/files to upload.
     * @default ""
     * @formEvents change
     * @formProperty
     * @public
     */
    value: string;
    /**
     * Defines the maximum file size in megabytes which prevents the upload if at least one file exceeds it.
     * @default undefined
     * @since 2.2.0
     * @public
     */
    maxFileSize?: number;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component is required.
     * @default false
     * @public
     * @since 2.13.0
     */
    required: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 2.13.0
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the input.
     * @default undefined
     * @public
     * @since 2.13.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.14.0
     */
    accessibleDescription?: string;
    /**
     * Receives id(or many ids) of the elements that describe the input.
     * @default undefined
     * @public
     * @since 2.14.0
     */
    accessibleDescriptionRef?: string;
    /**
     * @private
     */
    focused: boolean;
    /**
     * This slot allows you to add custom content to the component, such as a button or any other interactive element to trigger the file selection dialog.
     *
     * **Note:** For best accessibility experience, set a `tabindex` of "-1" on your interactive element, or it will be set automatically.
     * This slot is intended for use cases where you want a button-only file uploader.
     * It is recommended to set `hideInput` property to "true" when using this slot.
     * Not setting `hideInput` may negatively impact the screen reader users.
     * @public
     */
    content: DefaultSlot<HTMLElement>;
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
    valueStateMessage: Slot<HTMLElement>;
    _form: HTMLFormElement;
    _input: HTMLInputElement;
    _tokenizer: Tokenizer;
    _messagePopover: Popover;
    _selectedFilesNames: Array<string>;
    _tokenizerOpen: boolean;
    static i18nBundle: I18nBundle;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    /**
     * @override
     */
    getFocusDomRef(): HTMLElement | undefined;
    get formFormattedValue(): FormData | null;
    _onclick(): void;
    _onNativeInputClick(e: MouseEvent): void;
    _onmousedown(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _ondrag(e: DragEvent): void;
    _ondrop(e: DragEvent): void;
    _onfocusin(): void;
    _onfocusout(): void;
    get _tokenizerExpanded(): boolean;
    _onTokenizerKeyUp(e: KeyboardEvent): void;
    _onTokenizerKeyDown(e: KeyboardEvent): void;
    _onTokenizerClick(e: MouseEvent): void;
    _onTokenizerMouseDown(e: MouseEvent): void;
    _onClearIconClick(e: CustomEvent): void;
    _openFileBrowser(): void;
    _clearFileSelection(): void;
    /**
     * FileList of all selected files.
     * @public
     * @default null
     */
    get files(): FileList | null;
    onAfterRendering(): void;
    get computedValue(): string;
    get _formWidth(): number;
    _onChange(e: Event): void;
    _fileNamesList(files: FileList): Array<string>;
    /**
     * Checks whether all files are below `maxFileSize` (if set),
     * and fires a `file-size-exceed` event if any file exceeds it.
     * @private
     */
    _validateFiles(changedFiles: FileList): FileList;
    _getExceededFiles(files: FileList): Array<FileData>;
    toggleValueStatePopover(open: boolean): void;
    openValueStatePopover(): void;
    closeValueStatePopover(): void;
    get accInfo(): InputAccInfo;
    get inputTitle(): string;
    get valueHelpTitle(): string;
    get clearIconTitle(): string;
    get resolvedPlaceholder(): string;
    get valueStateTextMappings(): Record<string, string>;
    get valueStateText(): string;
    get hasValueState(): boolean;
    get shouldDisplayDefaultValueStateMessage(): boolean;
    get shouldOpenValueStateMessagePopover(): boolean;
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageInputIcon(): string;
}
export default FileUploader;
export type { FileData, FileUploaderChangeEventDetail, FileUploaderFileSizeExceedEventDetail, };
