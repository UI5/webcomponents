import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import background from "@ui5/webcomponents-icons/dist/background.js";
export default function MediaGalleryItemTemplate() {
    return (_jsxs("div", { class: "ui5-media-gallery-item-root", tabindex: this.effectiveTabIndex, "data-sap-focus-ref": true, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, role: this._role, children: [_jsx("div", { class: "ui5-media-gallery-item-mask-layer" }), _jsxs("div", { class: "ui5-media-gallery-item-wrapper", style: this.styles.wrapper, children: [this._showBackgroundIcon && _jsx(Icon, { name: background }), this._useContent && _jsx("slot", {}), this._useThumbnail && _jsx("slot", { name: "thumbnail" })] })] }));
}
//# sourceMappingURL=MediaGalleryItemTemplate.js.map