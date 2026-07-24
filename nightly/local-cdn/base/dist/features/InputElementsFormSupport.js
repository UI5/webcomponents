/**
 * Gets the associated form for an element.
 * If the element has a `form` attribute, it looks up the form by ID.
 * Otherwise, it falls back to the form associated via ElementInternals.
 */
const getAssociatedForm = (element) => {
    const formAttribute = element.getAttribute("form");
    if (formAttribute) {
        const form = document.getElementById(formAttribute);
        return form instanceof HTMLFormElement ? form : null;
    }
    return element._internals?.form ?? null;
};
const updateFormValue = (element) => {
    if (isInputElement(element)) {
        setFormValue(element);
    }
};
const setFormValue = (element) => {
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
const setFormValidity = async (element) => {
    if (!element.isUI5Element || !element._internals?.form) {
        return;
    }
    element._internals.setValidity({ customError: true }, " "); // treat the form as invalid until CLDR and message bundles are loaded
    await element.definePromise;
    if (element.formValidity && Object.keys(element.formValidity).some(key => key)) {
        const focusRef = await element.formElementAnchor?.();
        element._internals.setValidity(element.formValidity, element.formValidityMessage, focusRef);
    }
    else {
        element._internals.setValidity({});
    }
};
const submitForm = async (element) => {
    const form = getAssociatedForm(element);
    if (!form) {
        return;
    }
    const elements = [...form.elements];
    await Promise.all(elements.map(el => { return isInputElement(el) ? setFormValidity(el) : Promise.resolve(); }));
    form.requestSubmit();
};
const resetForm = (element) => {
    const form = getAssociatedForm(element);
    form?.reset();
};
const isInputElement = (element) => {
    return "formFormattedValue" in element && "name" in element;
};
export { updateFormValue, setFormValue, setFormValidity, submitForm, resetForm, };
//# sourceMappingURL=InputElementsFormSupport.js.map