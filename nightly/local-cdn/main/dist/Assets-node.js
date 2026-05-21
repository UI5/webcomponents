/**
 * The `Assets-node` entry point is used to import all CLDR, theming, and i18n assets.
 *
 * It serves as an alternative to the `Assets` and `Assets-fetch` modules and supports the
 * `with: { type: 'json' }` import attribute for loading JSON files.
 *
 * This import attribute is required in some environments, such as Node.js with server-side rendering (SSR).
 *
 * Example usage:
 * await import("../assets/i18n/messagebundle_bg.json", { with: { type: 'json' } })
 */
// common assets
import "@ui5/webcomponents-base/dist/Assets-node.js"; // Base i18n
import "@ui5/webcomponents-localization/dist/Assets-node.js"; // CLDR
import "@ui5/webcomponents-theming/dist/Assets-node.js"; // Theming
import "@ui5/webcomponents-icons/dist/Assets-node.js"; // Icons texts
// own main package assets
import "./generated/json-imports/Themes-node.js";
import "./generated/json-imports/i18n-node.js";
//# sourceMappingURL=Assets-node.js.map