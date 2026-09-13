import type SearchField from "./SearchField.js";
export type SearchFieldTemplateOptions = {
    /**
     * If set to true, the search field will be expanded.
     */
    forceExpanded?: boolean;
};
export default function SearchFieldTemplate(this: SearchField, options?: SearchFieldTemplateOptions): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
