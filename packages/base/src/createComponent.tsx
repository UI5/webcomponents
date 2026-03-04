/**
 * React wrapper factory for UI5 Web Components.
 *
 * This lightweight factory creates typed React components that wrap UI5 Web Components.
 * It handles:
 * - Event prop conversion (onXxx → ui5-xxx event listeners)
 * - Ref forwarding
 * - Children handling
 *
 * Note: This is for documentation samples only - for production React apps,
 * use the official @ui5/webcomponents-react library.
 */

import * as React from "react";
import type { ReactNode } from "react";
import {
	useRef,
	useEffect,
	forwardRef,
} from "react";
import type UI5Element from "./UI5Element.js";

type EventHandler<E = Event> = (event: E) => void;

// Interface for UI5 Web Component classes with _jsxProps support
interface UI5ComponentClass<T extends UI5Element = UI5Element> {
	new (): T;
	getMetadata(): {
		getTag(): string;
	};
}

// Helper to convert event name
const toEventName = (propName: string): string => {
	return propName
		.slice(2) // Remove "on"
		.replace(/([A-Z])/g, (match: string, letter: string, index: number): string => {
			return index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`;
		});
};

// Helper to create cleanup function for event listener
const createEventCleanup = (element: UI5Element, eventName: string, handler: EventHandler): (() => void) => {
	element.addEventListener(eventName, handler);
	return () => element.removeEventListener(eventName, handler);
};

/**
 * Creates a React component wrapper for a UI5 Web Component.
 * Uses the component's _jsxProps type for full TypeScript support.
 *
 * @param ComponentClass - The UI5 Web Component class (e.g., Button from "@ui5/webcomponents/dist/Button.js")
 * @returns A React component that renders the custom element with proper TypeScript types
 *
 * @example
 * import Button from "@ui5/webcomponents/dist/Button.js";
 * const ReactButton = createComponent(Button);
 * // ReactButton props are typed based on Button's _jsxProps
 */
export function createComponent<T extends UI5Element>(
	ComponentClass: UI5ComponentClass<T>,
): React.ForwardRefExoticComponent<
	React.PropsWithoutRef<T["_jsxProps"] & { children?: ReactNode }> & React.RefAttributes<T>
> {
	const tagName = ComponentClass.getMetadata().getTag();

	const Component = forwardRef<T, T["_jsxProps"] & { children?: ReactNode }>((props, ref) => {
		const { children, ...restProps } = props;
		const elementRef = useRef<T>(null);

		// Forward ref
		useEffect(() => {
			if (ref) {
				if (typeof ref === "function") {
					ref(elementRef.current);
				} else {
					ref.current = elementRef.current;
				}
			}
		}, [ref]);

		// Handle event props (convert onXxx to event listeners)
		useEffect(() => {
			const element = elementRef.current;
			if (!element) {
				return;
			}

			const eventCleanups: Array<() => void> = [];

			Object.keys(restProps).forEach(propName => {
				const propValue = (restProps as Record<string, unknown>)[propName];
				if (propName.startsWith("on") && typeof propValue === "function") {
					// Convert React event naming (onClick, onSelectionChange) to DOM event naming
					// onClick -> click, onSelectionChange -> selection-change
					const eventName = toEventName(propName);
					const handler = propValue as EventHandler;
					eventCleanups.push(createEventCleanup(element, eventName, handler));
				}
			});

			return () => {
				eventCleanups.forEach(cleanup => cleanup());
			};
		}, [restProps]);

		// Filter out event handlers from DOM props
		const domProps: Record<string, unknown> = {};
		Object.keys(restProps).forEach(propName => {
			const propValue = (restProps as Record<string, unknown>)[propName];
			if (!propName.startsWith("on") || typeof propValue !== "function") {
				// Convert camelCase to kebab-case for HTML attributes
				const attrName = propName.replace(/([A-Z])/g, "-$1").toLowerCase();
				domProps[attrName] = propValue;
			}
		});

		return React.createElement(tagName, { ref: elementRef, ...domProps }, children);
	});

	Component.displayName = tagName
		.split("-")
		.map(part => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");

	return Component;
}

export default createComponent;
