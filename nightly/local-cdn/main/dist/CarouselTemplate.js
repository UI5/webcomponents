import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import slimArrowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
export default function CarouselTemplate() {
    return (_jsxs("section", { class: {
            "ui5-carousel-root": true,
            [`ui5-carousel-background-${this._backgroundDesign}`]: true,
        }, tabindex: 0, role: "list", "aria-label": this.ariaLabelTxt, "aria-roledescription": this._roleDescription, "aria-activedescendant": this.ariaActiveDescendant, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, onMouseOut: this._onmouseout, onMouseOver: this._onmouseover, children: [_jsxs("div", { class: this.classes.viewport, part: "content", children: [_jsx("div", { class: this.classes.content, style: { transform: `translateX(${this._isRTL ? "" : "-"}${this._selectedIndex * (this._itemWidth || 0)}px` }, children: this.items.map(itemInfo => _jsx("div", { id: itemInfo.id, class: {
                                "ui5-carousel-item": true,
                                "ui5-carousel-item--hidden": !itemInfo.selected,
                            }, style: { width: `${this._itemWidth || 0}px` }, part: "item", role: "listitem", "aria-posinset": itemInfo.posinset, "aria-setsize": itemInfo.setsize, "aria-selected": itemInfo.selected, children: _jsx("slot", { name: itemInfo.item._individualSlot, tabindex: itemInfo.tabIndex }) })) }), this.showArrows.content &&
                        _jsxs("div", { class: "ui5-carousel-navigation-arrows", children: [arrowBack.call(this), arrowForward.call(this)] })] }), this.renderNavigation &&
                _jsxs("div", { class: this.classes.navigation, children: [this.showArrows.navigation && arrowBack.call(this), _jsx("div", { class: "ui5-carousel-navigation", children: !this.hidePageIndicator && navIndicator.call(this) }), this.showArrows.navigation && arrowForward.call(this)] })] }));
}
function arrowBack() {
    return _jsx(Button, { icon: slimArrowLeft, tabindex: -1, tooltip: this.previousPageText, class: {
            "ui5-carousel-navigation-button": true,
            "ui5-carousel-navigation-button--hidden": !this.hasPrev
        }, "data-ui5-arrow-back": true, onClick: this._navButtonClick });
}
function arrowForward() {
    return _jsx(Button, { icon: slimArrowRight, tabindex: -1, tooltip: this.nextPageText, class: {
            "ui5-carousel-navigation-button": true,
            "ui5-carousel-navigation-button--hidden": !this.hasNext
        }, "data-ui5-arrow-forward": true, onClick: this._navButtonClick });
}
function navIndicator() {
    return this.isPageTypeDots ? this.dots.map(dot => _jsx("div", { role: "img", "aria-label": dot.ariaLabel, class: {
            "ui5-carousel-navigation-dot": true,
            "ui5-carousel-navigation-dot--active": dot.active
        } }))
        :
            _jsxs("div", { dir: "auto", class: "ui5-carousel-navigation-text", children: [this.selectedIndexToShow, "\u00A0", this.ofText, "\u00A0", this.pagesCount] });
}
//# sourceMappingURL=CarouselTemplate.js.map