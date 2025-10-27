/**
 * The `AllIcons-node` entry point is used to import all icons.
 *
 * It serves as an alternative to the `AllIcons` and `AllIcons-fetch` modules and supports the
 * `with: { type: 'json' }` import attribute for loading JSON files.
 * 
 * This import attribute is required in some environments, such as Node.js with server-side rendering (SSR).
 *
 * Example usage:
 * await import("../generated/assets/v5/SAP-icons.json", { with: { type: 'json' } })
 */

import "./json-imports/Icons-node.js";
