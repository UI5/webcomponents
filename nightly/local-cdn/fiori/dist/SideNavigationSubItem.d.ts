import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import "@ui5/webcomponents/dist/Tag.js";
/**
 * @class
 *
 * ### Overview
 * Represents a single navigation action within `ui5-side-navigation-item`.
 * The `ui5-side-navigation-sub-item` is intended to be used inside a `ui5-side-navigation-item` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";`
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @public
 * @abstract
 * @since 1.0.0-rc.8
 */
declare class SideNavigationSubItem extends SideNavigationSelectableItemBase {
    /**
     * Defines the tag to be displayed.
     *
     * **Note:** Tags are visible when the <code>NavigationList</code> is in expanded mode,
     * and hidden when collapsed, but they are visible in the overflow of the collapsed mode.
     *
     * **Note:** Only one `ui5-tag` is allowed. The tag should use `design="Set2"`, `hide-state-icon`,
     * and `colorScheme` values 5-10 to avoid confusion with semantic colors (1-4).
     *
     * **Note:** It is recommended to limit tag width to 64px (4rem). If tag text exceeds this,
     * use shortened forms or abbreviations (e.g., "Experimental" → "Exp").
     *
     * **Important:** The <code>ui5-tag</code> must never be interactive (i.e., <code>active</code> must not be set to <code>true</code>),
     * as this would lead to nesting of interactive elements, which is not allowed.
     *
     * @public
     * @since 2.23.0
     */
    tag: Slot<HTMLElement>;
    get hasTag(): boolean;
    get _textId(): string;
    get _describedBy(): string | undefined;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onfocusin(e: FocusEvent): void;
    _onclick(e: MouseEvent): void;
    get classesArray(): string[];
}
export default SideNavigationSubItem;
