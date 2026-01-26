
import postcss from "postcss";

const hostVariables = new Map();

const SELECTOR = ":host";

const saveVariable = (variable, value, density) => {
    if (!hostVariables.has(variable)) {
        hostVariables.set(variable, {});
    }
    hostVariables.get(variable)[density] = value;
}

/**
 * PostCSS plugin for handling CSS variables across density modes (cozy and compact).
 *
 * The plugin scans CSS for `:host` rules that define density-specific custom properties.
 * Variables declared in a root-level `:host` rule are treated as **cozy** values, while
 * variables declared inside `@container style(--ui5_content_density: compact)` `:host` rules
 * are treated as **compact** values.
 *
 * All discovered variables are merged into a single root `:host` rule. For variables that
 * exist in both modes, the plugin generates a value that uses CSS variable fallbacks to
 * dynamically switch between compact and cozy values based on the active density.
 *
 * Variables that exist in only one mode are preserved, with appropriate fallbacks added
 * when needed.
 *
 * Example input:
 *
 * ```css
 * :host {
 *   --my-variable: cozy-value;
 *   --cozy-only-variable: cozy-only-value;
 * }
 *
 * @container style(--ui5_content_density: compact) {
 *   :host {
 *     --my-variable: compact-value;
 *     --compact-only-variable: compact-only;
 *   }
 * }
 * ```
 *
 * Output:
 *
 * ```css
 * :host {
 *   --my-variable: var(--_ui5-compact-size, compact-value) var(--_ui5-cozy-size, cozy-value);
 *   --compact-only-variable: var(--_ui5-compact-size, compact-only) var(--_ui5-cozy-size, initial);
 *   --cozy-only-variable: cozy-only-value;
 * }
 * ```
 *
 * This enables seamless runtime switching between density modes using CSS variables alone.
 */

export default function postcssPlugin() {
    return {
        postcssPlugin: 'postcss-content-density-variables',
        Once(root) {
            let hasRootHost = false;
            let hostRule;

            root.walkRules((rule) => {
                // Only process :host rules
                if (rule.selector !== SELECTOR) {
                    return;
                }

                // Handle root-level :host rules (cozy)
                if (rule.parent.type === "root") {
                    if (!hasRootHost) {
                        hasRootHost = true;
                        hostRule = rule;
                    }

                    rule.walkDecls((decl) => {
                        if (decl.prop.startsWith('--')) {
                            saveVariable(decl.prop, decl.value, 'cozy');
                            decl.remove();
                        }
                    });
                }

                // Handle :host rules inside @container (compact)
                if (rule.parent.type === "atrule") {
                    if (rule.parent.params.replaceAll("\s", "") === 'style(--ui5_content_density: compact)'.replaceAll("\s", "")) {
                        rule.walkDecls((decl) => {
                            if (decl.prop.startsWith('--')) {
                                saveVariable(decl.prop, decl.value, 'compact');
                                decl.remove();
                            }
                        });
                    }
                }

                let current = rule;
                // Remove up empty rules
                while (current) {
                    if (current.nodes.length === 0) {
                        const parent = current.parent;
                        current.remove();
                        current = parent;
                    }

                    if (current.type === "root") {
                        break;
                    }
                }
            });

            if (!hasRootHost) {
                hostRule = postcss.rule({ selector: SELECTOR });
            }

            // Construct merged variable declarations depending on available modes
            for (const [variable, variableData] of hostVariables) {
                if (variableData.cozy && variableData.compact) {
                    hostRule.append({
                        prop: variable,
                        value: `var(--_ui5-compact-size, ${variableData.compact})  var(--_ui5-cozy-size, ${variableData.cozy})`,
                    });
                } else if (variableData.compact) {

                    // Use a non-existent variable to always trigger the fallback.
                    // Because this variable is never defined, the fallback is used
                    // in all cases.

                    // Using `initial` as a fallback can work only for properties
                    // that treat it as an invalid value. To avoid this inconsistency,
                    // we intentionally reference an undefined variable, which is
                    // always considered invalid and undefined.
                    hostRule.append({
                        prop: variable,
                        value: `var(--_ui5-compact-size, ${variableData.compact}) var(--_ui5-cozy-size, var(--_ui5-f2d95f8))`,
                    });
                } else {
                    hostRule.append({
                        prop: variable,
                        value: variableData.cozy,
                    });
                }
            }

            root.prepend(hostRule);
            hostVariables.clear();
        }
    }
}

postcssPlugin.postcss = true;
