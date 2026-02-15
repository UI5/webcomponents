import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import slimArrowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
export default function CarouselTemplate() {
    return (_jsxs("section", { class: {
            "ui5-carousel-root": true,
            [`ui5-carousel-background-${this._backgroundDesign}`]: true,
        }, role: "region", "aria-label": this.ariaLabelTxt, "aria-roledescription": this._roleDescription, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, onMouseOut: this._onmouseout, onMouseOver: this._onmouseover, onTouchStart: this._ontouchstart, onMouseDown: this._onmousedown, children: [_jsxs("div", { class: this.classes.viewport, part: "content", children: [_jsx("div", { role: "list", "aria-label": this._ariaListLabel, class: this.classes.content, style: { transform: `translate3d(${this._isRTL ? "" : "-"}${this._currentSlideIndex * (this._itemWidth || 0)}px, 0, 0` }, children: this.items.map((itemInfo, i) => _jsx("div", { "data-sap-focus-ref": this._focusedItemIndex === i ? true : undefined, id: itemInfo.id, class: {
                                "ui5-carousel-item": true,
                                "ui5-carousel-item--hidden": !itemInfo.visible,
                            }, style: { width: `${this._itemWidth || 0}px` }, part: "item", role: "listitem", "aria-posinset": itemInfo.posinset, "aria-setsize": itemInfo.setsize, "aria-hidden": !itemInfo.visible, tabindex: itemInfo.tabIndex, children: _jsx("slot", { name: itemInfo.item._individualSlot, tabindex: itemInfo.tabIndex }) })) }), this.showArrows.content &&
                        _jsxs("div", { class: "ui5-carousel-navigation-arrows", children: [arrowBack.call(this), arrowForward.call(this)] })] }), this.renderNavigation &&
                _jsxs("div", { class: this.classes.navigation, children: [this.showArrows.navigation && arrowBack.call(this), _jsx("div", { class: "ui5-carousel-navigation", children: !this.hidePageIndicator && navIndicator.call(this) }), this.showArrows.navigation && arrowForward.call(this)] })] }));
}
function arrowBack() {
    return _jsx(Icon, { name: slimArrowLeft, tabindex: -1, "data-ui5-arrow-back": true, title: this.previousPageText, mode: "Decorative", class: {
            "ui5-carousel-navigation-button": true,
            "ui5-carousel-navigation-button--hidden": !this.hasPrev
        }, onClick: this._navButtonClick });
}
function arrowForward() {
    return _jsx(Icon, { name: slimArrowRight, tabindex: -1, "data-ui5-arrow-forward": true, title: this.nextPageText, mode: "Decorative", class: {
            "ui5-carousel-navigation-button": true,
            "ui5-carousel-navigation-button--hidden": !this.hasNext
        }, onClick: this._navButtonClick });
}
function navIndicator() {
    return this.isPageTypeDots ? this.dots.map(dot => _jsx("div", { "aria-label": dot.ariaLabel, role: "presentation", "aria-hidden": "true", class: {
            "ui5-carousel-navigation-dot": true,
            "ui5-carousel-navigation-dot--active": dot.active
        } }))
        :
            _jsxs("div", { dir: "auto", class: "ui5-carousel-navigation-text", children: [this._currentSlideIndex + 1, "\u00A0", this.ofText, "\u00A0", this.pagesCount] });
}
//# sourceMappingURL=CarouselTemplate.js.map