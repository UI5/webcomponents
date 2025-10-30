const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const filterOut = [
	"sapIllus-Dot",
	"sapIllus-Dialog",
	"sapIllus-Scene",
	"sapIllus-Spot",
	"tnt-Dot",
	"tnt-Dialog",
	"tnt-Scene",
	"tnt-Spot",
	"AllIllustrations",
];

const options = {
	port: 8081,
	portStep: 2,
	dev: true,
	fioriPackage: true,
	noWatchTS: true,
	internal: {
		cypress_code_coverage: false,
	},
	illustrationsData: [
		{
			path: "src/illustrations",
			defaultText: true,
			illustrationsPrefix: "sapIllus",
			set: "fiori",
			collection: "V4",
			destinationPath: "dist/illustrations",
			dynamicImports: {
				outputFile: "src/generated/js-imports/Illustrations.ts",
				location: '../../illustrations',
				filterOut
			}
		},
		{
			path: "src/illustrations/tnt",
			defaultText: false,
			illustrationsPrefix: "tnt",
			set: "tnt",
			collection: "V4",
			destinationPath: "dist/illustrations/tnt",
			dynamicImports: {
				outputFile: "src/generated/js-imports/IllustrationsTNT.ts",
				location: '../../illustrations/tnt',
				filterOut
			}
		},
		{
			path: "src/illustrations-v5/tnt",
			defaultText: false,
			illustrationsPrefix: "tnt",
			set: "tnt",
			collection: "V5",
			destinationPath: "dist/illustrations-v5/tnt",
			dynamicImports: {
				outputFile: "src/generated/js-imports/IllustrationsV5TNT.ts",
				location: '../../illustrations-v5/tnt',
				filterOut
			}
		},
		{
			path: "src/illustrations-v5/tnt/hc",
			defaultText: false,
			illustrationsPrefix: "tnt",
			set: "tnt",
			collection: "V5/HC",
			destinationPath: "dist/illustrations-v5/tnt/hc",
			dynamicImports: {
				outputFile: "src/generated/js-imports/IllustrationsV5TNTHC.ts",
				location: '../../illustrations-v5/tnt/hc',
				filterOut
			}
		},
	]
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
