import EventProvider from "../EventProvider.js";
import type UI5Element from "../UI5Element.js";
type ScrollEnablementEventListenerParam = {
    isLeft: boolean;
    isRight: boolean;
};
type ScrollEnablementEventListenerReturn = void;
declare class ScrollEnablement extends EventProvider<ScrollEnablementEventListenerParam, ScrollEnablementEventListenerReturn> {
    containerComponent: UI5Element;
    mouseMove: (event: MouseEvent | TouchEvent) => void;
    mouseUp: (event: MouseEvent | TouchEvent) => void;
    touchStart: (event: MouseEvent | TouchEvent) => void;
    cachedValue: {
        dragX: number;
        dragY: number;
    };
    startX: number;
    startY: number;
    _container?: HTMLElement;
    supportsTouch: boolean;
    _canScroll?: boolean;
    _prevDragX?: number;
    _prevDragY?: number;
    constructor(containerComponent: UI5Element);
    set scrollContainer(container: HTMLElement);
    get scrollContainer(): HTMLElement;
    /**
     * Scrolls the container to the left/top position, retrying retryCount times, if the container is not yet painted
     *
     * @param left
     * @param top
     * @param retryCount
     * @param retryInterval
     * @returns {Promise<void>} resolved when scrolled successfully
     */
    scrollTo(left: number, top: number, retryCount?: number, retryInterval?: number): Promise<void>;
    move(dx: number, dy: number, disableAnimation: boolean): {
        promise: () => Promise<void | Error>;
        stop: () => () => void;
    } | undefined;
    getScrollLeft(): number;
    getScrollTop(): number;
    _isTouchInside(event: TouchEvent | MouseEvent): boolean;
    ontouchstart(event: TouchEvent | MouseEvent): void;
    ontouchmove(event: TouchEvent | MouseEvent): void;
    ontouchend(event: TouchEvent | MouseEvent): void;
}
export default ScrollEnablement;
export type { ScrollEnablementEventListenerParam, };
