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
    if (!element._internals?.form) {
        return;
    }
    if (element.formValidity && Object.keys(element.formValidity).some(key => key)) {
        const focusRef = await element.formElementAnchor?.();
        element._internals.setValidity(element.formValidity, element.formValidityMessage, focusRef);
    }
    else {
        element._internals.setValidity({});
    }
};
const submitForm = (element) => {
    element._internals?.form?.requestSubmit();
};
const resetForm = (element) => {
    element._internals?.form?.reset();
};
const isInputElement = (element) => {
    return "formFormattedValue" in element && "name" in element;
};
export { updateFormValue, setFormValue, setFormValidity, submitForm, resetForm, };
//# sourceMappingURL=InputElementsFormSupport.js.map