const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";

const getEffectiveContentDensity = (el: HTMLElement) => getComputedStyle(el).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR);

export default getEffectiveContentDensity;
