/**
 * Panel accessible roles.
 * @public
 */
enum PanelAccessibleRole {

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
	Region = "Region",

	/**
	 * No ARIA role is rendered on the root element.
	 * Use this when the Panel is purely presentational and exposing it as a landmark would add noise for screen reader users.
	 * @public
	 * @since 2.30.0
	 */
	None = "None",
}

export default PanelAccessibleRole;
