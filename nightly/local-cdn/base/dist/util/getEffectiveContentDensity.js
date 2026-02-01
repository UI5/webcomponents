const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";
const getEffectiveContentDensity = (el) => getComputedStyle(el).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR);
export default getEffectiveContentDensity;
//# sourceMappingURL=getEffectiveContentDensity.js.map