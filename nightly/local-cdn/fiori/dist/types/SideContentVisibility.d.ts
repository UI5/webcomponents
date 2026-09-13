/**
 * Side Content visibility options.
 * @public
 */
declare enum SideContentVisibility {
    /**
     * Show the side content on any breakpoint
     * @public
     */
    AlwaysShow = "AlwaysShow",
    /**
     * Show the side content on XL breakpoint
     * @public
     */
    ShowAboveL = "ShowAboveL",
    /**
     * Show the side content on L and XL breakpoints
     * @public
     */
    ShowAboveM = "ShowAboveM",
    /**
     * Show the side content on M, L and XL breakpoints
     * @public
     */
    ShowAboveS = "ShowAboveS",
    /**
     * Don't show the side content on any breakpoints
     * @public
     */
    NeverShow = "NeverShow"
}
export default SideContentVisibility;
