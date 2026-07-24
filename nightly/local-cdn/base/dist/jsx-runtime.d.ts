import type { JSX as _JSX } from "./thirdparty/preact/jsxRuntime.module.d.ts";
import { type VNode as _VNode } from "./thirdparty/preact/preact.module.js";
import type UI5Element from "./UI5Element.js";
import { jsxDEV } from "./jsx-dev-runtime.js";
declare namespace JSX {
    type JSXWithClassObj = {
        [K in keyof _JSX.IntrinsicElements]: Omit<_JSX.IntrinsicElements[K], "class"> & {
            class?: object | string | undefined;
        };
    };
    type AllHTMLAttributesWithClassObj<T extends EventTarget> = Omit<_JSX.AllHTMLAttributes<T>, "class"> & {
        class?: object | string | undefined;
    };
    type HTMLAttributesWithClassObj<T extends EventTarget> = Omit<_JSX.HTMLAttributes<T>, "class"> & {
        class?: object | string | undefined;
    };
    interface IntrinsicElements extends JSXWithClassObj {
    }
    type ElementClass = UI5Element;
    interface Element extends VNode<any> {
    }
    interface ElementAttributesProperty<T extends EventTarget> {
        _jsxProps: HTMLAttributes<T>;
    }
    interface AllHTMLAttributes<T extends EventTarget> extends AllHTMLAttributesWithClassObj<T> {
    }
    interface HTMLAttributes<T extends EventTarget> extends HTMLAttributesWithClassObj<T> {
    }
    interface DOMAttributes<T extends EventTarget> extends _JSX.DOMAttributes<T> {
    }
    interface SVGAttributes extends _JSX.SVGAttributes {
    }
    type AriaRole = _JSX.AriaRole;
    type AriaAttributes = _JSX.AriaAttributes;
    type MouseEventHandler<T extends EventTarget> = _JSX.MouseEventHandler<T>;
    type TargetedMouseEvent<Target extends EventTarget> = _JSX.TargetedMouseEvent<Target>;
    type TargetedInputEvent<Target extends EventTarget> = _JSX.TargetedInputEvent<Target>;
}
export declare function Fragment(props: Record<string, any>, context?: any): import("./thirdparty/preact/preact.module.js").ComponentChildren;
export declare function jsx(type: string | typeof UI5Element, props: Record<string, any>, key: string): VNode<any>;
export declare function jsxs(type: string | typeof UI5Element, props: Record<string, any>, key: string): VNode<any>;
export { type jsxDEV };
export type ComponentChild = VNode<any> | object | string | number | bigint | boolean | null | undefined;
export type ComponentChildren = ComponentChild[] | ComponentChild;
export type VNode<T = {}> = Omit<_VNode<T>, "type" | "props"> & {
    type: string | typeof UI5Element;
    props: T & {
        children: ComponentChildren;
    };
};
export { JSX };
