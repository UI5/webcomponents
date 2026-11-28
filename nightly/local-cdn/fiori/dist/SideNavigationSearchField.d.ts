import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { InputAccInfo } from "@ui5/webcomponents/dist/Input.js";
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-side-navigation-search-field` is a search field,
 * used to filter the items of a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSearchField.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.28.0
 * @public
 */
declare class SideNavigationSearchField extends UI5Element {
    eventDetails: {
        search: object;
        input: void;
    };
    /**
     * Defines whether the clear icon of the search will be hidden.
     *
     * **Note:** When not set, the clear icon is displayed while the component has a value.
     * @default false
     * @public
     */
    hideClearIcon: boolean;
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
     * Receives id (or many ids) of the elements that label the component.
     * @public
     * @default undefined
     */
    accessibleNameRef?: string;
    /**
     * Receives id (or many ids) of the elements that describe the component.
     * @public
     * @default undefined
     */
    accessibleDescriptionRef?: string;
    /**
     * Constantly updated value of the texts collected from the accessibleNameRef elements.
     * @private
     */
    _accessibleLabelsRefTexts?: string;
    /**
     * Constantly updated value of the texts collected from the accessibleDescriptionRef elements.
     * @private
     */
    _associatedDescriptionRefTexts?: string;
    static i18nBundle: I18nBundle;
    onEnterDOM(): void;
    onExitDOM(): void;
    _updateAssociatedTexts(): void;
    _onkeydown(e: KeyboardEvent): void;
    _handleEnter(): void;
    _handleSearchIconPress(): void;
    _handleSearchEvent(): void;
    _handleInput(e: CustomEvent): void;
    _handleClear(): void;
    get _translations(): {
        searchIcon: string;
        searchFieldAriaLabel: string;
        searchFieldAriaDescription: string;
    };
    get _inputAccInfo(): InputAccInfo;
    get _effectivePlaceholder(): string | undefined;
    get _ariaLabelText(): string | undefined;
    get _ariaDescriptionText(): string | undefined;
}
export default SideNavigationSearchField;
