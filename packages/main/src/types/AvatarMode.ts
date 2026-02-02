/**
 * Different Avatar modes.
 * @public
 */
enum AvatarMode {
	/**
	 * Image mode (by default).
	 * Configures the component to internally render role="img" or role="button" (when interactive).
	 * @public
	 */
	Image = "Image",

	/**
	 * Decorative mode.
	 * Configures the component to internally render role="presentation" and aria-hidden="true",
	 * making it purely decorative without semantic content or interactivity.
	 * @public
	 */
	Decorative = "Decorative",
}

export default AvatarMode;
