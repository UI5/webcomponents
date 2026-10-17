/**
 * Panel accessible roles.
 * @public
 */
declare enum PanelAccessibleRole {
    /**
     * Represents the ARIA role "complementary".
     * A section of the page, designed to be complementary to the main content at a similar level in the DOM hierarchy.
     * @public
     */
    Complementary = "Complementary",
    /**
     * Represents the ARIA role "Form".
     * A landmark region that contains a collection of items and objects that, as a whole, create a form.
     * @public
     */
    Form = "Form",
    /**
     * Represents the ARIA role "Region".
     * A section of a page, that is important enough to be included in a page summary or table of contents.
     * @public
     */
    Region = "Region"
}
export default PanelAccessibleRole;
