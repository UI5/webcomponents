/**
 * Different types of IllustrationMessageDesign.
 * @public
 * @since 2.0.0
 */
var IllustrationMessageDesign;
(function (IllustrationMessageDesign) {
    /**
     * Automatically decides the <code>Illustration</code> size (<code>Base</code>, <code>Dot</code>, <code>Spot</code>,
     * <code>Dialog</code>, or <code>Scene</code>) depending on the <code>IllustratedMessage</code> container width.
     *
     * **Note:** `Auto` is the only option where the illustration size is changed according to
     * the available container width. If any other `IllustratedMessageSize` is chosen, it remains
     * until changed by the app developer.
     * @public
     */
    IllustrationMessageDesign["Auto"] = "Auto";
    /**
     * Base `Illustration` size (XS breakpoint). Suitable for cards (two columns).
     *
     * **Note:** When `Base` is in use, no illustration is displayed.
     * @public
     */
    IllustrationMessageDesign["Base"] = "Base";
    /**
     * Dot <code>Illustration</code> size (XS breakpoint). Suitable for table rows.
     * @public
     * @deprecated Since 2.10.0, use ExtraSmall instead
     */
    IllustrationMessageDesign["Dot"] = "Dot";
    /**
     * Spot <code>Illustration</code> size (S breakpoint). Suitable for cards (four columns).
     * @public
     * @deprecated Since 2.10.0, use Small instead
     */
    IllustrationMessageDesign["Spot"] = "Spot";
    /**
     * Dialog `Illustration` size (M breakpoint). Suitable for dialogs.
     * @public
     * @deprecated Since 2.10.0, use Medium instead
     */
    IllustrationMessageDesign["Dialog"] = "Dialog";
    /**
     * Scene `Illustration` size (L breakpoint). Suitable for a `Page` or a table.
     * @public
     * @deprecated Since 2.10.0, use Large instead
     */
    IllustrationMessageDesign["Scene"] = "Scene";
    /**
     * ExtraSmall <code>Illustration</code> size (XS breakpoint). Suitable for table rows.
     * @public
     */
    IllustrationMessageDesign["ExtraSmall"] = "ExtraSmall";
    /**
     * Small <code>Illustration</code> size (S breakpoint). Suitable for cards (four columns).
     * @public
     */
    IllustrationMessageDesign["Small"] = "Small";
    /**
     * Medium `Illustration` size (M breakpoint). Suitable for dialogs.
     * @public
     */
    IllustrationMessageDesign["Medium"] = "Medium";
    /**
     * Large `Illustration` size (L breakpoint). Suitable for a `Page` or a table.
     * @public
     */
    IllustrationMessageDesign["Large"] = "Large";
})(IllustrationMessageDesign || (IllustrationMessageDesign = {}));
export default IllustrationMessageDesign;
//# sourceMappingURL=IllustrationMessageDesign.js.map