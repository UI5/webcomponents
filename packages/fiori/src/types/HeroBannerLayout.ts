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
	 * Two equal columns layout. Both content blocks share the available width equally.
	 * The free content blocks are split side by side.
	 * @public
	 */
	TwoColumns = "TwoColumns",

	/**
	 * Two unequal columns layout. The start content block takes twice the width of the end block.
	 * The first free block takes two-thirds of the width, the second takes one-third.
	 * @public
	 */
	TwoColumnsStartExpanded = "TwoColumnsStartExpanded",
}

export default HeroBannerLayout;
