/**
 * Different types of FCLLayout.
 * @public
 */
declare enum FCLLayout {
    /**
     * The layout will display 1 column.
     * @public
     */
    OneColumn = "OneColumn",
    /**
     *
     * Desktop: Defaults to 67 - 33 - -- percent widths of columns. Start (expanded) and Mid columns are displayed.
     * Tablet:  Defaults to 67 - 33 - -- percent widths of columns. Start (expanded) and Mid columns are displayed.
     * Phone:   Fixed -- 100 -- percent widths of columns, only the Mid column is displayed
     *
     * Use to display both a list and a detail page when the user should focus on the list page.
     * @public
     */
    TwoColumnsStartExpanded = "TwoColumnsStartExpanded",
    /**
     * Desktop: Defaults to 33 - 67 - -- percent widths of columns. Start and Mid (expanded) columns are displayed
     * Tablet:  Defaults to 33 - 67 - -- percent widths of columns. Start and Mid (expanded) columns are displayed
     * Phone:   Fixed -- 100 -- percent widths of columns, only the Mid column is displayed
     *
     * Use to display both a list and a detail page when the user should focus on the detail page.
     * @public
     */
    TwoColumnsMidExpanded = "TwoColumnsMidExpanded",
    /**
     * Desktop: Defaults to 25 - 50 - 25 percent widths of columns. Start, Mid (expanded) and End columns are displayed
     * Tablet:  Defaults to 0 - 67 - 33 percent widths of columns. Mid (expanded) and End columns are displayed, Start is accessible by dragging the columns-separator
     * Phone:   Fixed -- -- 100 percent widths of columns, only the End column is displayed
     *
     * Use to display all three pages (list, detail, detail-detail) when the user should focus on the detail.
     * @public
     */
    ThreeColumnsMidExpanded = "ThreeColumnsMidExpanded",
    /**
     * Desktop: Defaults to 25 - 25 - 50 percent widths of columns. Start, Mid and End (expanded) columns are displayed
     * Tablet:  Defaults to 0 - 33 - 67 percent widths of columns. Mid and End (expanded) columns are displayed, Start is accessible by dragging the columns-separator
     * Phone:   Fixed -- -- 100 percent widths of columns (only the End column is displayed)
     *
     * Use to display all three pages (list, detail, detail-detail) when the user should focus on the detail-detail.
     * @public
     */
    ThreeColumnsEndExpanded = "ThreeColumnsEndExpanded",
    /**
     * Desktop: Defaults to 67 - 33 - 0 percent widths of columns. Start (expanded) and Mid columns are displayed, End is accessible by dragging the columns-separator
     * Tablet:  Defaults to 67 - 33 - 0 percent widths of columns. Start (expanded) and Mid columns are displayed, End is accessible by dragging the columns-separator
     * Phone:   Fixed -- -- 100 percent widths of columns, only the End column is displayed
     *
     * Use to display the list and detail pages when the user should focus on the list.
     * The detail-detail is still loaded and easily accessible by dragging the columns-separator
     * @public
     */
    ThreeColumnsStartExpandedEndHidden = "ThreeColumnsStartExpandedEndHidden",
    /**
     * Desktop: Defaults to 33 - 67 - 0 percent widths of columns. Start and Mid (expanded) columns are displayed, End is accessible by dragging the columns-separator
     * Tablet:  Defaults to 33 - 67 - 0 percent widths of columns. Start and Mid (expanded) columns are displayed, End is accessible by dragging the columns-separator
     * Phone:   Fixed -- -- 100 percent widths of columns, only the End column is displayed
     *
     * Use to display the list and detail pages when the user should focus on the detail.
     * The detail-detail is still loaded and easily accessible by dragging the columns-separator
     * @public
     */
    ThreeColumnsMidExpandedEndHidden = "ThreeColumnsMidExpandedEndHidden",
    /**
    * Desktop: Defaults to 0 - 67 - 33 percent widths of columns. Start is hidden, Mid (expanded) and End columns are displayed.
    * Tablet:  Defaults to 0 - 67 - 33 percent widths of columns. Start is hidden, Mid (expanded) and End columns are displayed.
    * Phone:   Fixed -- 100 percent width of the Mid column, only the Mid column is displayed.
    *
    * Use to display the Mid and End columns while the Start column is hidden.
    * @public
    */
    ThreeColumnsStartHiddenMidExpanded = "ThreeColumnsStartHiddenMidExpanded",
    /**
     * Desktop: Defaults to 0 - 33 - 67 percent widths of columns. Start is hidden, Mid and End (expanded) columns are displayed.
     * Tablet:  Defaults to 0 - 33 - 67 percent widths of columns. Start is hidden, Mid and End (expanded) columns are displayed.
     * Phone:   Fixed -- 100 percent width of the End column, only the End column is displayed.
     *
     * Use to display the Mid column and expanded End column while the grip of the separator is not visible.
     * @public
     */
    ThreeColumnsStartHiddenEndExpanded = "ThreeColumnsStartHiddenEndExpanded",
    /**
     * Desktop: Fixed -- 100 -- percent widths of columns, only the Mid column is displayed
     * Tablet:  Fixed -- 100 -- percent widths of columns, only the Mid column is displayed
     * Phone:   Fixed -- 100 -- percent widths of columns, only the Mid column is displayed
     *
     * Use to display a detail page only, when the user should focus entirely on it.
     * @public
     */
    MidColumnFullScreen = "MidColumnFullScreen",
    /**
     * Desktop: Fixed -- -- 100 percent widths of columns, only the End column is displayed
     * Tablet:  Fixed -- -- 100 percent widths of columns, only the End column is displayed
     * Phone:   Fixed -- -- 100 percent widths of columns, only the End column is displayed
     *
     * Use to display a detail-detail page only, when the user should focus entirely on it.
     * @public
     */
    EndColumnFullScreen = "EndColumnFullScreen"
}
export default FCLLayout;
