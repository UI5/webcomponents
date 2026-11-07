/**
 * React wrapper factory for UI5 Web Components.
 *
 * This lightweight factory creates typed React components that wrap UI5 Web Components.
 * It handles:
 * - Event prop conversion (onXxx → ui5-xxx event listeners)
 * - Ref forwarding
 * - Children handling
 *
 * Note: Supports React >=19.
 *
 * Note: This is for documentation samples only - for production React apps,
 * use the official @ui5/webcomponents-react library.
 */
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * Creates a React component wrapper for a UI5 Web Component.
 *
 * @param ComponentClass - The UI5 Web Component class (e.g., Button from "@ui5/webcomponents/dist/Button.js")
 * @returns A React component that renders the custom element with proper TypeScript types
 * @since 2.21.0
 * @example
 * import Button from "@ui5/webcomponents/dist/Button.js";
 * const ReactButton = createReactComponent(Button);
 */
export default function createReactComponent<T extends typeof UI5Element>(klass: T): (props: InstanceType<T>["_jsxProps"]) => import("react").DOMElement<Record<string, unknown>, Element>;
