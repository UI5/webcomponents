import InvisibleMessageMode from "../types/InvisibleMessageMode.js";
/**
 * Registers an element as an aria-live region container. A pair of hidden aria-live spans (polite and assertive)
 * is created inside the provided container, and subsequent announcements are routed there while it stays registered.
 *
 * This is used to render the aria-live region inside a dialog/popover, so that announcements made while a modal
 * popup is open (and the screen reader's accessibility tree is scoped to the popup's subtree) are still read out.
 *
 * @param { HTMLElement } container The element that will host the aria-live spans.
 * @public
 */
declare const registerInvisibleMessageRegion: (container: HTMLElement) => void;
/**
 * Deregisters a previously registered aria-live region container, removing its aria-live spans.
 * After deregistration, announcements are routed to the next registered region, or to the default
 * body-level region if none remain.
 *
 * @param { HTMLElement } container The element that was previously registered via `registerInvisibleMessageRegion`.
 * @public
 */
declare const deregisterInvisibleMessageRegion: (container: HTMLElement) => void;
/**
 * Inserts the string into the respective span, depending on the mode provided.
 *
 * @param { string } message String to be announced by the screen reader.
 * @param { InvisibleMessageMode } mode The mode to be inserted in the aria-live attribute.
 * @public
 */
declare const announce: (message: string, mode: InvisibleMessageMode) => void;
export default announce;
export { registerInvisibleMessageRegion, deregisterInvisibleMessageRegion, };
