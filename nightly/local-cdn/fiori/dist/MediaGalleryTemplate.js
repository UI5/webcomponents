import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import MediaGalleryItem from "./MediaGalleryItem.js";
import Carousel from "@ui5/webcomponents/dist/Carousel.js";
import Button from "@ui5/webcomponents/dist/Button.js";
export default function MediaGalleryTemplate() {
    return (_jsxs("div", { class: "ui5-media-gallery-root", children: [_jsx("div", { class: "ui5-media-gallery-display-wrapper", children: _jsx("div", { class: "ui5-media-gallery-display", onClick: this._onDisplayAreaClick, children: this._isPhonePlatform
                        ? _jsx(Carousel, { onNavigate: this._onCarouselNavigate, hideNavigationArrows: true, children: this._selectableItems.map(item => _jsx("slot", { name: item._individualSlot })) })
                        : _jsx(MediaGalleryItem, { _interactive: this.interactiveDisplayArea, _square: this._shouldHaveSquareDisplay, tabIndex: this._mainItemTabIndex }) }) }), this._showThumbnails && _jsx("div", { class: "ui5-media-gallery-thumbnails-wrapper", children: _jsxs("ul", { children: [this._visibleItems.map(item => _jsx("li", { id: item.id, class: "ui5-media-gallery-thumbnail", role: "option", onClick: this._onThumbnailClick, children: _jsx("slot", { name: item._individualSlot }) })), this._showOverflowBtn && _jsx("li", { class: "ui5-media-gallery-overflow", children: _jsxs(Button, { onClick: this._onOverflowBtnClick, children: ["+", this._overflowSize] }) })] }) })] }));
}
//# sourceMappingURL=MediaGalleryTemplate.js.map