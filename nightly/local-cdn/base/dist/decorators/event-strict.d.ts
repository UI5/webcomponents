import type UI5Element from "../UI5Element.js";
type EventDetailKeys<T extends typeof UI5Element> = keyof InstanceType<T>["eventDetails"];
type ExtractEventKeys<T extends typeof UI5Element> = EventDetailKeys<T> extends never ? "event name not found in `eventDetails` field" : EventDetailKeys<T>;
/**
 * Returns an event class decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { ClassDecorator }
 */
declare const event: <T extends typeof UI5Element, N extends ExtractEventKeys<T>>(name: N, data?: {
    bubbles?: boolean;
    cancelable?: boolean;
}) => (target: T) => T | void;
export default event;
