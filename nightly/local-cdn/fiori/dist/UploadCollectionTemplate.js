import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import List from "@ui5/webcomponents/dist/List.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import uploadToCloud from "@ui5/webcomponents-icons/dist/upload-to-cloud.js";
import IllustratedMessage from "./IllustratedMessage.js";
import UploadCollectionDnDOverlayMode from "./types/UploadCollectionDnDMode.js";
export default function UploadCollectionTemplate() {
    return (_jsx("div", { role: "region", class: "ui5-uc-root", "aria-roledescription": this._roleDescription, onDrop: this._ondrop, "onui5-request-delete": this._onItemDelete, children: _jsxs("div", { class: {
                "ui5-uc-content": true,
                "ui5-uc-content-no-data": this.items.length === 0
            }, children: [_jsxs(List, { accessibleName: this.accessibleName, selectionMode: this.selectionMode, onSelectionChange: this._onSelectionChange, children: [_jsx("slot", { slot: "header", name: "header" }), _jsx("slot", {}), this._showNoData &&
                            _jsx(ListItemCustom, { class: {
                                    "uc-no-files": true,
                                    "uc-no-files-dnd-overlay": this._showDndOverlay,
                                }, type: "Inactive", children: _jsxs(IllustratedMessage, { name: "Tent", children: [_jsx(Title, { slot: "title", wrappingType: "None", level: this.noDataHeaderLevel, children: this._noDataText }), _jsx("span", { slot: "subtitle", children: this._noDataDescription })] }) })] }), this._showDndOverlay &&
                    _jsxs("div", { class: {
                            "uc-dnd-overlay": true,
                            "uc-drag-overlay": this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drag,
                            "uc-drop-overlay": this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drop,
                        }, onDragEnter: this._ondragenter, onDragLeave: this._ondragleave, onDragOver: this._ondragover, children: [_jsx(Icon, { name: uploadToCloud }), _jsx("span", { class: "dnd-overlay-text", children: this._dndOverlayText })] })] }) }));
}
//# sourceMappingURL=UploadCollectionTemplate.js.map