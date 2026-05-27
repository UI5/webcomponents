import type UI5Element from "@ui5/webcomponents-base";
import { getCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { hasRegisteredTags } from "@ui5/webcomponents-base/dist/CustomElementsRegistry.js";

let suf: string;

const setCompatCustomElementsScopingSuffix = (suffix: string) => {
	if (!suffix.match(/^[a-zA-Z0-9_-]+$/)) {
		throw new Error("Only alphanumeric characters and dashes allowed for the scoping suffix");
	}

	if (hasRegisteredTags()) {
		// eslint-disable-next-line no-console
		console.warn("Setting the compatibility scoping suffix must be done before importing any components. For proper usage, read the scoping section: https://github.com/UI5/webcomponents/blob/main/docs/2-advanced/06-scoping.md.");
	}

	suf = suffix;
};

const getCompatCustomElementsScopingSuffix = () => {
	return suf;
};

const patchScopingSuffix = (klass: typeof UI5Element) => {
	const metadata = klass.getMetadata();
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const originalGetTag = metadata.getTag;

	metadata.getTag = function getTag() {
		const originalTag = originalGetTag.call(this);

		if (!originalTag) {
			return "";
		}

		const compatSuffix = getCompatCustomElementsScopingSuffix();
		const suffix = getCustomElementsScopingSuffix();

		if (!compatSuffix) {
			return originalTag;
		}

		if (suffix && originalTag.endsWith(`-${suffix}`)) {
			return originalTag.replace(`-${suffix}`, `-${compatSuffix}-${suffix}`);
		}

		return `${originalTag}-${compatSuffix}`;
	};
};

export {
	setCompatCustomElementsScopingSuffix,
	getCompatCustomElementsScopingSuffix,
	patchScopingSuffix,
};
