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
import { createElement } from "react";
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
export default function createReactComponent(klass) {
    const tag = klass.getMetadata().getTag();
    return function Component(props) {
        const patchedProps = {};
        Object.entries(props).forEach(([key, value]) => {
            if (key.startsWith("on") && typeof value === "function") {
                // React 19 wraps DOM events (change, click, input, etc.) in SyntheticEvent,
                // hiding CustomEvent.detail under nativeEvent.detail.
                // Patch all event handlers to restore detail from nativeEvent.
                const originalHandler = value;
                patchedProps[key] = (e) => {
                    const nativeDetail = e.nativeEvent?.detail;
                    if (nativeDetail !== undefined) {
                        e.detail = nativeDetail;
                    }
                    originalHandler(e);
                };
            }
            else {
                patchedProps[key] = value;
            }
        });
        return createElement(tag, patchedProps);
    };
}
//# sourceMappingURL=createReactComponent.js.map