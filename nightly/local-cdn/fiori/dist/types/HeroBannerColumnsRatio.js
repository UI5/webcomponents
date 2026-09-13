/**
 * Available HeroBanner columns ratio options.
 *
 * Defines how the two content blocks are sized relative to each other within the hero banner.
 * When no value is set, the content renders in a single column.
 * @public
 * @since 2.23.0
 */
var HeroBannerColumnsRatio;
(function (HeroBannerColumnsRatio) {
    /**
     * Two equal columns. Both content blocks share the available width equally.
     * @public
     */
    HeroBannerColumnsRatio["Equal"] = "Equal";
    /**
     * Two unequal columns. The first content block takes two-thirds of the width, the second takes one-third.
     * @public
     */
    HeroBannerColumnsRatio["FirstWider"] = "FirstWider";
})(HeroBannerColumnsRatio || (HeroBannerColumnsRatio = {}));
export default HeroBannerColumnsRatio;
//# sourceMappingURL=HeroBannerColumnsRatio.js.map