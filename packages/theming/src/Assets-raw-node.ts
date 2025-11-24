/**
 * The `Assets-node` entry point is used to import theming assets.
 *
 * It serves as an alternative to the `Assets` and `Assets-fetch` modules and supports the
 * `with: { type: 'json' }` import attribute for loading JSON files.
 *
 * This import attribute is required in some environments, such as Node.js with server-side rendering (SSR).
 *
 * Example usage:
 * await import("../assets/themes/sap_horizon/parameters-bundle.css.json", { with: { type: 'json' } })
 */

import "./generated/json-imports/Themes-raw-node.js";

import "./OriginalCSSVars.js";