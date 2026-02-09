const packageMap = new Map<string, string>();
let componentsStyleSheet: CSSStyleSheet;

const getComponentStyles = () => {
	if (!componentsStyleSheet) {
		componentsStyleSheet = new CSSStyleSheet();
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
