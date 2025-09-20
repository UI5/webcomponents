import InvisibleMessageMode from "../types/InvisibleMessageMode.js";
/**
 * Inserts the string into the respective span, depending on the mode provided.
 *
 * @param { string } message String to be announced by the screen reader.
 * @param { InvisibleMessageMode } mode The mode to be inserted in the aria-live attribute.
 * @public
 */
declare const announce: (message: string, mode: InvisibleMessageMode) => void;
export default announce;
