import type UI5Element from "../UI5Element.js";

interface IFormInputElement extends UI5Element {
	name?: string;
	formFormattedValue: FormData | string | null;
	formValidityMessage?: string;
	formValidity?: ValidityStateFlags;
	formElementAnchor?: () => HTMLElement | undefined | Promise<HTMLElement | undefined>;
}

const updateFormValue = (element: IFormInputElement | UI5Element) => {
	if (isInputElement(element)) {
		setFormValue(element);
	}
};

const setFormValue = (element: IFormInputElement) => {
	if (!element._internals?.form) {
		return;
	}

	setFormValidity(element);

	if (!element.name) {
		element._internals?.setFormValue(null);
		return;
	}

	element._internals.setFormValue(element.formFormattedValue);
};

const setFormValidity = async (element: IFormInputElement) => {
	if (!element.isUI5Element || !element._internals?.form) {
		return;
	}

	element._internals.setValidity({ customError: true }, " "); // treat the form as invalid until CLDR and message bundles are loaded
	await element.definePromise;

	if (element.formValidity && Object.keys(element.formValidity).some(key => key)) {
		const focusRef = await element.formElementAnchor?.();
		element._internals.setValidity(element.formValidity, element.formValidityMessage, focusRef);
	} else {
		element._internals.setValidity({});
	}
};

const submitForm = async (element: UI5Element) => {
	const elements = [...(element._internals?.form?.elements ?? [])] as Array<IFormInputElement | UI5Element>;

	await Promise.all(elements.map(el => { return isInputElement(el) ? setFormValidity(el) : Promise.resolve(); }));

	element._internals?.form?.requestSubmit();
};

const resetForm = (element: UI5Element) => {
	element._internals?.form?.reset();
};

const isInputElement = (element: IFormInputElement | UI5Element): element is IFormInputElement => {
	return "formFormattedValue" in element && "name" in element;
};

export {
	updateFormValue,
	setFormValue,
	setFormValidity,
	submitForm,
	resetForm,
};

export type {
	IFormInputElement,
};
