/**
 * Returns an event class decorator.
 *
 * @deprecated Use `@ui5/webcomponents-base/dist/decorators/event-strict.js` instead.
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { ClassDecorator }
 */
declare const event: <EventDetail>(name: string, data?: {
    detail?: Record<keyof EventDetail, {
        type: any;
    }>;
    bubbles?: boolean;
    cancelable?: boolean;
}) => ClassDecorator;
export default event;
