import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IIcon } from "./Icon.js";
import type { IToken } from "./MultiInput.js";
type TokenDeleteEventDetail = {
    backSpace?: boolean;
    delete?: boolean;
};
/**
 * @class
 *
 * ### Overview
 *
 * Tokens are small items of information (similar to tags) that mainly serve to visualize previously selected items.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Token.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.9
 * @implements {IToken}
 * @public
 */
declare class Token extends UI5Element implements IToken {
    eventDetails: {
        "select": void;
        "delete": TokenDeleteEventDetail;
    };
    /**
     * Defines the text of the token.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines whether the component is selected or not.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines whether the component is read-only.
     *
     * **Note:** A read-only component can not be deleted or selected,
     * but still provides visual feedback upon user interaction.
     * @default false
     * @private
     */
    readonly: boolean;
    /**
     * Set by the tokenizer when a token is in the "more" area (overflowing)
     * @default false
     * @private
     */
    overflows: boolean;
    singleToken: boolean;
    /**
     * Defines whether the component is focused or not.
     * @default false
     * @private
     */
    focused: boolean;
    /**
     * Defines whether the token is being deleted
     * This flag is used in the ui5-multi-combobox
     * @default false
     * @private
     */
    toBeDeleted: boolean;
    /**
     * Defines the tabIndex of the component.
     * @private
     */
    forcedTabIndex: string;
    /**
     * Defines the close icon for the token. If nothing is provided to this slot, the default close icon will be used.
     * Accepts `ui5-icon`.
     * @public
     * @since 1.0.0-rc.9
     */
    closeIcon: Slot<IIcon>;
    static i18nBundle: I18nBundle;
    _handleSelect(): void;
    _focusin(): void;
    _focusout(): void;
    _delete(): void;
    _onmousedown(e: MouseEvent): void;
    _keydown(e: KeyboardEvent): void;
    get tokenDeletableText(): string;
    get textDom(): Element | null | undefined;
    get isTruncatable(): boolean;
    get ariaDescription(): string;
}
export default Token;
export type { TokenDeleteEventDetail };
