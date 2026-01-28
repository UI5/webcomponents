import { defineComponentFramework } from "cypress";

const basePkg: Cypress.CypressComponentDependency = {
  // Unique, semantic identifier.
  type: "ui5-webc-base",
  // Human readable name.
  name: "UI5 Web Components base",
  // Package name install from `npm`.
  package: "@ui5/webcomponents-base",

  /**
   * Similar to package, but can include a version or tag.
   * Used during setup to generate an install command for users.
   * Eg: `solid-js@next`
   */
  installer: "@ui5/webcomponents-base@^2.6.0",

  // Human readable description.
  description: "A required dependency for this project",

  // Minimum supported version.
  minVersion: "^2.6.0",
};

/**
 * The definition.
 */
export default defineComponentFramework({
  /**
   * This should match the `npm` package name.
   * The convention required to ensure your Definition is processed
   * by Cypress is `cypress-ct-*` for global packages, or
   * `@org/cypress-ct-*` for organization level packages.
   */
  type: "@ui5/cypress-ct-ui5-webc",

  icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32"><path fill="url(#a)" d="m24.899 0 .446 2.482a6.215 6.215 0 0 1-1.512 5.273l-1.897 2.091-.453-2.721a6.21 6.21 0 0 1 1.694-5.37L24.9.001 24.898 0Z"/><path fill="url(#b)" d="M6.39 24.337c.12.51.219 1.023.305 1.538a7.353 7.353 0 0 0 8.18 6.066 14.014 14.014 0 0 1-2.322-7.764c0-2.319.556-4.503 1.536-6.42a14.214 14.214 0 0 0-.362 3.199c0 3.902 1.572 7.424 4.098 9.928 2.041-1.28 3.42-3.532 3.468-6.092a7.317 7.317 0 0 0-1.097-4.008 12.591 12.591 0 0 1-.775-1.483l-1.117-2.495a17.444 17.444 0 0 1 .185-14.663l-1.053.632a12.83 12.83 0 0 0-6.223 11.146l.006.583c-.005.113-.153.151-.213.056l-.34-.54a9.78 9.78 0 0 1-.95-1.956l-.42-1.182-.473 1.219a13.009 13.009 0 0 0-.54 7.689.27.27 0 0 1-.053.234l-.067.083a.197.197 0 0 1-.324-.02 10.95 10.95 0 0 1-1.085-2.433l-.272-.892-.133.635a16.511 16.511 0 0 0 .04 6.94h.002Z"/><path fill="url(#c)" d="M6.887 21.526c0-.96.09-1.897.258-2.804a10.898 10.898 0 0 1-.389-1.067l-.273-.892-.132.635a16.511 16.511 0 0 0 .04 6.94c.119.51.218 1.022.304 1.537a7.357 7.357 0 0 0 3.5 5.096 15 15 0 0 1-3.308-9.445Z"/><path fill="url(#d)" d="M8.269 19.442c0-2.483.593-4.823 1.642-6.876a9.71 9.71 0 0 1-.194-.502l-.419-1.182-.473 1.219a13.006 13.006 0 0 0-.553 7.626l-.003-.285Z"/><path fill="url(#e)" d="M17.76 3.91c.21-.6.453-1.19.73-1.768l-1.053.632a12.83 12.83 0 0 0-6.223 11.146l.006.583.254-1.244a14.801 14.801 0 0 1 6.285-9.35h.001Z"/><defs><linearGradient id="a" x1="24.881" x2="21.916" y1="-.006" y2="9.839" gradientUnits="userSpaceOnUse"><stop stop-color="#5D39FF"/><stop offset="1" stop-color="#3AB1D2"/></linearGradient><linearGradient id="b" x1="13.647" x2="13.647" y1="2.143" y2="32" gradientUnits="userSpaceOnUse"><stop stop-color="#5553F5"/><stop offset="1" stop-color="#39B6D0"/></linearGradient><linearGradient id="c" x1="8.098" x2="8.098" y1="16.763" y2="30.971" gradientUnits="userSpaceOnUse"><stop stop-color="#31D1C5"/><stop offset="1" stop-color="#3CAAD4"/></linearGradient><linearGradient id="d" x1="8.926" x2="8.926" y1="10.882" y2="19.727" gradientUnits="userSpaceOnUse"><stop stop-color="#31D1C5"/><stop offset="1" stop-color="#3CAAD4"/></linearGradient><linearGradient id="e" x1="14.852" x2="14.852" y1="2.142" y2="14.503" gradientUnits="userSpaceOnUse"><stop stop-color="#31D1C5"/><stop offset="1" stop-color="#3CAAD4"/></linearGradient></defs></svg>`,

  /**
   * The label that shows up when configuring Component Testing
   * for the first time.
   */
  name: "UI5 Web Components",

  /**
   * Supported bundlers. Can be "webpack" and/or "vite".
   */
  supportedBundlers: ["vite"],

  /**
   * Used by Cypress to automatically detect the correct Framework Definition
   * based on the user's project.
   * In this example, if a module matching `solidDep`
   * is found in the user's project,
   * Solid.js will automatically be selected when configuring Component Testing.
   */
  detectors: [basePkg],

  /**
   * Optionally, some conditional logic, based on whether
   * the user selected Vite or webpack.
   */
  dependencies: (bundler) => {
    return [basePkg];
  },
});
