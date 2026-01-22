/**
 * Empty PostCSS plugin
 */
export default function postcssPlugin(opts = {}) {
    return {
        postcssPlugin: 'postcss-plugin',
        Once(root) {
            const hostVariables = new Map();

            const saveVariable = (variable, value, density) => {
                if (!hostVariables.has(variable)) {
                    hostVariables.set(variable, {});
                }
                hostVariables.get(variable)[density] = value;
            }

            // Collect compact variables and remove at ruels in order to avoid duplication.
            // When walkRules is used it visits also the rules inside @container rules, causing duplication.
            // Process @container rules first and remove them afterwards.
            root.walkAtRules('container', (atRule) => {
                if (atRule.params.replaceAll("\s", "") === 'style(--_ui5-compact-size: initial)'.replaceAll("\s", "")) {
                    // Collect variables from :host selectors inside this @container
                    atRule.walkRules((rule) => {
                        if (rule.selector === ':host') {
                            rule.walkDecls((decl) => {
                                if (decl.prop.startsWith('--')) {
                                    saveVariable(decl.prop, decl.value, 'compact');
                                }
                            });
                        }
                    });

                    atRule.remove();
                }
            });

            root.walkRules((rule) => {
                if (rule.selector === ':host') {
                    rule.walkDecls((decl) => {
                        if (decl.prop.startsWith('--')) {
                            saveVariable(decl.prop, decl.value, 'cozy');
                        }
                    });
                }
            });

            root.walkRules((rule) => {
                if (rule.selector === ':host') {
                    rule.walkDecls((decl) => {
                        if (decl.prop.startsWith('--') && hostVariables.has(decl.prop)) {
                            const variableData = hostVariables.get(decl.prop);
                            if (variableData.compact && variableData.cozy) {
                                decl.value = `var(--_ui5-compact-size, ${variableData.compact}) var(--_ui5-cozy-size, ${variableData.cozy})`;
                                hostVariables.delete(decl.prop);
                            }
                        }
                    });
                }
            });

            if (hostVariables.size > 0) {
                root.walkRules((rule) => {
                    if (rule.selector === ':host') {
                        for (const [variable, variableData] of hostVariables) {
                            rule.append({
                                prop: variable,
                                value: `var(--_ui5-compact-size, ${variableData.compact})  var(--_ui5-cozy-size, initial)`
                            });
                        }
                        hostVariables.clear();
                        return false; // Stop walking after first :host
                    }
                });
            }
        }
    }
}

postcssPlugin.postcss = true;
