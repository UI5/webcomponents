type Rules = {
    include: Array<RegExp>;
    exclude: Array<RegExp>;
};
/**
 * Sets the suffix to be used for custom elements scoping, f.e. pass "demo" to get tags such as "ui5-button-demo".
 *
 * **Note:** By default all tags starting with "ui5-" will be scoped, unless you change this by calling "setCustomElementsScopingRules"
 * **Note:** Setting the scoping suffix must be done before importing any components.
 *
 * @public
 * @param suffix The scoping suffix
 */
declare const setCustomElementsScopingSuffix: (suffix: string) => void;
/**
 * Returns the currently set scoping suffix, or undefined if not set.
 *
 * @public
 * @returns {String|undefined}
 */
declare const getCustomElementsScopingSuffix: () => string | undefined;
/**
 * Sets the rules, governing which custom element tags to scope and which not, f.e.
 * setCustomElementsScopingRules({include: [/^ui5-/]}, exclude: [/^ui5-mylib-/, /^ui5-carousel$/]);
 * will scope all elements starting with "ui5-" but not the ones starting with "ui5-mylib-" and not "ui5-carousel".
 *
 * @public
 * @param rules Object with "include" and "exclude" properties, both arrays of regular expressions. Note that "include"
 * rules are applied first and "exclude" rules second.
 */
declare const setCustomElementsScopingRules: (rules: Rules) => void;
/**
 * Returns the rules, governing which custom element tags to scope and which not. By default, all elements
 * starting with "ui5-" are scoped. The default rules are: {include: [/^ui5-/]}.
 *
 * @public
 * @returns {Object}
 */
declare const getCustomElementsScopingRules: () => Rules;
/**
 * Determines whether custom elements with the given tag should be scoped or not.
 * The tag is first matched against the "include" rules and then against the "exclude" rules and the
 * result is cached until new rules are set.
 *
 * @public
 * @param tag
 */
declare const shouldScopeCustomElement: (tag: string) => boolean | undefined;
/**
 * Returns the currently set scoping suffix, if any and if the tag should be scoped, or undefined otherwise.
 *
 * @public
 * @param tag
 * @returns {String}
 */
declare const getEffectiveScopingSuffixForTag: (tag: string) => string | undefined;
/**
 * @public
 * Used for getting a scoped name for a CSS variable using the same transformation used in the build
 * @name the name of the css variable as written in the code
 * @returns a variable name with the current version inserted as available at runtime
 */
declare const getScopedVarName: (name: string) => string;
export { setCustomElementsScopingSuffix, getCustomElementsScopingSuffix, setCustomElementsScopingRules, getCustomElementsScopingRules, shouldScopeCustomElement, getEffectiveScopingSuffixForTag, getScopedVarName, };
