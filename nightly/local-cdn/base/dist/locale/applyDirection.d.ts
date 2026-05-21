/**
 * Re-renders all RTL-aware UI5 Elements.
 *
 * **Note:** Call this method whenever you change the "dir" property anywhere in your HTML page.
 *
 * **Example:** `document.body.dir = "rtl"; applyDirection();`
 * @public
 * @returns {Promise<void>}
 */
declare const applyDirection: () => Promise<void>;
export default applyDirection;
