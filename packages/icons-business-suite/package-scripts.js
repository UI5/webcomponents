import getScripts from "@ui5/webcomponents-tools/icons-collection/nps.js";

const options = {
	collectionName: "SAP-icons-business-suite",
	versions: ["v1", "v2"],
};

const scripts = getScripts(options);

// no i18n in this package
scripts.build.i18n = "";
scripts.build.jsonImports = "";

export default {
	scripts
};
