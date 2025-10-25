import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import ExpandableText from "../ExpandableText.js";
/**
 * Provides a template for rendering text with the ExpandableText component
 * when wrappingType is set to "Normal".
 *
 * @param {object} injectedProps - The configuration options for the expandable text
 * @returns {JSX.Element} The rendered ExpandableText component
 */
export default function ListItemStandardExpandableTextTemplate(injectedProps) {
    const { className, text, maxCharacters, part } = injectedProps;
    return (_jsx(ExpandableText, { part: part, class: className, text: text, maxCharacters: maxCharacters }));
}
//# sourceMappingURL=ListItemStandardExpandableTextTemplate.js.map