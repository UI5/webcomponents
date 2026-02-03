/**
 * Different Avatar modes.
 * @public
 */
enum AvatarMode {
	/**
	 * Image mode (by default).
	 * Configures the component to internally render role="img".
	 * @public
	 * @since 2.19
	 */
	Image = "Image",

	/**
	 * Decorative mode.
	 * Configures the component to internally render role="presentation" and aria-hidden="true",
	 * making it purely decorative without semantic content or interactivity.
	 * @public
	 * @since 2.19
	 */
	Decorative = "Decorative",

	/**
	 * Interactive mode.
	 * Configures the component to internally render role="button".
	 * This mode also supports focus and enables keyboard interaction.
	 * @public
	 * @since 2.19
	 */
	Interactive = "Interactive",
}

export default AvatarMode;
