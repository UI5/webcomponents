var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
// Styles
import MediaGalleryItemCss from "./generated/themes/MediaGalleryItem.css.js";
// Template
import MediaGalleryItemTemplate from "./MediaGalleryItemTemplate.js";
/**
 * @class
 * ### Overview
 * The `ui5-media-gallery-item` web component represents the items displayed in the
 * `ui5-media-gallery` web component.
 *
 * **Note:** `ui5-media-gallery-item` is not supported when used outside of `ui5-media-gallery`.
 *
 * ### Keyboard Handling
 * The `ui5-media-gallery` provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Space] / [Enter] or [Return] - Trigger `ui5-click` event
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";` (comes with `ui5-media-gallery`)
 * @constructor
 * @extends UI5Element
 * @public
 * @implements {IMediaGalleryItem}
 * @since 1.1.0
 */
let MediaGalleryItem = class MediaGalleryItem extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the selected state of the component.
         * @default false
         * @public
         */
        this.selected = false;
        /**
         * Defines whether the component is in disabled state.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Determines the layout of the item container.
         * @default "Square"
         * @public
         */
        this.layout = "Square";
        /**
         * @private
         */
        this._interactive = !isPhone();
        /**
         * @private
         */
        this._square = false;
        /**
         * @private
         */
        this._contentImageNotFound = false;
        /**
         * @private
         */
        this._thumbnailNotFound = false;
        /**
         * @private
         */
        this._thumbnailDesign = false;
        this._monitoredContent = null;
        this._monitoredThumbnail = null;
    }
    onEnterDOM() {
        this._thumbnailDesign = !isPhone();
        this._square = true;
    }
    get _thumbnail() {
        return this.thumbnail.length ? this.thumbnail[0] : null;
    }
    get displayedContent() {
        return this.content.length ? this.content[0] : null;
    }
    get _isThubmnailAvailable() {
        return this._thumbnail && !this._thumbnailNotFound;
    }
    get _isContentAvailable() {
        return this.displayedContent && !this._contentImageNotFound;
    }
    get _useThumbnail() {
        return this._thumbnailDesign && this._isThubmnailAvailable;
    }
    get _useContent() {
        return !this._useThumbnail && this._isContentAvailable;
    }
    get effectiveTabIndex() {
        if (this.disabled) {
            return undefined;
        }
        return this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined;
    }
    get _showBackgroundIcon() {
        return this._thumbnailNotFound || this._contentImageNotFound;
    }
    get styles() {
        return {
            wrapper: {
                height: this.contentHeight,
            },
        };
    }
    get _role() {
        return this._interactive ? "button" : undefined;
    }
    onBeforeRendering() {
        this._monitorLoadingError();
    }
    _monitorLoadingError() {
        let callback, success;
        if (this._thumbnailDesign && this.thumbnail.length && (this._monitoredThumbnail !== this._thumbnail)) {
            this._thumbnailNotFound = false; // reset flag
            callback = this._updateThumbnailLoaded.bind(this);
            success = this._attachListeners(this._thumbnail, callback);
            success && (this._monitoredThumbnail = this._thumbnail);
        }
        if (!this._useThumbnail && this.content.length && (this._monitoredContent !== this.displayedContent)) {
            this._contentImageNotFound = false; // reset flag
            callback = this._updateContentImageLoaded.bind(this);
            success = this._attachListeners(this.displayedContent, callback);
            success && (this._monitoredContent = this.displayedContent);
        }
    }
    _attachListeners(element, callback) {
        const isImg = element.tagName === "IMG", img = isImg ? element : element.querySelector("img");
        if (img) {
            callback(img);
            img.addEventListener("error", () => {
                if (this.contains(img)) { // img still belongs to us
                    callback(img);
                }
            });
            img.addEventListener("load", () => {
                if (this.contains(img)) { // img still belongs to us
                    callback(img);
                }
            });
            return true;
        }
    }
    _updateContentImageLoaded(image) {
        this._contentImageNotFound = image.naturalHeight === 0 && image.naturalWidth === 0;
    }
    _updateThumbnailLoaded(image) {
        this._thumbnailNotFound = image.naturalHeight === 0 && image.naturalWidth === 0;
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this._fireItemClick();
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._fireItemClick();
        }
    }
    _fireItemClick() {
        this.fireDecoratorEvent("click", { item: this });
    }
};
__decorate([
    property({ type: Boolean })
], MediaGalleryItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], MediaGalleryItem.prototype, "disabled", void 0);
__decorate([
    property()
], MediaGalleryItem.prototype, "layout", void 0);
__decorate([
    property({ type: Boolean })
], MediaGalleryItem.prototype, "_interactive", void 0);
__decorate([
    property({ type: Boolean })
], MediaGalleryItem.prototype, "_square", void 0);
__decorate([
    property({ type: Boolean })
], MediaGalleryItem.prototype, "_contentImageNotFound", void 0);
__decorate([
    property({ type: Boolean })
], MediaGalleryItem.prototype, "_thumbnailNotFound", void 0);
__decorate([
    property({ type: Boolean })
], MediaGalleryItem.prototype, "_thumbnailDesign", void 0);
__decorate([
    property()
], MediaGalleryItem.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ noAttribute: true })
], MediaGalleryItem.prototype, "contentHeight", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], MediaGalleryItem.prototype, "content", void 0);
__decorate([
    slot()
], MediaGalleryItem.prototype, "thumbnail", void 0);
MediaGalleryItem = __decorate([
    customElement({
        tag: "ui5-media-gallery-item",
        renderer: jsxRenderer,
        styles: MediaGalleryItemCss,
        template: MediaGalleryItemTemplate,
    })
    /**
     * @private
     */
    ,
    event("click", {
        bubbles: true,
    })
], MediaGalleryItem);
MediaGalleryItem.define();
export default MediaGalleryItem;
//# sourceMappingURL=MediaGalleryItem.js.map