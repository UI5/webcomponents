import InvisibleMessageMode from "../types/InvisibleMessageMode.js";
import getSingletonElementInstance from "./getSingletonElementInstance.js";
import { attachBoot } from "../Boot.js";
let politeSpan;
let assertiveSpan;
const setOutOfViewportStyles = (el) => {
    el.style.position = "absolute";
    el.style.clip = "rect(1px,1px,1px,1px)";
    el.style.userSelect = "none";
    el.style.left = "-1000px";
    el.style.top = "-1000px";
    el.style.pointerEvents = "none";
};
attachBoot(() => {
    if (politeSpan && assertiveSpan) {
        return;
    }
    politeSpan = document.createElement("span");
    assertiveSpan = document.createElement("span");
    politeSpan.classList.add("ui5-invisiblemessage-polite");
    assertiveSpan.classList.add("ui5-invisiblemessage-assertive");
    politeSpan.setAttribute("aria-live", "polite");
    assertiveSpan.setAttribute("aria-live", "assertive");
    politeSpan.setAttribute("role", "alert");
    assertiveSpan.setAttribute("role", "alert");
    setOutOfViewportStyles(politeSpan);
    setOutOfViewportStyles(assertiveSpan);
    getSingletonElementInstance("ui5-announcement-area").appendChild(politeSpan);
    getSingletonElementInstance("ui5-announcement-area").appendChild(assertiveSpan);
});
/**
 * Inserts the string into the respective span, depending on the mode provided.
 *
 * @param { string } message String to be announced by the screen reader.
 * @param { InvisibleMessageMode } mode The mode to be inserted in the aria-live attribute.
 * @public
 */
const announce = (message, mode) => {
    // If no type is presented, fallback to polite announcement.
    const span = mode === InvisibleMessageMode.Assertive ? assertiveSpan : politeSpan;
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
//# sourceMappingURL=InvisibleMessage.js.map