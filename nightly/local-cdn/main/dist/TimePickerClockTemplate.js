import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function TimePickerClockTemplate() {
    return (_jsxs("div", { id: `${this._id}`, onDragStart: this.noop, onDrop: this.noop, "aria-hidden": "true", class: {
            "ui5-tp-clock": true,
            "ui5-tp-clock-active": this.active,
        }, children: [_jsx("div", { "data-label": this.label, class: "ui5-tp-clock-dial" }), _jsx("div", { class: "ui5-tp-clock-items", children: this._items.map((item, i) => (_jsx("div", { class: "ui5-tp-clock-item", style: { transform: `translate(-50%) rotate(${(i + 1) * this._angleStep}deg` }, children: item.item ?
                        _jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-tp-clock-dot" }), _jsx("span", { id: `${this._id}-${item.item}`, class: "ui5-tp-clock-number", style: { transform: `rotate(-${(i + 1) * this._angleStep}deg)` }, children: item.item })] })
                        :
                            _jsx("span", { class: "ui5-tp-clock-mid-dot" }) }))) }), _jsxs("div", { class: "ui5-tp-clock-markers", children: [this._selectedItem.showMarker &&
                        _jsxs("div", { class: "ui5-tp-clock-item", style: { transform: `translate(-50%) rotate(${this._selectedItem.angle || 0}deg)` }, children: [_jsx("div", { class: "ui5-tp-clock-select-marker" }), _jsx("div", { class: this._selectedItem.itemClasses, style: { transform: `rotate(-${this._selectedItem.angle || 0}deg)` }, children: this._selectedItem.item })] }), this._hoveredItem.showMarker &&
                        _jsxs("div", { class: "ui5-tp-clock-item", style: { transform: `translate(-50%) rotate(${this._hoveredItem.angle || 0}deg)` }, children: [_jsx("div", { class: "ui5-tp-clock-hover-marker" }), _jsx("div", { class: this._hoveredItem.itemClasses, style: { transform: `rotate(-${this._hoveredItem.angle || 0}deg)` }, children: this._hoveredItem.item })] })] }), _jsx("div", { class: {
                    "ui5-tp-clock-cover": true,
                    "ui5-tp-clock-pointer": this._hoveredItem.showMarker,
                }, onTouchStart: this._onTouchStart, onTouchMove: this._onTouchMove, onTouchEnd: this._onTouchEnd, onMouseDown: this._onTouchStart, onMouseMove: this._onTouchMove, onMouseUp: this._onTouchEnd, onMouseOut: this._onMouseOut, onWheel: this._onMouseWheel })] }));
}
//# sourceMappingURL=TimePickerClockTemplate.js.map