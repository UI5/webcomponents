/**
 * Available Banner layout options.
 *
 * Defines how the free content blocks are arranged within the banner.
 * @public
 * @since 2.12.0
 */
enum BannerLayout {
	/**
	 * Full width bottom-half free slot layout.
	 * The free content blocks span the entire width below the salutation.
	 * @public
	 */
	FullWidth = "FullWidth",

	/**
	 * 50/50 split layout.
	 * The free content blocks are split equally side by side.
	 * @public
	 */
	HalfWidth = "HalfWidth",

	/**
	 * 2/3 wide bottom-half layout.
	 * The first free block takes 2/3 width, the second takes 1/3.
	 * @public
	 */
	TwoThirds = "TwoThirds",
}

export default BannerLayout;
