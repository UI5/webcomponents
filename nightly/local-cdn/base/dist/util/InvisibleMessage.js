import InvisibleMessageMode from "../types/InvisibleMessageMode.js";
import getSingletonElementInstance from "./getSingletonElementInstance.js";
import { attachBoot } from "../Boot.js";
let defaultSpans;
const regions = [];
const setOutOfViewportStyles = (el) => {
    el.style.position = "absolute";
    el.style.clip = "rect(1px,1px,1px,1px)";
    el.style.userSelect = "none";
    el.style.left = "-1000px";
    el.style.top = "-1000px";
    el.style.pointerEvents = "none";
};
/**
 * Creates a pair of off-viewport aria-live spans (polite and assertive) to be used for screen reader announcements.
 */
const createAnnouncementSpans = () => {
    const politeSpan = document.createElement("span");
    const assertiveSpan = document.createElement("span");
    politeSpan.classList.add("ui5-invisiblemessage-polite");
    assertiveSpan.classList.add("ui5-invisiblemessage-assertive");
    politeSpan.setAttribute("aria-live", "polite");
    assertiveSpan.setAttribute("aria-live", "assertive");
    politeSpan.setAttribute("role", "alert");
    assertiveSpan.setAttribute("role", "alert");
    setOutOfViewportStyles(politeSpan);
    setOutOfViewportStyles(assertiveSpan);
    return { polite: politeSpan, assertive: assertiveSpan };
};
attachBoot(() => {
    if (defaultSpans) {
        return;
    }
    defaultSpans = createAnnouncementSpans();
    const announcementArea = getSingletonElementInstance("ui5-announcement-area");
    announcementArea.appendChild(defaultSpans.polite);
    announcementArea.appendChild(defaultSpans.assertive);
});
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
const registerInvisibleMessageRegion = (container) => {
    if (regions.some(region => region.container === container)) {
        return;
    }
    const spans = createAnnouncementSpans();
    container.appendChild(spans.polite);
    container.appendChild(spans.assertive);
    regions.push({ container, spans });
};
/**
 * Deregisters a previously registered aria-live region container, removing its aria-live spans.
 * After deregistration, announcements are routed to the next registered region, or to the default
 * body-level region if none remain.
 *
 * @param { HTMLElement } container The element that was previously registered via `registerInvisibleMessageRegion`.
 * @public
 */
const deregisterInvisibleMessageRegion = (container) => {
    const index = regions.findIndex(region => region.container === container);
    if (index === -1) {
        return;
    }
    const [region] = regions.splice(index, 1);
    region.spans.polite.remove();
    region.spans.assertive.remove();
};
/**
 * Inserts the string into the respective span, depending on the mode provided.
 *
 * @param { string } message String to be announced by the screen reader.
 * @param { InvisibleMessageMode } mode The mode to be inserted in the aria-live attribute.
 * @public
 */
const announce = (message, mode) => {
    let target = defaultSpans;
    for (let i = regions.length - 1; i >= 0; i--) {
        if (regions[i].container.isConnected) {
            target = regions[i].spans;
            break;
        }
    }
    // If no type is presented, fallback to polite announcement.
    const span = mode === InvisibleMessageMode.Assertive ? target.assertive : target.polite;
    // Set textContent to empty string in order to trigger screen reader's announcement.
    span.textContent = "";
    span.textContent = message;
    if (mode !== InvisibleMessageMode.Assertive && mode !== InvisibleMessageMode.Polite) {
        console.warn(`You have entered an invalid mode. Valid values are: "Polite" and "Assertive". The framework will automatically set the mode to "Polite".`); // eslint-disable-line
    }
    // clear the span in order to avoid reading it out while in JAWS reading node
    setTimeout(() => {
        // ensure that we clear the text node only if no announce is made in the meantime
        if (span.textContent === message) {
            span.textContent = "";
        }
    }, 3000);
};
export default announce;
export { registerInvisibleMessageRegion, deregisterInvisibleMessageRegion, };
//# sourceMappingURL=InvisibleMessage.js.map