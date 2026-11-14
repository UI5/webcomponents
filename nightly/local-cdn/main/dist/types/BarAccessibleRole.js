/**
 * Bar accessible roles.
 * @public
 * @since 2.9.0
 */
var BarAccessibleRole;
(function (BarAccessibleRole) {
    /**
     * Represents the ARIA role "toolbar".
     * @public
     * @deprecated The Bar does not implement toolbar keyboard navigation (arrow keys) and should not expose the "toolbar" role. Use "None" instead.
     */
    BarAccessibleRole["Toolbar"] = "Toolbar";
    /**
     * Represents the ARIA role "none".
     * @public
     */
    BarAccessibleRole["None"] = "None";
})(BarAccessibleRole || (BarAccessibleRole = {}));
export default BarAccessibleRole;
//# sourceMappingURL=BarAccessibleRole.js.map