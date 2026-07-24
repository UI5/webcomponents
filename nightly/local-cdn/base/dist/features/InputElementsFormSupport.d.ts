import type UI5Element from "../UI5Element.js";
interface IFormInputElement extends UI5Element {
    name?: string;
    formFormattedValue: FormData | string | null;
    formValidityMessage?: string;
    formValidity?: ValidityStateFlags;
    formElementAnchor?: () => HTMLElement | undefined | Promise<HTMLElement | undefined>;
}
declare const updateFormValue: (element: IFormInputElement | UI5Element) => void;
declare const setFormValue: (element: IFormInputElement) => void;
declare const setFormValidity: (element: IFormInputElement) => Promise<void>;
declare const submitForm: (element: UI5Element) => Promise<void>;
declare const resetForm: (element: UI5Element) => void;
export { updateFormValue, setFormValue, setFormValidity, submitForm, resetForm, };
export type { IFormInputElement, };
