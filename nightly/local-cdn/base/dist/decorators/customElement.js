/**
 * Returns a custom element class decorator.
 *
 * @param { string | object } tagNameOrComponentSettings
 * @returns { ClassDecorator }
 */
const customElement = (tagNameOrComponentSettings = {}) => {
    return (target) => {
        if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
            target.metadata = {};
        }
        if (typeof tagNameOrComponentSettings === "string") {
            target.metadata.tag = tagNameOrComponentSettings;
            return;
        }
        const { tag, languageAware, themeAware, cldr, fastNavigation, formAssociated, shadowRootOptions, } = tagNameOrComponentSettings;
        target.metadata.tag = tag;
        if (languageAware) {
            target.metadata.languageAware = languageAware;
        }
        if (cldr) {
            target.metadata.cldr = cldr;
        }
        if (themeAware) {
            target.metadata.themeAware = themeAware;
        }
        if (fastNavigation) {
            target.metadata.fastNavigation = fastNavigation;
        }
        if (formAssociated) {
            target.metadata.formAssociated = formAssociated;
        }
        if (shadowRootOptions) {
            target.metadata.shadowRootOptions = shadowRootOptions;
        }
        ["renderer", "template", "styles", "dependencies"].forEach((customElementEntity) => {
            const customElementEntityValue = tagNameOrComponentSettings[customElementEntity];
            customElementEntityValue && Object.defineProperty(target, customElementEntity, {
                get: () => tagNameOrComponentSettings[customElementEntity],
            });
        });
    };
};
export default customElement;
//# sourceMappingURL=customElement.js.map