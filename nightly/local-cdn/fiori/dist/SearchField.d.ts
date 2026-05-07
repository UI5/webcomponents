import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
/**
 * Interface for components that may be slotted inside a `ui5-search`
 * @public
 */
interface ISearchScope extends UI5Element {
    text?: string;
    value?: string;
    stableDomRef: string;
}
type SearchFieldScopeSelectionChangeDetails = {
    scope: ISearchScope | undefined;
};
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search-field` is an input field, used for user search.
 *
 * The `ui5-search-field` consists of several elements parts:
 * - Scope - displays a select in the beggining of the component, used for filtering results by their scope.
 * - Input field - for user input value
 * - Clear button - gives the possibility for deleting the entered value
 * - Search button - a primary button for performing search, when the user has entered a search term
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SearchField.js";`
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
declare class SearchField extends UI5Element {
    eventDetails: {
        search: object;
        input: void;
        "scope-change": SearchFieldScopeSelectionChangeDetails;
    };
    /**
     * Indicates whether a loading indicator should be shown in the input field.
     * @default false
     * @since 2.19.0
     * @public
     */
    fieldLoading: boolean;
    /**
     * Defines whether the clear icon of the search will be shown.
     * @default false
     * @public
     */
    showClearIcon: boolean;
    /**
     * Defines whether the component is collapsed.
     *
     * @default false
     * @private
     */
    collapsed: boolean;
    /**
     * Defines the value of the component.
     *
     * **Note:** The property is updated upon typing.
     * @default ""
     * @public
     */
    value: string;
    /**
     * Defines a short hint intended to aid the user with data entry when the
     * component has no value.
     * @default undefined
     * @public
     */
    placeholder?: string;
    /**
     * Defines the accessible ARIA name of the component.
     * @public
     * @default undefined
     */
    accessibleName?: string;
    /**
     * Defines the accessible ARIA description of the field.
     * @public
     * @default undefined
     */
    accessibleDescription?: string;
    /**
     * Defines the value of the component:
     *
     * Applications are responsible for setting the correct scope value.
     *
     * **Note:** If the given value does not match any existing scopes,
     * no scope will be selected and the SearchField scope component will be displayed as empty.
     * @public
     * @default ""
     * @since 2.18.0
     */
    scopeValue?: string;
    /**
     * Defines the component scope options.
     * @public
     */
    scopes: Slot<ISearchScope>;
    /**
     * Defines the filter button slot, used to display an additional filtering button.
     * This slot is intended for passing a `ui5-button` with a filter icon to provide extended filtering options.
     *
     * **Note:** Scope button and Filter button are mutually exclusive.
     * @public
     * @since 2.11.0
     */
    filterButton: Slot<Button>;
    /**
     * @private
     */
    focusedInnerInput: boolean;
    /**
     * @private
     */
    _effectiveShowClearIcon: boolean;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onfocusin(): void;
    _onfocusout(): void;
    _onFocusOutSearch(e: FocusEvent): void;
    _handleEnter(): void;
    _handleInnerClick(): void;
    _handleSearchIconPress(): void;
    _handleSearchEvent(): void;
    _handleInput(e: InputEvent): void;
    _handleClear(): void;
    _handleScopeChange(e: CustomEvent<SelectChangeEventDetail>): void;
    get _isSearchIcon(): boolean | 0;
    get _searchButtonAccessibilityAttributes(): {
        expanded: boolean;
    };
    get _translations(): {
        scope: string;
        searchIcon: string;
        clearIcon: string;
        searchFieldAriaLabel: string;
    };
    get _effectiveIconTooltip(): string;
    captureRef(ref: HTMLElement & {
        scopeOption?: UI5Element;
    } | null): void;
}
export default SearchField;
export type { ISearchScope, SearchFieldScopeSelectionChangeDetails };
