// eslint-disable-next-line import/extensions
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "./thirdparty/preact/jsxRuntime.module.js";
import type { JSX as _JSX } from "./thirdparty/preact/jsxRuntime.module.d.ts";
import { options, type VNode as _VNode } from "./thirdparty/preact/preact.module.js";
import type UI5Element from "./UI5Element.js";
import { preprocess } from "./jsx-utils.js";
import { jsxDEV } from "./jsx-dev-runtime.js";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace JSX {
	type JSXWithClassObj =  { [K in keyof _JSX.IntrinsicElements]: Omit<_JSX.IntrinsicElements[K], "class"> & { class?: object | string | undefined  } };
	type AllHTMLAttributesWithClassObj<T extends EventTarget> = Omit<_JSX.AllHTMLAttributes<T>, "class"> & { class?: object | string | undefined  }
	type HTMLAttributesWithClassObj<T extends EventTarget> = Omit<_JSX.HTMLAttributes<T>, "class"> & { class?: object | string | undefined  }
    export interface IntrinsicElements extends JSXWithClassObj {}
    export type ElementClass = UI5Element;
	export interface Element extends VNode<any> {}
    export interface ElementAttributesProperty<T extends EventTarget> {
		_jsxProps: HTMLAttributes<T>;
	}
	export interface AllHTMLAttributes<T extends EventTarget> extends AllHTMLAttributesWithClassObj<T> {}
	export interface HTMLAttributes<T extends EventTarget> extends HTMLAttributesWithClassObj<T> {}
	export interface DOMAttributes<T extends EventTarget> extends _JSX.DOMAttributes<T> {}
	export interface SVGAttributes extends _JSX.SVGAttributes {}
	export type AriaRole = _JSX.AriaRole;
	export type AriaAttributes = _JSX.AriaAttributes;
	export type MouseEventHandler<T extends EventTarget> = _JSX.MouseEventHandler<T>;
	export type TargetedMouseEvent<Target extends EventTarget> = _JSX.TargetedMouseEvent<Target>;
	export type TargetedInputEvent<Target extends EventTarget> = _JSX.TargetedInputEvent<Target>;
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const old = options.vnode;

options.vnode = vnode => {
	const props: Record<string, any> = vnode.props;
	if (props !== null && typeof props === "object") {
		if (props.class && typeof props.class === "object") {
			// props.class = classObjToStr(props.class as Record<string, boolean>);
		}
	}
	old && old(vnode);
};

export function Fragment(props: Record<string, any>, context?: any) {
	return _Fragment(props, context);
}
export function jsx(type: string | typeof UI5Element, props: Record<string, any>, key: string): VNode<any> {
	const tag = preprocess(type, props, key);

	return _jsx(tag, props, key) as VNode<any>;
}
export function jsxs(type: string | typeof UI5Element, props: Record<string, any>, key: string): VNode<any> {
	const tag = preprocess(type, props, key);

	return _jsxs(tag, props, key) as VNode<any>;
}
export { type jsxDEV };

export type ComponentChild =
	| VNode<any>
	| object
	| string
	| number
	| bigint
	| boolean
	| null
	| undefined;
export type ComponentChildren = ComponentChild[] | ComponentChild;

export type VNode<T = {}> = Omit<_VNode<T>, "type" | "props"> & { type: string | typeof UI5Element, props: T & { children: ComponentChildren } };

export { JSX };
