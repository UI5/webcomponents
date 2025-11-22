type FocusableElementPromise = Promise<HTMLElement | null>;
declare const getFirstFocusableElement: (container: HTMLElement, startFromContainer?: boolean) => FocusableElementPromise;
declare const getLastFocusableElement: (container: HTMLElement, startFromContainer?: boolean) => FocusableElementPromise;
export { getFirstFocusableElement, getLastFocusableElement, };
