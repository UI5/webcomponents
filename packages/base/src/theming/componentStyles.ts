const packageMap = new Map<string, string>();
const componentsStyleSheet = new CSSStyleSheet();

const getComponentStyles = () => {
	return componentsStyleSheet;
};

const updateComponentStyles = (packageName: string, content: string) => {
	packageMap.set(packageName, content);

	const combinedStyles = Array.from(packageMap.values()).join("\n");
	componentsStyleSheet.replaceSync(combinedStyles);
};

export {
	getComponentStyles,
	updateComponentStyles,
};
