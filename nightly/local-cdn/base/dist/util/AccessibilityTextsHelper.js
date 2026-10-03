const associatedElements = new WeakMap();
const registeredElements = new WeakMap();
const observerOptions = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
};
const getEffectiveAriaLabelText = (el) => {
    const accessibleEl = el;
    if (!accessibleEl.accessibleNameRef) {
        if (accessibleEl.accessibleName) {
            return accessibleEl.accessibleName;
        }
        return undefined;
    }
    return getAllAccessibleNameRefTexts(el);
};
/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 */
const getAllAccessibleNameRefTexts = (el) => {
    const ids = el.accessibleNameRef?.split(" ") ?? [];
    let result = "";
    ids.forEach((elementId, index) => {
        const element = _getReferencedElementById(el, elementId);
        const text = `${element && element.textContent ? element.textContent : ""}`;
        if (text) {
            result += text;
            if (index < ids.length - 1) {
                result += " ";
            }
        }
    });
    return result;
};
const _getAllAssociatedElementsFromDOM = (el) => {
    const set = new Set();
    // adding labels with attribute for matching the el.id
    const labelsForAssociated = _getAssociatedLabels(el);
    labelsForAssociated.forEach(itm => {
        set.add(itm);
    });
    // adding other elements that id is the same as accessibleNameRef value
    const ariaLabelledBy = el["accessibleNameRef"];
    const ariaDescribedBy = el["accessibleDescriptionRef"];
    const value = [ariaLabelledBy, ariaDescribedBy].filter(Boolean).join(" ");
    const ids = value ? value.split(" ") : [];
    ids.forEach(id => {
        const refEl = _getReferencedElementById(el, id);
        if (refEl) {
            set.add(refEl);
        }
    });
    return Array.from(set);
};
const _getAssociatedLabels = (el) => {
    const labels = el.getRootNode().querySelectorAll(`[for="${el.id}"]`);
    return Array.from(labels);
};
const _getReferencedElementById = (el, elementId) => {
    return el.getRootNode().querySelector(`[id='${elementId}']`) || document.getElementById(elementId);
};
/**
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related "label for" texts
 */
const getAssociatedLabelForTexts = (el) => {
    const results = [];
    const labels = _getAssociatedLabels(el);
    labels.forEach((label) => {
        const labelText = label.textContent;
        labelText && results.push(labelText);
    });
    if (results.length) {
        return results.join(" ");
    }
    return undefined;
};
const _createInvalidationCallback = (el) => {
    const invalidationCallback = (changeInfo) => {
        const isAccessibleNameRefChange = changeInfo && changeInfo.type === "property" && changeInfo.name === "accessibleNameRef";
        const isAccessibleDescriptionRefChange = changeInfo && changeInfo.type === "property" && changeInfo.name === "accessibleDescriptionRef";
        if (!isAccessibleNameRefChange && !isAccessibleDescriptionRefChange) {
            return;
        }
        const registeredElement = registeredElements.get(el);
        if (!registeredElement) {
            return;
        }
        const oldAssociatedElements = registeredElement.observedElements;
        const newAssociatedElements = _getAllAssociatedElementsFromDOM(el);
        oldAssociatedElements.forEach(oldElement => {
            if (!newAssociatedElements.includes(oldElement)) {
                _removeObservedElementFromRegisteredElement(registeredElement, oldElement);
            }
        });
        newAssociatedElements.forEach(newElement => {
            if (!oldAssociatedElements.includes(newElement)) {
                _addObservedElementToRegisteredElement(registeredElement, newElement);
                registeredElement.observedElements.push(newElement);
            }
        });
        registeredElement?.callback();
    };
    return invalidationCallback;
};
const registerUI5Element = (el, callback) => {
    if (registeredElements.has(el)) {
        return;
    }
    const allAssociatedElements = _getAllAssociatedElementsFromDOM(el);
    const invalidationCallback = _createInvalidationCallback(el);
    const registeredElement = {
        host: el,
        observedElements: allAssociatedElements,
        callback,
        invalidationCallback,
    };
    registeredElements.set(el, registeredElement);
    el.attachInvalidate(invalidationCallback);
    allAssociatedElements.forEach((element) => {
        _addObservedElementToRegisteredElement(registeredElement, element);
    });
    callback();
};
const _addObservedElementToRegisteredElement = (registeredElement, element) => {
    let associatedElement = associatedElements.get(element);
    if (!associatedElement) {
        associatedElement = { observer: null, callbacks: [] };
        const observer = new MutationObserver(() => {
            const callbacks = associatedElement.callbacks;
            callbacks.forEach(callback => {
                callback();
            });
            const domEl = document.getElementById(element.id);
            // if no longer should be observed from this registeredElement, remove it
            if (!(registeredElement.host.id === element.getAttribute("for") || domEl)) {
                _removeObservedElementFromRegisteredElement(registeredElement, element);
            }
        });
        associatedElement.observer = observer;
        observer.observe(element, observerOptions);
        associatedElements.set(element, associatedElement);
    }
    if (!associatedElement.callbacks.includes(registeredElement.callback)) {
        associatedElement.callbacks.push(registeredElement.callback);
    }
};
const _removeObservedElementFromRegisteredElement = (registeredElement, element) => {
    const associatedElement = associatedElements.get(element);
    if (associatedElement) {
        associatedElement.callbacks = associatedElement.callbacks.filter(itm => itm !== registeredElement.callback);
        if (!associatedElement.callbacks.length) {
            associatedElement.observer?.disconnect();
            associatedElements.delete(element);
        }
    }
    registeredElement.observedElements = registeredElement.observedElements.filter(itm => itm !== element);
};
const deregisterUI5Element = (el) => {
    const registeredElement = registeredElements.get(el);
    if (!registeredElement) {
        return;
    }
    const oldObservedElements = [...registeredElement.observedElements];
    oldObservedElements.forEach(observedElement => {
        _removeObservedElementFromRegisteredElement(registeredElement, observedElement);
    });
    el.detachInvalidate(registeredElement.invalidationCallback);
    registeredElements.delete(el);
};
const getEffectiveAriaDescriptionText = (el) => {
    const accessibleEl = el;
    if (!accessibleEl.accessibleDescriptionRef) {
        if (accessibleEl.accessibleDescription) {
            return accessibleEl.accessibleDescription;
        }
        return undefined;
    }
    return getAllAccessibleDescriptionRefTexts(el);
};
const getAllAccessibleDescriptionRefTexts = (el) => {
    const ids = el.accessibleDescriptionRef?.split(" ") ?? [];
    let result = "";
    ids.forEach((elementId, index) => {
        const element = _getReferencedElementById(el, elementId);
        const text = `${element && element.textContent ? element.textContent : ""}`;
        if (text) {
            result += text;
            if (index < ids.length - 1) {
                result += " ";
            }
        }
    });
    return result;
};
export { getEffectiveAriaLabelText, getAssociatedLabelForTexts, registerUI5Element, deregisterUI5Element, getAllAccessibleNameRefTexts, getEffectiveAriaDescriptionText, getAllAccessibleDescriptionRefTexts, };
//# sourceMappingURL=AccessibilityTextsHelper.js.map