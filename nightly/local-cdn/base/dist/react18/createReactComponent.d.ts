/**
 * React wrapper factory for UI5 Web Components.
 *
 * This lightweight factory creates typed React components that wrap UI5 Web Components.
 * It handles:
 * - Event prop conversion (onXxx → ui5-xxx event listeners)
 * - Ref forwarding
 * - Children handling
 *
 * Note: The function supports react >= 18.
 * Note: This is for documentation samples only - for production React apps,
 * use the official @ui5/webcomponents-react library.
 */
import * as React from "react";
import type { ReactNode } from "react";
import type UI5Element from "../UI5Element.js";
interface UI5ComponentClass<T extends UI5Element = UI5Element> {
    new (): T;
    getMetadata(): {
        getTag(): string;
    };
}
/**
 * Creates a React component wrapper for a UI5 Web Component.
 * Uses the component's _jsxProps type for full TypeScript support.
 *
 * @param ComponentClass - The UI5 Web Component class (e.g., Button from "@ui5/webcomponents/dist/Button.js")
 * @returns A React component that renders the custom element with proper TypeScript types
 * @since 2.21.0
 * @example
 * import Button from "@ui5/webcomponents/dist/Button.js";
 * const ReactButton = createReactComponent(Button);
 * // ReactButton props are typed based on Button's _jsxProps
 */
declare function createReactComponent<T extends UI5Element>(ComponentClass: UI5ComponentClass<T>): React.ForwardRefExoticComponent<React.PropsWithoutRef<T["_jsxProps"] & {
    children?: ReactNode;
}> & React.RefAttributes<T>>;
export default createReactComponent;
