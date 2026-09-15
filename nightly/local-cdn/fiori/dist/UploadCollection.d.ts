import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import "./illustrations/Tent.js";
import type UploadCollectionItem from "./UploadCollectionItem.js";
import "@ui5/webcomponents-icons/dist/document.js";
import type { DnDEventListener, DnDEventListenerParam } from "./upload-utils/UploadCollectionBodyDnD.js";
import UploadCollectionDnDOverlayMode from "./types/UploadCollectionDnDMode.js";
import type UploadCollectionSelectionMode from "./types/UploadCollectionSelectionMode.js";
type UploadCollectionSelectionChangeEventDetail = {
    selectedItems: Array<UploadCollectionItem>;
};
type UploadCollectionItemDeleteEventDetail = {
    item: UploadCollectionItem;
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
declare class UploadCollection extends UI5Element {
    eventDetails: {
        "item-delete": UploadCollectionItemDeleteEventDetail;
        "selection-change": UploadCollectionSelectionChangeEventDetail;
    };
    /**
     * Defines the selection mode of the `ui5-upload-collection`.
     *
     * @default "None"
     * @public
     */
    selectionMode: `${UploadCollectionSelectionMode}`;
    /**
     * Allows you to set your own text for the 'No data' description.
     * @default undefined
     * @public
     */
    noDataDescription?: string;
    /**
     * Allows you to set your own text for the 'No data' text.
     * @default undefined
     * @public
     */
    noDataText?: string;
    /**
     * Defines the header level of the 'No data' text.
     * @default "H2"
     * @public
     * @since 2.16.0
     */
    noDataHeaderLevel: `${TitleLevel}`;
    /**
     * By default there will be drag and drop overlay shown over the `ui5-upload-collection` when files
     * are dragged. If you don't intend to use drag and drop, set this property.
     *
     * **Note:** It is up to the application developer to add handler for `drop` event and handle it.
     * `ui5-upload-collection` only displays an overlay.
     * @default false
     * @public
     */
    hideDragOverlay: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.16
     */
    accessibleName?: string;
    /**
     * Indicates what overlay to show when files are being dragged.
     * @default "None"
     * @private
     */
    _dndOverlayMode: `${UploadCollectionDnDOverlayMode}`;
    /**
     * Defines the items of the `ui5-upload-collection`.
     *
     * **Note:** Use `ui5-upload-collection-item` for the intended design.
     * @public
     */
    items: DefaultSlot<UploadCollectionItem>;
    /**
     * Defines the `ui5-upload-collection` header.
     *
     * **Note:** If `header` slot is provided,
     * the labelling of the `UploadCollection` is a responsibility of the application developer.
     * `accessibleName` should be used.
     * @public
     */
    header: Slot<HTMLElement>;
    _bodyDnDHandler: DnDEventListener;
    static i18nBundle: I18nBundle;
    constructor();
    bodyDnDHandler(e: DnDEventListenerParam): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _ondragenter(e: DragEvent): void;
    _ondrop(e: DragEvent): void;
    _ondragover(e: DragEvent): void;
    _ondragleave(): void;
    _onItemDelete(e: CustomEvent): void;
    _onSelectionChange(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    get _showDndOverlay(): boolean;
    get _showNoData(): boolean;
    get _noDataText(): string;
    get _noDataDescription(): string;
    get _roleDescription(): string;
    get _dndOverlayText(): string;
}
export default UploadCollection;
export type { UploadCollectionItemDeleteEventDetail, UploadCollectionSelectionChangeEventDetail, };
