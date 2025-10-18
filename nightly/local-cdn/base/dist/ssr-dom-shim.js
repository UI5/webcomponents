/* eslint-disable max-classes-per-file */
import { HTMLElement, Element, customElements, ElementInternals } from "@lit-labs/ssr-dom-shim";
globalThis.HTMLElement ??= HTMLElement;
globalThis.Element ??= Element;
globalThis.customElements ??= customElements;
class NodeShim {
}
globalThis.Node ??= NodeShim;
class FileListShim {
}
globalThis.FileList ??= FileListShim;
// ------- JS DOM shims -------
// Polyfill `adoptedStyleSheets` globally for both `Document` and `ShadowRoot`
const adoptedSheetsStore = new WeakMap();
if (globalThis.Document && !("adoptedStyleSheets" in Document.prototype)) {
    Object.defineProperty(Document.prototype, "adoptedStyleSheets", {
        get() {
            return adoptedSheetsStore.get(this) || [];
        },
        set(sheets) {
            adoptedSheetsStore.set(this, sheets);
        },
    });
}
if (globalThis.ShadowRoot && !("adoptedStyleSheets" in ShadowRoot.prototype)) {
    Object.defineProperty(ShadowRoot.prototype, "adoptedStyleSheets", {
        get() {
            return adoptedSheetsStore.get(this) || [];
        },
        set(sheets) {
            adoptedSheetsStore.set(this, sheets);
        },
    });
}
// Polyfill CSSStyleSheet to provide `replaceSync`
if (globalThis.CSSStyleSheet && !("replaceSync" in CSSStyleSheet.prototype)) {
    Object.defineProperty(CSSStyleSheet.prototype, "replaceSync", {
        value(cssText) {
            this.cssText = cssText;
            return cssText;
        },
    });
}
// Empty resize observer
globalThis.ResizeObserver = class ResizeObserver {
    observe() {
        // do nothing
    }
    unobserve() {
        // do nothing
    }
    disconnect() {
        // do nothing
    }
};
// empty showPopover & hidePopover method
globalThis.HTMLElement.prototype.showPopover = function () { };
globalThis.HTMLElement.prototype.hidePopover = function () { };
//  ElementInternals
globalThis.HTMLElement.prototype.attachInternals = function () {
    return new ElementInternals();
};
//# sourceMappingURL=ssr-dom-shim.js.map