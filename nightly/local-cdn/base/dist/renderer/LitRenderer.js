import { render, html, svg, } from "lit-html";
import { getFeature } from "../FeaturesRegistry.js";
const effectiveHtml = (strings, ...values) => {
    const litStatic = getFeature("LitStatic");
    const fn = litStatic ? litStatic.html : html;
    return fn(strings, ...values);
};
const effectiveSvg = (strings, ...values) => {
    const litStatic = getFeature("LitStatic");
    const fn = litStatic ? litStatic.svg : svg;
    return fn(strings, ...values);
};
const litRender = (instance, container) => {
    let templateResult = instance.render();
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (openUI5Enablement) {
        templateResult = openUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, instance, templateResult);
    }
    render(templateResult, container, { host: instance });
};
const scopeTag = (tag, tags, suffix) => {
    const litStatic = getFeature("LitStatic");
    if (litStatic) {
        return litStatic.unsafeStatic((tags || []).includes(tag) ? `${tag}-${suffix}` : tag);
    }
};
export { effectiveHtml as html, effectiveSvg as svg, };
export { scopeTag };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
// @ts-ignore style-map is a JS file
export { styleMap } from "./directives/style-map.js";
export { ifDefined } from "lit-html/directives/if-defined.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";
export default litRender;
//# sourceMappingURL=LitRenderer.js.map