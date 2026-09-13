import type { JSX } from "./jsx-runtime.d.ts";
import type { Slot, DefaultSlot } from "./UI5Element.js";
export type LowercaseString<T> = T extends string ? Lowercase<T> : never;
export type { Slot, DefaultSlot, };
export type PromiseResolve = (value: void | PromiseLike<void>) => void;
export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;
export type StyleData = string;
export type ComponentStylesData = Array<ComponentStylesData> | string;
export type ClassMapValue = Record<string, boolean>;
export type ClassMap = {
    [x: string]: ClassMapValue | ClassMap;
};
export type PassiveEventListenerObject = EventListenerObject & {
    passive: boolean;
};
export type AriaRole = JSX.AriaRole;
export type AriaDisabled = JSX.AriaAttributes["aria-disabled"];
export type AriaChecked = JSX.AriaAttributes["aria-checked"];
export type AriaReadonly = JSX.AriaAttributes["aria-readonly"];
export type AriaHasPopup = "dialog" | "grid" | "listbox" | "menu" | "tree" | "false";
export type AriaCurrent = "page" | "step" | "location" | "date" | "time" | "true" | "false" | boolean | undefined;
export type AriaAutoComplete = "list" | "none" | "inline" | "both" | undefined;
export type AriaLandmarkRole = "none" | "banner" | "main" | "region" | "navigation" | "search" | "complementary" | "form" | "contentinfo";
export type AccessibilityInfo = {
    role?: AriaRole;
    type?: string;
    description?: string;
    label?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    children?: Array<Node>;
};
export type AccessibilityAttributes = {
    ariaSetsize?: number;
    ariaPosinset?: number;
    ariaLabel?: string;
    controls?: LowercaseString<string>;
    expanded?: "true" | "false" | boolean;
    hasPopup?: AriaHasPopup;
    name?: string;
    role?: AriaRole;
    ariaKeyShortcuts?: string;
    ariaCurrent?: AriaCurrent;
    current?: AriaCurrent;
    roleDescription?: string;
    title?: string;
};
