/**
 * Determines where the badge will be placed and how it will be styled.
 * @since 2.7.0
 * @public
 */
declare enum ButtonBadgeDesign {
    /**
     * The badge is displayed after the text, inside the button.
     * @public
     */
    InlineText = "InlineText",
    /**
     * The badge is displayed at the top-end corner of the button.
     *
     * **Note:** According to design guidance, the OverlayText design mode is best used in cozy density to avoid potential visual issues in compact.
     * @public
     */
    OverlayText = "OverlayText",
    /**
     * The badge is displayed as an attention dot.
     * @public
     */
    AttentionDot = "AttentionDot"
}
export default ButtonBadgeDesign;
