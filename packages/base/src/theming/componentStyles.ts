import CommonStylesCss from "../generated/css/CommonStyles.css.js";

const packageMap = new Map<string, string>();

packageMap.set("ui5-common-component-styles", CommonStylesCss);

let componentsStyleSheet: CSSStyleSheet;

const getComponentStyles = () => {
	if (!componentsStyleSheet) {
		componentsStyleSheet = new CSSStyleSheet();
		componentsStyleSheet.replaceSync(Array.from(packageMap.values()).join("\n"));
	}

	return componentsStyleSheet;
};

const updateComponentStyles = (packageName: string, content: string) => {
	packageMap.set(packageName, content);

	const combinedStyles = Array.from(packageMap.values()).join("\n");
	getComponentStyles().replaceSync(combinedStyles);
};

export {
	getComponentStyles,
	updateComponentStyles,
};
