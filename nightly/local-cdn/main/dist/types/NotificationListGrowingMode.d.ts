/**
 * Different notification list growing modes.
 * @public
 */
declare enum NotificationListGrowingMode {
    /**
     * Component's "load-more" is fired upon pressing a "More" button.
     * at the bottom.
     * @public
     */
    Button = "Button",
    /**
     * Component's growing is not enabled.
     * @public
     */
    None = "None"
}
export default NotificationListGrowingMode;
