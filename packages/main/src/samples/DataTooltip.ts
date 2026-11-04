import { startTooltipSupport } from "../TooltipSupport.js";

/**
 * SAMPLE shim — kept for the existing demo page.
 *
 * The magic `data-ui5-tooltip` behavior now ships as runtime support in
 * `TooltipSupport.ts` and is started automatically by components that emit the
 * attribute (e.g. `ui5-button`, `ui5-title`). This file just re-exposes it under
 * the original sample name.
 *
 * ```js
 * import { startDataTooltips } from "@ui5/webcomponents/dist/samples/DataTooltip.js";
 * startDataTooltips();
 * ```
 */
const startDataTooltips = startTooltipSupport;

// eslint-disable-next-line import/prefer-default-export
export { startDataTooltips };
