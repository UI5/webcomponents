/**
 * Different Carousel page indicator types.
 * @public
 */
declare enum CarouselPageIndicatorType {
    /**
     * The page indicator will be visualized as dots if there are fewer than 9 pages.
     * If there are more pages, the page indicator will switch to displaying the current page and the total number of pages. (e.g. X of Y)
     * @public
     */
    Default = "Default",
    /**
     * The page indicator will display the current page and the total number of pages. (e.g. X of Y)
     * @public
     */
    Numeric = "Numeric"
}
export default CarouselPageIndicatorType;
