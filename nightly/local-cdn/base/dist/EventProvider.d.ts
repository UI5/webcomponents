declare class EventProvider<EventListenerParam, EventListenerReturn> {
    _eventRegistry: Map<string, Array<(param: EventListenerParam) => EventListenerReturn>>;
    constructor();
    attachEvent(eventName: string, fnFunction: (param: EventListenerParam) => EventListenerReturn): void;
    detachEvent(eventName: string, fnFunction: (param: EventListenerParam) => EventListenerReturn): void;
    /**
     * Fires an event and returns the results of all event listeners as an array.
     *
     * @param eventName the event to fire
     * @param data optional data to pass to each event listener
     * @returns {Array} an array with the results of all event listeners
     */
    fireEvent(eventName: string, data: EventListenerParam): EventListenerReturn[];
    /**
     * Fires an event and returns a promise that will resolve once all listeners have resolved.
     *
     * @param eventName the event to fire
     * @param data optional data to pass to each event listener
     * @returns {Promise} a promise that will resolve when all listeners have resolved
     */
    fireEventAsync(eventName: string, data: EventListenerParam): Promise<Awaited<EventListenerReturn>[]>;
    isHandlerAttached(eventName: string, fnFunction: (param: EventListenerParam) => EventListenerReturn): boolean;
    hasListeners(eventName: string): boolean;
}
export default EventProvider;
