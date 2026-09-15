/**
 * Defines the area size around the component that the user can select.
 *
 * @public
 * @since 2.8.0
 */
declare enum InteractiveAreaSize {
    /**
     * The default target area size (the area taken by the component itself without any extra invisible touch area).
     * @public
     */
    Normal = "Normal",
    /**
     * Enlarged target area size (up to 24px in height) provides users with an enhanced dedicated space to interact with the component.
     * @public
     */
    Large = "Large"
}
export default InteractiveAreaSize;
