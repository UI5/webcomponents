import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import "./illustrations/Tent.js";
import type UploadCollectionItem from "./UploadCollectionItem.js";
import "@ui5/webcomponents-icons/dist/document.js";
import {
	UPLOADCOLLECTION_NO_DATA_TEXT,
	UPLOADCOLLECTION_NO_DATA_DESCRIPTION,
	UPLOADCOLLECTION_DRAG_FILE_INDICATOR,
	UPLOADCOLLECTION_DROP_FILE_INDICATOR,
	UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";
import {
	attachBodyDnDHandler,
	detachBodyDnDHandler,
	draggingFiles,
} from "./upload-utils/UploadCollectionBodyDnD.js";
import type { DnDEventListener, DnDEventListenerParam } from "./upload-utils/UploadCollectionBodyDnD.js";
import UploadCollectionDnDOverlayMode from "./types/UploadCollectionDnDMode.js";
import type UploadCollectionSelectionMode from "./types/UploadCollectionSelectionMode.js";

// Template
import UploadCollectionTemplate from "./UploadCollectionTemplate.js";

// Styles
import UploadCollectionCss from "./generated/themes/UploadCollection.css.js";

type UploadCollectionSelectionChangeEventDetail = {
	selectedItems: Array<UploadCollectionItem>,
};

type UploadCollectionItemDeleteEventDetail = {
	item: UploadCollectionItem,
};

/**
 * @class
 *
 * ### Overview
 * This component allows you to represent files before uploading them to a server, with the help of `ui5-upload-collection-item`.
 * It also allows you to show already uploaded files.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UploadCollection.js";`
 *
 * `import "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";` (for `ui5-upload-collection-item`)
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.7
 */
@customElement({
	tag: "ui5-upload-collection",
	languageAware: true,
	renderer: jsxRenderer,
	styles: UploadCollectionCss,
	template: UploadCollectionTemplate,
})
/**
 * Fired when an element is dropped inside the drag and drop overlay.
 *
 * **Note:** The `drop` event is fired only when elements are dropped within the drag and drop overlay and ignored for the other parts of the `ui5-upload-collection`.
 * @param {DataTransfer} dataTransfer The `drop` event operation data.
 * @public
 * @native
 */
// @event("drop", {
// 	bubbles: true,
// })

/**
 * Fired when the delete button of any item is pressed.
 * @param {HTMLElement} item The `ui5-upload-collection-item` which was deleted.
 * @public
 */
@event("item-delete", {
	bubbles: true,
})

/**
 * Fired when selection is changed by user interaction
 * in `Single` and `Multiple` modes.
 * @param {Array} selectedItems An array of the selected items.
 * @public
 */
@event("selection-change", {
	bubbles: true,
})
class UploadCollection extends UI5Element {
	eventDetails!: {
		"item-delete": UploadCollectionItemDeleteEventDetail,
		"selection-change": UploadCollectionSelectionChangeEventDetail,
	}
	/**
	 * Defines the selection mode of the `ui5-upload-collection`.
	 *
	 * @default "None"
	 * @public
	 */
	@property()
	selectionMode: `${UploadCollectionSelectionMode}` = "None";

	/**
	 * Allows you to set your own text for the 'No data' description.
	 * @default undefined
	 * @public
	 */
	@property()
	noDataDescription?: string;

	/**
	 * Allows you to set your own text for the 'No data' text.
	 * @default undefined
	 * @public
	 */
	@property()
	noDataText?: string;

	/**
	 * Defines the header level of the 'No data' text.
	 * @default "H2"
	 * @public
	 * @since 2.16.0
	 */
	@property()
	noDataHeaderLevel: `${TitleLevel}` = "H2";

	/**
	 * By default there will be drag and drop overlay shown over the `ui5-upload-collection` when files
	 * are dragged. If you don't intend to use drag and drop, set this property.
	 *
	 * **Note:** It is up to the application developer to add handler for `drop` event and handle it.
	 * `ui5-upload-collection` only displays an overlay.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideDragOverlay = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.16
	 */
	 @property()
	 accessibleName?: string;

	/**
	 * Indicates what overlay to show when files are being dragged.
	 * @default "None"
	 * @private
	 */
	@property()
	_dndOverlayMode: `${UploadCollectionDnDOverlayMode}` = "None";

	/**
	 * Defines the items of the `ui5-upload-collection`.
	 *
	 * **Note:** Use `ui5-upload-collection-item` for the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: DefaultSlot<Array<UploadCollectionItem>>;

	/**
	 * Defines the `ui5-upload-collection` header.
	 *
	 * **Note:** If `header` slot is provided,
	 * the labelling of the `UploadCollection` is a responsibility of the application developer.
	 * `accessibleName` should be used.
	 * @public
	 */
	@slot({ type: HTMLElement })
	header!: Slot<Array<HTMLElement>>;

	_bodyDnDHandler: DnDEventListener;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	constructor() {
		super();
		this._bodyDnDHandler = this.bodyDnDHandler.bind(this);
	}

	bodyDnDHandler(e: DnDEventListenerParam) {
		if (this._dndOverlayMode !== UploadCollectionDnDOverlayMode.Drop) {
			this._dndOverlayMode = e.mode;
		}
	}

	onEnterDOM() {
		if (this.hideDragOverlay) {
			return;
		}

		attachBodyDnDHandler(this._bodyDnDHandler);
	}

	onExitDOM() {
		if (this.hideDragOverlay) {
			return;
		}

		detachBodyDnDHandler(this._bodyDnDHandler);
	}

	_ondragenter(e: DragEvent) {
		if (this.hideDragOverlay) {
			return;
		}

		if (!draggingFiles(e)) {
			return;
		}

		this._dndOverlayMode = UploadCollectionDnDOverlayMode.Drop;
	}

	_ondrop(e: DragEvent) {
		if (this.hideDragOverlay) {
			return;
		}

		if (e.target !== this.shadowRoot!.querySelector(".uc-dnd-overlay")) {
			e.stopPropagation();
		}

		this._dndOverlayMode = UploadCollectionDnDOverlayMode.None;
	}

	_ondragover(e: DragEvent) {
		if (this.hideDragOverlay) {
			return;
		}

		e.preventDefault();
	}

	_ondragleave() {
		if (this.hideDragOverlay) {
			return;
		}

		this._dndOverlayMode = UploadCollectionDnDOverlayMode.Drag;
	}

	_onItemDelete(e: CustomEvent) {
		this.fireDecoratorEvent("item-delete", { item: e.target as UploadCollectionItem });
	}

	_onSelectionChange(e: CustomEvent<ListSelectionChangeEventDetail>) {
		this.fireDecoratorEvent("selection-change", { selectedItems: e.detail.selectedItems as UploadCollectionItem[] });
	}

	get _showDndOverlay() {
		return this._dndOverlayMode !== UploadCollectionDnDOverlayMode.None;
	}

	get _showNoData() {
		return this.items.length === 0;
	}

	get _noDataText() {
		return this.noDataText || UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_NO_DATA_TEXT);
	}

	get _noDataDescription() {
		return this.noDataDescription || UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_NO_DATA_DESCRIPTION);
	}

	get _roleDescription() {
		return UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION);
	}

	get _dndOverlayText() {
		if (this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drag) {
			return UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_DRAG_FILE_INDICATOR);
		}

		return UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_DROP_FILE_INDICATOR);
	}
}

UploadCollection.define();

export default UploadCollection;
export type {
	UploadCollectionItemDeleteEventDetail,
	UploadCollectionSelectionChangeEventDetail,
};
