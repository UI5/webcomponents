const config = require("@ui5/webcomponents-tools/components-package/eslint.js");
const testConfig = require("@ui5/cypress-internal/eslint.cjs");

if (config.overrides) {
    config.overrides.push(testConfig);
} else {
    config.overrides = [testConfig];
}

module.exports = config;
