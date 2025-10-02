const wdio = require("@ui5/webcomponents-tools/components-package/wdio.js");
wdio.config.services.push("devtools");
module.exports = wdio;
