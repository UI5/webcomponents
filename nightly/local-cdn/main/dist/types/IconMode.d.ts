/**
 * Different Icon modes.
 * @public
 * @since 2.0.0
 */
declare enum IconMode {
    /**
     * Image mode (by default).
     * Configures the component to internally render role="img".
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
    /**
     * Interactive mode.
     * Configures the component to internally render role="button".
     * This mode also supports focus and press handling to enhance interactivity.
     * @public
    */
    Interactive = "Interactive"
}
export default IconMode;
