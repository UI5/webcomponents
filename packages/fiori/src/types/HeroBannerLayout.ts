/**
 * Available HeroBanner layout options.
 *
 * Defines how the free content blocks are arranged within the hero banner.
 * @public
 * @since 2.23.0
 */
enum HeroBannerLayout {
	/**
	 * Single column layout.
	 * The free content blocks span the entire width below the salutation.
	 * @public
	 */
	OneColumn = "OneColumn",

	/**
	 * Two equal columns layout (1fr 1fr).
	 * The free content blocks are split equally side by side.
	 * @public
	 */
	OneOneColumns = "OneOneColumns",

	/**
	 * Two unequal columns layout (2fr 1fr).
	 * The first free block takes 2/3 width, the second takes 1/3.
	 * @public
	 */
	TwoOneColumns = "TwoOneColumns",
}

export default HeroBannerLayout;
