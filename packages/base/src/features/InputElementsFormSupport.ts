import type UI5Element from "../UI5Element.js";

type FormattedValue = FormData | string | null;
type ElementAnchor = HTMLElement | undefined;

interface IFormInputElement extends UI5Element {
	name?: string;
	formFormattedValue: FormattedValue | Promise<FormattedValue>;
	formValidityMessage?: string | Promise<string>;
	formValidity?: ValidityStateFlags | Promise<ValidityStateFlags>;
	formElementAnchor?: () => ElementAnchor | Promise<ElementAnchor>;
}

const updateFormValue = (element: IFormInputElement | UI5Element) => {
	if (isInputElement(element)) {
		setFormValue(element);
	}
};

const setFormValue = async (element: IFormInputElement) => {
	if (!element._internals?.form) {
		return;
	}

	setFormValidity(element);

	if (!element.name) {
		element._internals?.setFormValue(null);
		return;
	}

	const formattedValue = element.formFormattedValue instanceof Promise
		? await element.formFormattedValue
		: element.formFormattedValue;
	element._internals.setFormValue(formattedValue);
};

const setFormValidity = async (element: IFormInputElement) => {
	if (!element._internals?.form) {
		return;
	}
	const formValidity = element.formValidity instanceof Promise
		? await element.formValidity
		: element.formValidity;

	const formValidityMessage = element.formValidityMessage instanceof Promise
		? await element.formValidityMessage
		: element.formValidityMessage;

	if (formValidity && Object.keys(formValidity).some(key => key)) {
		const focusRef = await element.formElementAnchor?.();
		element._internals.setValidity(formValidity, formValidityMessage, focusRef);
	} else {
		element._internals.setValidity({});
	}
};

const submitForm = (element: UI5Element) => {
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
