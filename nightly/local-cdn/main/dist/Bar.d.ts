import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type BarDesign from "./types/BarDesign.js";
import type BarAccessibleRole from "./types/BarAccessibleRole.js";
import type { AriaRole } from "@ui5/webcomponents-base/dist/types.js";
/**
 * @class
 *
 * ### Overview
 * The Bar is a container which is primarily used to hold titles, buttons and input elements
 * and its design and functionality is the basis for page headers and footers.
 * The component consists of three areas to hold its content - startContent slot, default slot and endContent slot.
 * It has the capability to center content, such as a title, while having other components on the left and right side.
 *
 * ### Usage
 * With the use of the design property, you can set the style of the Bar to appear designed like a Header, Subheader, Footer and FloatingFooter.
 *
 * **Note:** Do not place a Bar inside another Bar or inside any bar-like component. Doing so may cause unpredictable behavior.
 *
 * **Note:** The Bar is a structural layout component for organizing page areas (header, footer, subheader) and not an action-oriented toolbar. To group action controls with full keyboard navigation support, use the Toolbar component instead.
 *
 * ### Responsive Behavior
 * The default slot will be centered in the available space between the startContent and the endContent areas,
 * therefore it might not always be centered in the entire bar.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Bar.js";`
 * @csspart bar - Used to style the wrapper of the content of the component
 * @csspart startContent - Used to style the wrapper of the start content of the component
 * @csspart midContent - Used to style the wrapper of the middle content of the component
 * @csspart endContent - Used to style the wrapper of the end content of the component
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0
 */
declare class Bar extends UI5Element {
    /**
     * Defines the component's design.
     * @default "Header"
     * @public
     */
    design: `${BarDesign}`;
    /**
     * Specifies the ARIA role applied to the component for accessibility purposes.
     *
     * **Note:** By default, no ARIA role is applied ("None"). The Bar derives its semantics
     * from the container it is placed in, such as a page header or footer.
     *
     * **Note:** The "Toolbar" value is deprecated. The Bar is a structural layout container and does not
     * support toolbar keyboard interactions (such as arrow-key navigation between components). When 3 or more
     * interactive elements are needed, use the `ui5-toolbar` component instead, which provides the correct
     * toolbar role and arrow-key navigation between components.
     *
     * @public
     * @default "None"
     * @since 2.10.0
     *
     */
    accessibleRole: `${BarAccessibleRole}`;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @since 2.16.0
     * @public
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the bar.
     * @default undefined
     * @since 2.16.0
     * @public
     */
    accessibleNameRef?: string;
    /**
    * Defines the content at the start of the bar.
    * @public
    */
    startContent: Slot<HTMLElement>;
    /**
    * Defines the content in the middle of the bar.
    * @public
    */
    middleContent: DefaultSlot<HTMLElement>;
    /**
    * Defines the content at the end of the bar.
    * @public
    */
    endContent: Slot<HTMLElement>;
    _handleResizeBound: () => void;
    get accInfo(): {
        label: string | undefined;
        role: import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").JSXInternal.AriaRole | undefined;
    };
    get ariaLabelText(): string | undefined;
    constructor();
    handleResize(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    get effectiveRole(): AriaRole | undefined;
}
export default Bar;
