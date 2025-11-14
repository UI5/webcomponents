import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);


const COLLECTION_NAMES = {
	"fiori": "SAP Fiori Illustrations",
	"tnt": "SAP TNT Illustrations",
}

export default async function illustrationsPlugin(context, options) {
	const customManifest = require("@ui5/webcomponents-fiori/dist/custom-elements-internal.json");

	const illustrationType = customManifest
		.modules
		.find(m => m.path.includes("dist/types/IllustrationMessageType.js"))
		.declarations
		.find(d => d.name === "IllustrationMessageType")
		.members
		.map(d => ({ name: d.name, deprecated: d.deprecated }));


	const illustrationDesign = customManifest
		.modules
		.find(m => m.path.includes("dist/types/IllustrationMessageDesign.js"))
		.declarations
		.find(d => d.name === "IllustrationMessageDesign")
		.members
		.map(d => ({ name: d.name, deprecated: d.deprecated }));

	return {
		name: 'docusaurus-plugin-illustrations',
		async contentLoaded({ content, actions }) {
			const { createData, addRoute } = actions;
			const illustrationsInfo = {
				"fiori": illustrationType.filter(i => !i.name.startsWith("Tnt")),
				"tnt": illustrationType.filter(i => i.name.startsWith("Tnt"))
			};

			const illustrationDesignJsonPath = await createData(
				`illustration-design.json`,
				JSON.stringify(illustrationDesign)
			);

			await Promise.all(Object.entries(illustrationsInfo).map(async ([collection, illustrations]) => {
				const illustrationsJsonPath = await createData(
					`${collection}-illustrations.json`,
					JSON.stringify(illustrations),
				);
				const collectNameJsonPath = await createData(
					`illustrations-${collection}-name.json`,
					`"${COLLECTION_NAMES[collection] || collection}"`,
				);

				addRoute({
					path: `/resources/illustrations/${collection}`,
					component: '@site/src/components/Resources/IllustrationCollection',
					modules: {
						// propName -> JSON file path
						illustrationTypes: illustrationsJsonPath,
						illustrationDesign: illustrationDesignJsonPath,
						collectioName: collectNameJsonPath
					},
					exact: true,
				});
			}))
		},
	};
}