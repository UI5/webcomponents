import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type MediaGalleryItemLayout from "./types/MediaGalleryItemLayout.js";
import type { IMediaGalleryItem } from "./MediaGallery.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

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
@customElement({
	tag: "ui5-media-gallery-item",
	renderer: jsxRenderer,
	styles: MediaGalleryItemCss,
	template: MediaGalleryItemTemplate,
})
/**
 * @private
 */
@event("click", {
	bubbles: true,
})
class MediaGalleryItem extends UI5Element implements IMediaGalleryItem {
	eventDetails!: {
		click: { item: MediaGalleryItem },
	}
	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines whether the component is in disabled state.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Determines the layout of the item container.
	 * @default "Square"
	 * @public
	 */
	@property()
	layout: `${MediaGalleryItemLayout}` = "Square";

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_interactive = !isPhone();

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_square = false

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_contentImageNotFound = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_thumbnailNotFound = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_thumbnailDesign = false;

	/**
	 * @private
	 */
	@property()
	forcedTabIndex?: string;

	/**
	 * @private
	 */
	@property({ noAttribute: true })
	contentHeight?: string;

	/**
	 * Defines the content of the component.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: DefaultSlot<Array<HTMLElement>>;

	/**
	 * Defines the content of the thumbnail.
	 * @public
	 */
	@slot()
	thumbnail!: Slot<Array<HTMLElement>>;

	_monitoredThumbnail: HTMLElement | null;
	_monitoredContent: HTMLElement | null;

	constructor() {
		super();

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
		let callback,
			success;
		if (this._thumbnailDesign && this.thumbnail.length && (this._monitoredThumbnail !== this._thumbnail)) {
			this._thumbnailNotFound = false; // reset flag
			callback = this._updateThumbnailLoaded.bind(this);
			success = this._attachListeners(this._thumbnail as HTMLImageElement, callback);
			success && (this._monitoredThumbnail = this._thumbnail);
		}
		if (!this._useThumbnail && this.content.length && (this._monitoredContent !== this.displayedContent)) {
			this._contentImageNotFound = false; // reset flag
			callback = this._updateContentImageLoaded.bind(this);
			success = this._attachListeners(this.displayedContent as HTMLImageElement, callback);
			success && (this._monitoredContent = this.displayedContent);
		}
	}

	_attachListeners(element: HTMLImageElement, callback: (image: HTMLImageElement) => void) {
		const isImg = element.tagName === "IMG",
			img = isImg ? element : element.querySelector("img");
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

	_updateContentImageLoaded(image: HTMLImageElement) {
		this._contentImageNotFound = image.naturalHeight === 0 && image.naturalWidth === 0;
	}

	_updateThumbnailLoaded(image: HTMLImageElement) {
		this._thumbnailNotFound = image.naturalHeight === 0 && image.naturalWidth === 0;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this._fireItemClick();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._fireItemClick();
		}
	}

	_fireItemClick() {
		this.fireDecoratorEvent("click", { item: this });
	}
}

MediaGalleryItem.define();

export default MediaGalleryItem;
