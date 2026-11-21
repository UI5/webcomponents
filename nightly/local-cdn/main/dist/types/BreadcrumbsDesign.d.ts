/**
 * Different  Breadcrumbs designs.
 * @public
 */
declare enum BreadcrumbsDesign {
    /**
     * Shows the current page as the last item in the trail.
     * The last item contains only plain text and is not a link.
     * @public
     */
    Standard = "Standard",
    /**
     * All items are displayed as links.
     * @public
     */
    NoCurrentPage = "NoCurrentPage"
}
export default BreadcrumbsDesign;
