import { _getRegisteredNames as getIconNames, getIconData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";

const COLLECTION_NAMES = {
	"SAP-icons": "SAP Icons",
	"tnt": "SAP TNT Icons",
	"business-suite": "SAP BSuite Icons"
}

export default function iconsPlugin(context, options) {
	return {
		name: 'docusaurus-plugin-icons',
		async contentLoaded({ content, actions }) {
			const iconNames = await getIconNames();
			const iconsInfo = [];
			const collections = new Set();

			await Promise.all(iconNames.map(async (name) => {
				const iconData = await getIconData(name);
				const collection = iconData.collection.replace(/-v\d+/, "");

				collections.add(collection);
				iconsInfo.push({ ...iconData, name: name.split("/").pop(), collection }); // remove collection version if present
			}));

			const { createData, addRoute } = actions;

			await Promise.all([...collections].map(async (collection) => {
				const icons = iconsInfo.filter(icon => icon.collection === collection);

				const iconsJsonPath = await createData(
					`${collection}-icons.json`,
					JSON.stringify(icons),
				);

				const collectNameJsonPath = await createData(
					`icons-${collection}-name.json`,
					`"${COLLECTION_NAMES[collection] || collection}"`,
				);

				addRoute({
					path: `/resources/icons/${collection}`,
					component: '@site/src/components/Resources/IconCollection',
					modules: {
						// propName -> JSON file path
						icons: iconsJsonPath,
						collectioName: collectNameJsonPath
					},
					exact: true,
				});
			}));
		},
	};
}