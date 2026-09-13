import { html, svg, unsafeStatic, } from "lit-html/static.js";
import { setCustomElementsScopingSuffix, getCustomElementsScopingSuffix, setCustomElementsScopingRules, getCustomElementsScopingRules, shouldScopeCustomElement, getEffectiveScopingSuffixForTag, getScopedVarName, } from "./CustomElementsScopeUtils.js";
import { registerFeature } from "./FeaturesRegistry.js";
class LitStatic {
}
LitStatic.html = html;
LitStatic.svg = svg;
LitStatic.unsafeStatic = unsafeStatic;
registerFeature("LitStatic", LitStatic);
export { LitStatic, setCustomElementsScopingSuffix, getCustomElementsScopingSuffix, setCustomElementsScopingRules, getCustomElementsScopingRules, shouldScopeCustomElement, getEffectiveScopingSuffixForTag, getScopedVarName, };
//# sourceMappingURL=CustomElementsScope.js.map