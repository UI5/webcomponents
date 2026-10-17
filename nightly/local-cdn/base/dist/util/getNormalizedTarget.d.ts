/**
 * Returns the normalized event target in cases when it has shadow root.
 * @param {Object} target The original event target
 * @returns {Object} The normalized target
 */
declare const getNormalizedTarget: (target: HTMLElement) => HTMLElement;
export default getNormalizedTarget;
