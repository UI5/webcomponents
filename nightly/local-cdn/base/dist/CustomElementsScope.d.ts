import { setCustomElementsScopingSuffix, getCustomElementsScopingSuffix, setCustomElementsScopingRules, getCustomElementsScopingRules, shouldScopeCustomElement, getEffectiveScopingSuffixForTag, getScopedVarName } from "./CustomElementsScopeUtils.js";
declare class LitStatic {
    static html: (strings: TemplateStringsArray, ...values: unknown[]) => import("lit-html").TemplateResult;
    static svg: (strings: TemplateStringsArray, ...values: unknown[]) => import("lit-html").TemplateResult;
    static unsafeStatic: (value: string) => object;
}
export { LitStatic, setCustomElementsScopingSuffix, getCustomElementsScopingSuffix, setCustomElementsScopingRules, getCustomElementsScopingRules, shouldScopeCustomElement, getEffectiveScopingSuffixForTag, getScopedVarName, };
