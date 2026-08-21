const fs = require("fs").promises;
const path = require("path");

const generate = async (argv) => {
	if (argv.length < 7) {
		throw new Error("Not enough arguments");
	}

	const ORIGINAL_TEXTS = {
		UnableToLoad: "UnableToLoad",
		UnableToUpload: "UnableToUpload",
		NoActivities: "NoActivities",
		BeforeSearch: "BeforeSearch",
		NoSearchResults: "NoSearchResults",
		NoEntries: "NoEntries",
		NoData: "NoData",
		NoNotifications: "NoNotifications",
		BalloonSky: "BalloonSky",
		SuccessScreen: "SuccessScreen",
		NoMail: "NoMail",
		NoSavedItems: "NoSavedItems",
		NoTasks: "NoTasks",
		NoDimensionsSet: "NoDimensionsSet",
		AddPeople: "AddPeople",
		AddColumn: "AddColumn",
		SortColumn: "SortColumn",
		FilterTable: "FilterTable",
		ResizeColumn: "ResizeColumn",
		GroupTable: "GroupTable",
		UploadCollection: "UploadCollection"
	};

	const FALLBACK_TEXTS = {
		ReloadScreen: ORIGINAL_TEXTS.UnableToLoad,
		Connection: ORIGINAL_TEXTS.UnableToLoad,
		ErrorScreen: ORIGINAL_TEXTS.UnableToUpload,
		EmptyCalendar: ORIGINAL_TEXTS.NoActivities,
		SearchEarth: ORIGINAL_TEXTS.BeforeSearch,
		SearchFolder: ORIGINAL_TEXTS.NoSearchResults,
		EmptyList: ORIGINAL_TEXTS.NoEntries,
		Tent: ORIGINAL_TEXTS.NoData,
		SleepingBell: ORIGINAL_TEXTS.NoNotifications,
		SimpleBalloon: ORIGINAL_TEXTS.BalloonSky,
		SimpleBell: ORIGINAL_TEXTS.NoNotifications,
		SimpleCalendar: ORIGINAL_TEXTS.NoActivities,
		SimpleCheckMark: ORIGINAL_TEXTS.SuccessScreen,
		SimpleConnection: ORIGINAL_TEXTS.UnableToLoad,
		SimpleEmptyDoc: ORIGINAL_TEXTS.NoData,
		SimpleEmptyList: ORIGINAL_TEXTS.NoEntries,
		SimpleError: ORIGINAL_TEXTS.UnableToUpload,
		SimpleMagnifier: ORIGINAL_TEXTS.BeforeSearch,
		SimpleMail: ORIGINAL_TEXTS.NoMail,
		SimpleNoSavedItems: ORIGINAL_TEXTS.NoSavedItems,
		SimpleNotFoundMagnifier: ORIGINAL_TEXTS.NoSearchResults,
		SimpleReload: ORIGINAL_TEXTS.UnableToLoad,
		SimpleTask: ORIGINAL_TEXTS.NoTasks,
		NoChartData: ORIGINAL_TEXTS.NoDimensionsSet,
		AddingColumns: ORIGINAL_TEXTS.AddColumn,
		SortingColumns: ORIGINAL_TEXTS.SortColumn,
		FilteringColumns: ORIGINAL_TEXTS.FilterTable,
		ResizingColumns: ORIGINAL_TEXTS.ResizeColumn,
		GroupingColumns: ORIGINAL_TEXTS.GroupTable,
		AddPeopleToCalendar: ORIGINAL_TEXTS.AddPeople,
		DragFilesToUpload: ORIGINAL_TEXTS.UploadCollection,
		KeyTask: ORIGINAL_TEXTS.SuccessScreen,
		ReceiveAppreciation: ORIGINAL_TEXTS.BalloonSky,
		SuccessBalloon: ORIGINAL_TEXTS.BalloonSky,
		SuccessCheckMark: ORIGINAL_TEXTS.SuccessScreen,
		SuccessHighFive: ORIGINAL_TEXTS.BalloonSky
	};

	const srcPath = argv[2];
	const defaultText = argv[3] === "true";
	const illustrationsPrefix = argv[4];
	const illustrationSet = argv[5];
	const destPath = argv[6];
	const collection = argv[7];
	const fileNamePattern = new RegExp(`${illustrationsPrefix}-.+-(.+).svg`);
	// collect each illustration name because each one should have Sample.js file
	const fileNames = new Set();

	let dotIllustrationNames = [];
	let v5IllustrationNames = new Set();

	try {
		await fs.access(srcPath);
	} catch (error) {
		if (process.env.UI5_VERBOSE === "true") {
			console.log(`The path ${srcPath} does not exist.`);
		}
		return Promise.resolve(null);
	}

	// For V4 TNT illustrations, check which ones have V5 versions available
	// so we only register V5 loaders for illustrations that actually exist
	if (collection === "V4" && illustrationSet === "tnt") {
		const v5Path = srcPath.replace("/illustrations/", "/illustrations-v5/");
		try {
			const v5Files = await fs.readdir(path.normalize(v5Path));
			const v5Pattern = new RegExp(`${illustrationsPrefix}-.+-(.+).svg`);
			v5Files.forEach(file => {
				const match = file.match(v5Pattern);
				if (match) {
					v5IllustrationNames.add(match[1]);
				}
			});
		} catch (error) {
			// V5 path doesn't exist, no V5 illustrations available
		}
	}

	if (process.env.UI5_VERBOSE === "true") {
		console.log(`Generating illustrations from ${srcPath} to ${destPath}`);
	}

	const svgImportTemplate = svgContent => {
		return `export default \`${svgContent}\`;`
	};
	const svgToJs = async fileName => {
		const svg = await fs.readFile(path.join(srcPath, fileName), { encoding: "utf-8" });
		const fileContent = svgImportTemplate(svg);
		const fileNameSplitArr = fileName.split('-');
		fileName = fileName.replace(/\.svg$/, ".js");

		if (fileNameSplitArr[1] === 'Dot') {
			// we keep the Dot illustration names to import them later. If no Dot is present, Spot will be used
			dotIllustrationNames.push(fileNameSplitArr[2].split('.')[0]);
		}

		return fs.writeFile(path.join(destPath, fileName), fileContent);
	};
	const illustrationImportTemplate = illustrationName => {
		let illustrationNameForTranslation = illustrationName;

		if (defaultText) {
			if (FALLBACK_TEXTS[illustrationNameForTranslation]) {
				illustrationNameForTranslation = FALLBACK_TEXTS[illustrationNameForTranslation];
			} else if (illustrationName.indexOf("_v") !== -1) {
				illustrationNameForTranslation = illustrationNameForTranslation.substr(0, illustrationNameForTranslation.indexOf('_v'));
			}
		}

		const illustrationNameUpperCase = illustrationNameForTranslation.toUpperCase();
		// If no Dot is present, Spot will be imported as Dot
		const hasDot = dotIllustrationNames.indexOf(illustrationName) !== -1 ? 'Dot' : 'Spot';

		// For V4 TNT illustrations that have V5 versions, register loaders for V5 and V5/HC
		// so that when the illustration is imported directly (e.g., "@ui5/webcomponents-fiori/dist/illustrations/tnt/NoApplications.js")
		// and Horizon themes are used, the correct V5 illustration is loaded dynamically.
		// Note: Only TNT set has V5 illustrations, and not all TNT illustrations have V5 versions.
		// The dynamic imports ensure that V5 SVGs are loaded lazily only when actually needed.
		const hasV5Version = v5IllustrationNames.has(illustrationName);
		const v5LoaderRegistration = collection === "V4" && illustrationSet === "tnt" && hasV5Version ? `
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("${illustrationSet}/V5/${illustrationName}", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/${illustrationSet}/${illustrationName}.js")).default;
});
registerIllustrationLoader("${illustrationSet}/V5/HC/${illustrationName}", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/${illustrationSet}/hc/${illustrationName}.js")).default;
});
` : '';

		return `import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./${illustrationsPrefix}-Dialog-${illustrationName}.js";
import sceneSvg from "./${illustrationsPrefix}-Scene-${illustrationName}.js";
import spotSvg from "./${illustrationsPrefix}-Spot-${illustrationName}.js";
import dotSvg from "./${illustrationsPrefix}-${hasDot}-${illustrationName}.js";${defaultText ? `import {
	IM_TITLE_${illustrationNameUpperCase},
	IM_SUBTITLE_${illustrationNameUpperCase},
} from "../generated/i18n/i18n-defaults.js";` : ``}${v5LoaderRegistration}

const name = "${illustrationName}";
const set = "${illustrationSet}";
const collection = "${collection}";${defaultText ? `
const title = IM_TITLE_${illustrationNameUpperCase};
const subtitle = IM_SUBTITLE_${illustrationNameUpperCase};` : ``}

unsafeRegisterIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,${defaultText ? `
	title,
	subtitle,` : ``}
	set,
	collection,
});

export default "${illustrationSet === "fiori" ? "" : `${illustrationSet}/`}${illustrationName}";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};`
	};

	const illustrationTypeDefinition = illustrationName => {
		return `declare const dialogSvg: string;
declare const sceneSvg: string;
declare const spotSvg: string;
declare const dotSvg: string;
declare const _default: "${illustrationSet === "fiori" ? "" : `${illustrationSet}/`}${illustrationName}";

export default _default;
export { dialogSvg, sceneSvg, spotSvg, dotSvg };`
	};

	await fs.mkdir(destPath, { recursive: true });

	const illustrationFileNames = await fs.readdir(path.normalize(srcPath));

	// convert SVG to JS imports
	const promises = [];
	illustrationFileNames.forEach(illustration => {
		if (fileNamePattern.test(illustration)) {
			let [fileName, illustrationName] = illustration.match(fileNamePattern);

			promises.push(svgToJs(fileName));
			fileNames.add(illustrationName);
		}
	});

	return Promise.all(promises)
		.then(() => {
			const nestedPromises = [];
			for (let illustrationName of fileNames) {
				nestedPromises.push(fs.writeFile(path.join(destPath, `${illustrationName}.js`), illustrationImportTemplate(illustrationName)));
				nestedPromises.push(fs.writeFile(path.join(destPath, `${illustrationName}.d.ts`), illustrationTypeDefinition(illustrationName)));
			}

			return Promise.all(nestedPromises);
		})
		.then(() => {
			if (process.env.UI5_VERBOSE === "true") {
				console.log("Illustrations generated.");
			}
		});
};

if (require.main === module) {
	generate(process.argv)
}

exports._ui5mainFn = generate;