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
import { useRef, useEffect, forwardRef, } from "react";
// Helper to convert event name
const toEventName = (propName) => {
    return propName
        .slice(2) // Remove "on"
        .replace(/([A-Z])/g, (match, letter, index) => {
        return index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`;
    });
};
// Helper to create cleanup function for event listener
const createEventCleanup = (element, eventName, handler) => {
    element.addEventListener(eventName, handler);
    return () => element.removeEventListener(eventName, handler);
};
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
function createReactComponent(ComponentClass) {
    const tagName = ComponentClass.getMetadata().getTag();
    const Component = forwardRef((props, ref) => {
        const { children, ...restProps } = props;
        const elementRef = useRef(null);
        // Forward ref
        useEffect(() => {
            if (ref) {
                if (typeof ref === "function") {
                    ref(elementRef.current);
                }
                else {
                    ref.current = elementRef.current;
                }
            }
        }, [ref]);
        // Handle event props and boolean props imperatively
        useEffect(() => {
            const element = elementRef.current;
            if (!element) {
                return;
            }
            const eventCleanups = [];
            Object.keys(restProps).forEach(propName => {
                const propValue = restProps[propName];
                if (propName.startsWith("on") && typeof propValue === "function") {
                    // Convert React event naming (onClick, onSelectionChange) to DOM event naming
                    // onClick -> click, onSelectionChange -> selection-change
                    const eventName = toEventName(propName);
                    const handler = propValue;
                    eventCleanups.push(createEventCleanup(element, eventName, handler));
                }
                else if (typeof propValue === "boolean") {
                    // React 18 sets false booleans as empty string attributes on custom elements.
                    // Set as property directly to avoid this.
                    element[propName] = propValue;
                }
            });
            return () => {
                eventCleanups.forEach(cleanup => cleanup());
            };
        }, [restProps]);
        // Filter out event handlers and booleans from DOM props
        const domProps = {};
        Object.keys(restProps).forEach(propName => {
            const propValue = restProps[propName];
            if (propName.startsWith("on") && typeof propValue === "function") {
                return;
            }
            if (typeof propValue === "boolean") {
                return;
            } // handled in useEffect
            // className → class for React compatibility
            if (propName === "className") {
                // eslint-disable-next-line dot-notation
                domProps["class"] = propValue;
                return;
            }
            // Convert camelCase to kebab-case for HTML attributes
            const attrName = propName.replace(/([A-Z])/g, "-$1").toLowerCase();
            domProps[attrName] = propValue;
        });
        return React.createElement(tagName, { ref: elementRef, ...domProps }, children);
    });
    Component.displayName = tagName
        .split("-")
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
    return Component;
}
export default createReactComponent;
//# sourceMappingURL=createReactComponent.js.map