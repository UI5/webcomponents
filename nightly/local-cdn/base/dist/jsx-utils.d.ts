import type UI5Element from "./UI5Element.js";
export declare function isUI5ElementClass(type: string | typeof UI5Element): type is typeof UI5Element;
export declare function preprocess(type: string | typeof UI5Element, props: Record<string, any>, key: string): string;
