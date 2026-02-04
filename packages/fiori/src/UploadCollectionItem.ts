import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItemType from "@ui5/webcomponents/dist/types/ListItemType.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import ListItem from "@ui5/webcomponents/dist/ListItem.js";
import getFileExtension from "@ui5/webcomponents-base/dist/util/getFileExtension.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import {
	isDelete,
	isEnter,
	isEscape,
	isSpace,
} from "@ui5/webcomponents-base/dist/Keys.js";
import UploadState from "./types/UploadState.js";
import "@ui5/webcomponents-icons/dist/refresh.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import {
	UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT,
	UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT,
	UPLOADCOLLECTIONITEM_ERROR_STATE,
	UPLOADCOLLECTIONITEM_UPLOADING_STATE,
	UPLOADCOLLECTIONITEM_READY_STATE,
	UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT,
	UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT,
	UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT,
} from "./generated/i18n/i18n-defaults.js";

// Template
import UploadCollectionItemTemplate from "./UploadCollectionItemTemplate.js";

// Styles
import UploadCollectionItemCss from "./generated/themes/UploadCollectionItem.css.js";
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
@customElement({
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
@event("file-name-click", {
	bubbles: true,
})

/**
 * Fired when the `fileName` property gets changed.
 *
 * **Note:** An edit button is displayed on each item,
 * when the `ui5-upload-collection-item` `type` property is set to `Detail`.
 * @public
 */
@event("rename", {
	bubbles: true,
})

/**
 * Fired when the terminate button is pressed.
 *
 * **Note:** Terminate button is displayed when `uploadState` property is set to `Uploading`.
 * @public
 */
@event("terminate", {
	bubbles: true,
})

/**
 * Fired when the retry button is pressed.
 *
 * **Note:** Retry button is displayed when `uploadState` property is set to `Error`.
 * @public
 */
@event("retry", {
	bubbles: true,
})

/**
 * @since 1.0.0-rc.8
 * @private
 */
@event("focus-requested", {
	bubbles: true,
})

/**
 * @private
 */
@event("request-delete", {
	bubbles: true,
})
class UploadCollectionItem extends ListItem {
	eventDetails!: ListItem["eventDetails"] & {
		"file-name-click": void;
		"rename": void;
		"terminate": void;
		"retry": void;
		"focus-requested": void;
		"_uci-delete": void;
		"request-delete": void;
	}
	/**
	 * Holds an instance of `File` associated with this item.
	 * @default null
	 * @public
	 */
	@property({ type: Object, noAttribute: true })
	file: File | null = null;

	/**
	 * The name of the file.
	 * @default ""
	 * @public
	 */
	@property()
	fileName = "";

	/**
	 * If set to `true` the file name will be clickable and it will fire `file-name-click` event upon click.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	fileNameClickable = false;

	/**
	 * Disables the delete button.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disableDeleteButton = false;

	/**
	 * Hides the delete button.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideDeleteButton = false;

	/**
	 * Hides the retry button when `uploadState` property is `Error`.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideRetryButton = false;

	/**
	 * Hides the terminate button when `uploadState` property is `Uploading`.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideTerminateButton = false;

	/**
	 * The upload progress in percentage.
	 *
	 * **Note:** Expected values are in the interval [0, 100].
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	progress = 0;

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
	@property()
	uploadState: `${UploadState}` = "Ready";

	/**
	 * Indicates if editing.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_editing = false;

	/**
	 * A thumbnail, which will be shown in the beginning of the `ui5-upload-collection-item`.
	 *
	 * **Note:** Use `ui5-icon` or `img` for the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement })
	thumbnail!: Slot<HTMLElement>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nFioriBundle: I18nBundle;

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
			(inpFocusDomRef as HTMLInputElement).setSelectionRange(0, this._fileNameWithoutExtension.length);
		}
	}

	get editInpElement() {
		return this.shadowRoot!.querySelector<Input>("#ui5-uci-edit-input");
	}

	_onkeyup(e: KeyboardEvent) {
		super._onkeyup(e);

		if (this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}

		if (isDelete(e) && !this.disableDeleteButton && !this.hideDeleteButton && !this.disabled) {
			this._onDelete();
		}
	}

	_onDetailKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.onDetailClick();
		}
	}

	_onInputFocusin(e: FocusEvent) {
		// prevent focusing the whole upload collection item.
		e.stopPropagation();
	}

	_onInputKeyDown(e: KeyboardEvent) {
		if (isEscape(e)) {
			this._onRenameCancel(e);
		} else if (isEnter(e)) {
			this._onRename();
		} else if (isSpace(e)) {
			e.stopImmediatePropagation();
		}
	}

	_onRename() {
		const inp = this.shadowRoot!.querySelector<Input>("#ui5-uci-edit-input")!;
		this.fileName = inp.value + this._fileExtension;
		this.fireDecoratorEvent("rename");

		this._editing = false;
		this._focus();
	}

	_onRenameKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onRename();
		}
	}

	async _onRenameCancel(e: KeyboardEvent | UI5CustomEvent<Button, "click">) {
		this._editing = false;

		if (isEscape(e as KeyboardEvent)) {
			await renderFinished();
			this.shadowRoot!.querySelector<Button>(`#${this._id}-editing-button`)!.focus();
		} else {
			this._focus();
		}
	}

	_onRenameCancelKeyup(e: KeyboardEvent) {
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

	_onRetryKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onRetry();
		}
	}

	_onTerminate() {
		this.fireDecoratorEvent("terminate");
	}

	_onTerminateKeyup(e: KeyboardEvent) {
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
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT);
	}

	get _cancelRenameBtnText() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT);
	}

	get _showProgressIndicator() {
		return this.uploadState !== UploadState.Complete;
	}

	get _progressText() {
		if (this.uploadState === UploadState.Uploading) {
			return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_UPLOADING_STATE);
		}

		if (this.uploadState === UploadState.Error) {
			return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_ERROR_STATE);
		}

		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_READY_STATE);
	}

	get _showRetry() {
		return !this.hideRetryButton && this.uploadState === UploadState.Error;
	}

	get _showTerminate() {
		return !this.hideTerminateButton && this.uploadState === UploadState.Uploading;
	}

	get _retryButtonTooltip() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT);
	}

	get _terminateButtonTooltip() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT);
	}

	get _editButtonTooltip() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT);
	}

	get valueStateName(): ValueState {
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
}

UploadCollectionItem.define();

export default UploadCollectionItem;
