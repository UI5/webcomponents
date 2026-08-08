var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UploadCollection_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import "./illustrations/Tent.js";
import "@ui5/webcomponents-icons/dist/document.js";
import { UPLOADCOLLECTION_NO_DATA_TEXT, UPLOADCOLLECTION_NO_DATA_DESCRIPTION, UPLOADCOLLECTION_DRAG_FILE_INDICATOR, UPLOADCOLLECTION_DROP_FILE_INDICATOR, UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
import { attachBodyDnDHandler, detachBodyDnDHandler, draggingFiles, } from "./upload-utils/UploadCollectionBodyDnD.js";
import UploadCollectionDnDOverlayMode from "./types/UploadCollectionDnDMode.js";
// Template
import UploadCollectionTemplate from "./UploadCollectionTemplate.js";
// Styles
import UploadCollectionCss from "./generated/themes/UploadCollection.css.js";
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
let UploadCollection = UploadCollection_1 = class UploadCollection extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the selection mode of the `ui5-upload-collection`.
         *
         * @default "None"
         * @public
         */
        this.selectionMode = "None";
        /**
         * Defines the header level of the 'No data' text.
         * @default "H2"
         * @public
         * @since 2.16.0
         */
        this.noDataHeaderLevel = "H2";
        /**
         * By default there will be drag and drop overlay shown over the `ui5-upload-collection` when files
         * are dragged. If you don't intend to use drag and drop, set this property.
         *
         * **Note:** It is up to the application developer to add handler for `drop` event and handle it.
         * `ui5-upload-collection` only displays an overlay.
         * @default false
         * @public
         */
        this.hideDragOverlay = false;
        /**
         * Indicates what overlay to show when files are being dragged.
         * @default "None"
         * @private
         */
        this._dndOverlayMode = "None";
        this._bodyDnDHandler = this.bodyDnDHandler.bind(this);
    }
    bodyDnDHandler(e) {
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
    _ondragenter(e) {
        if (this.hideDragOverlay) {
            return;
        }
        if (!draggingFiles(e)) {
            return;
        }
        this._dndOverlayMode = UploadCollectionDnDOverlayMode.Drop;
    }
    _ondrop(e) {
        if (this.hideDragOverlay) {
            return;
        }
        if (e.target !== this.shadowRoot.querySelector(".uc-dnd-overlay")) {
            e.stopPropagation();
        }
        this._dndOverlayMode = UploadCollectionDnDOverlayMode.None;
    }
    _ondragover(e) {
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
    _onItemDelete(e) {
        this.fireDecoratorEvent("item-delete", { item: e.target });
    }
    _onSelectionChange(e) {
        this.fireDecoratorEvent("selection-change", { selectedItems: e.detail.selectedItems });
    }
    get _showDndOverlay() {
        return this._dndOverlayMode !== UploadCollectionDnDOverlayMode.None;
    }
    get _showNoData() {
        return this.items.length === 0;
    }
    get _noDataText() {
        return this.noDataText || UploadCollection_1.i18nBundle.getText(UPLOADCOLLECTION_NO_DATA_TEXT);
    }
    get _noDataDescription() {
        return this.noDataDescription || UploadCollection_1.i18nBundle.getText(UPLOADCOLLECTION_NO_DATA_DESCRIPTION);
    }
    get _roleDescription() {
        return UploadCollection_1.i18nBundle.getText(UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION);
    }
    get _dndOverlayText() {
        if (this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drag) {
            return UploadCollection_1.i18nBundle.getText(UPLOADCOLLECTION_DRAG_FILE_INDICATOR);
        }
        return UploadCollection_1.i18nBundle.getText(UPLOADCOLLECTION_DROP_FILE_INDICATOR);
    }
};
__decorate([
    property()
], UploadCollection.prototype, "selectionMode", void 0);
__decorate([
    property()
], UploadCollection.prototype, "noDataDescription", void 0);
__decorate([
    property()
], UploadCollection.prototype, "noDataText", void 0);
__decorate([
    property()
], UploadCollection.prototype, "noDataHeaderLevel", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollection.prototype, "hideDragOverlay", void 0);
__decorate([
    property()
], UploadCollection.prototype, "accessibleName", void 0);
__decorate([
    property()
], UploadCollection.prototype, "_dndOverlayMode", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], UploadCollection.prototype, "items", void 0);
__decorate([
    slot({ type: HTMLElement })
], UploadCollection.prototype, "header", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], UploadCollection, "i18nBundle", void 0);
UploadCollection = UploadCollection_1 = __decorate([
    customElement({
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
    ,
    event("item-delete", {
        bubbles: true,
    })
    /**
     * Fired when selection is changed by user interaction
     * in `Single` and `Multiple` modes.
     * @param {Array} selectedItems An array of the selected items.
     * @public
     */
    ,
    event("selection-change", {
        bubbles: true,
    })
], UploadCollection);
UploadCollection.define();
export default UploadCollection;
//# sourceMappingURL=UploadCollection.js.map