import Breadcrumbs from "../../src/Breadcrumbs.js";
import BreadcrumbsItem from "../../src/BreadcrumbsItem.js";

describe("Breadcrumbs mobile behavior", () => {
    before(() => {
        cy.ui5SimulateDevice("phone");
    });

    it("displays all items in the popover on mobile", () => {
        const breadcrumbItems = [
            "Products",
            "Categories",
            "Laptops",
            "Gaming Laptops",
            "XPS Pro"
        ];

        cy.mount(
            <Breadcrumbs>
                {breadcrumbItems.map((item, index) => (
                    <BreadcrumbsItem key={index} href={`#${item}`}>{item}</BreadcrumbsItem>
                ))}
            </Breadcrumbs>
        );

        // Open the overflow popover by clicking on the dropdown arrow within shadow DOM
        cy.get("ui5-breadcrumbs")
            .shadow()
            .find(".ui5-breadcrumbs-dropdown-arrow-link-wrapper ui5-link")
            .click();

        // Wait for the popover to be fully open
        cy.get("ui5-breadcrumbs")
            .shadow()
            .find("ui5-responsive-popover")
            .shadow()
            .find("ui5-dialog")
            .should("be.visible");

        // Verify that all items are displayed in the popover
        cy.get("ui5-breadcrumbs")
            .shadow()
            .find("ui5-responsive-popover ui5-list ui5-li")
            .should("have.length", breadcrumbItems.length);

        // Verify the items are in the correct order (reversed)
        cy.get("ui5-breadcrumbs")
            .shadow()
            .find("ui5-responsive-popover ui5-list ui5-li")
            .eq(0)
            .should("contain.text", breadcrumbItems[breadcrumbItems.length - 1]);
    });
});