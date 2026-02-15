import { hasRegisteredTags } from "./CustomElementsRegistry.js";
import VersionInfo from "./generated/VersionInfo.js";
let suf;
let rulesObj = {
    include: [/^ui5-/],
    exclude: [],
};
const tagsCache = new Map(); // true/false means the tag should/should not be cached, undefined means not known yet.
/**
 * Sets the suffix to be used for custom elements scoping, f.e. pass "demo" to get tags such as "ui5-button-demo".
 *
 * **Note:** By default all tags starting with "ui5-" will be scoped, unless you change this by calling "setCustomElementsScopingRules"
 * **Note:** Setting the scoping suffix must be done before importing any components.
 *
 * @public
 * @param suffix The scoping suffix
 */
const setCustomElementsScopingSuffix = (suffix) => {
    if (!suffix.match(/^[a-zA-Z0-9_-]+$/)) {
        throw new Error("Only alphanumeric characters and dashes allowed for the scoping suffix");
    }
    if (hasRegisteredTags()) {
        // eslint-disable-next-line no-console
        console.warn("Setting the scoping suffix must be done before importing any components. For proper usage, read the scoping section: https://github.com/UI5/webcomponents/blob/main/docs/2-advanced/06-scoping.md.");
    }
    suf = suffix;
};
/**
 * Returns the currently set scoping suffix, or undefined if not set.
 *
 * @public
 * @returns {String|undefined}
 */
const getCustomElementsScopingSuffix = () => {
    return suf;
};
/**
 * Sets the rules, governing which custom element tags to scope and which not, f.e.
 * setCustomElementsScopingRules({include: [/^ui5-/]}, exclude: [/^ui5-mylib-/, /^ui5-carousel$/]);
 * will scope all elements starting with "ui5-" but not the ones starting with "ui5-mylib-" and not "ui5-carousel".
 *
 * @public
 * @param rules Object with "include" and "exclude" properties, both arrays of regular expressions. Note that "include"
 * rules are applied first and "exclude" rules second.
 */
const setCustomElementsScopingRules = (rules) => {
    if (!rules || !rules.include) {
        throw new Error(`"rules" must be an object with at least an "include" property`);
    }
    if (!Array.isArray(rules.include) || rules.include.some(rule => !(rule instanceof RegExp))) {
        throw new Error(`"rules.include" must be an array of regular expressions`);
    }
    if (rules.exclude && (!Array.isArray(rules.exclude) || rules.exclude.some(rule => !(rule instanceof RegExp)))) {
        throw new Error(`"rules.exclude" must be an array of regular expressions`);
    }
    rules.exclude = rules.exclude || [];
    rulesObj = rules;
    tagsCache.clear(); // reset the cache upon setting new rules
};
/**
 * Returns the rules, governing which custom element tags to scope and which not. By default, all elements
 * starting with "ui5-" are scoped. The default rules are: {include: [/^ui5-/]}.
 *
 * @public
 * @returns {Object}
 */
const getCustomElementsScopingRules = () => {
    return rulesObj;
};
/**
 * Determines whether custom elements with the given tag should be scoped or not.
 * The tag is first matched against the "include" rules and then against the "exclude" rules and the
 * result is cached until new rules are set.
 *
 * @public
 * @param tag
 */
const shouldScopeCustomElement = (tag) => {
    if (!tagsCache.has(tag)) {
        const result = rulesObj.include.some(rule => tag.match(rule)) && !rulesObj.exclude.some(rule => tag.match(rule));
        tagsCache.set(tag, result);
    }
    return tagsCache.get(tag);
};
/**
 * Returns the currently set scoping suffix, if any and if the tag should be scoped, or undefined otherwise.
 *
 * @public
 * @param tag
 * @returns {String}
 */
const getEffectiveScopingSuffixForTag = (tag) => {
    if (shouldScopeCustomElement(tag)) {
        return getCustomElementsScopingSuffix();
    }
};
/**
 * @public
 * Used for getting a scoped name for a CSS variable using the same transformation used in the build
 * @name the name of the css variable as written in the code
 * @returns a variable name with the current version inserted as available at runtime
 */
const getScopedVarName = (name) => {
    const versionStr = `v${VersionInfo.version.replaceAll(".", "-")}`;
    const expr = /(--_?ui5)([^,:)\s]+)/g;
    return name.replaceAll(expr, `$1-${versionStr}$2`);
};
export { setCustomElementsScopingSuffix, getCustomElementsScopingSuffix, setCustomElementsScopingRules, getCustomElementsScopingRules, shouldScopeCustomElement, getEffectiveScopingSuffixForTag, getScopedVarName, };
//# sourceMappingURL=CustomElementsScopeUtils.js.map