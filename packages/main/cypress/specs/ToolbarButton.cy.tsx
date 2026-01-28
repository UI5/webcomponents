import Toolbar from "../../src/Toolbar.js";
import ToolbarButton from "../../src/ToolbarButton.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";

describe("Toolbar general interaction", () => {
    it("Should render the button with the correct text", () => {
        cy.mount(
            <Toolbar>
                <ToolbarButton 
                    text="Back"
                    design="Emphasized"
                    disabled
                    icon={add}
                    endIcon={employee}
                    tooltip="Add"
                />
            </Toolbar>
        );
    
        cy.get("[ui5-toolbar]")
            .find("[ui5-toolbar-button]")
            .shadow()
            .find("[ui5-button]")
            .should("contain.text", "Back")
            .should("have.attr", "design", "Emphasized")
            .should("have.attr", "disabled", "disabled")
            .should("have.attr", "icon", "add")
            .should("have.attr", "end-icon", "employee")
            .should("have.attr", "tooltip", "Add");
    });
    

    it("Should render the button with the correct accessible name", () => {
        cy.mount(
            <Toolbar>
                <ToolbarButton 
                    accessibleName="Add"
                    accessibleNameRef="btn"
                />
            </Toolbar>
        );
    
        cy.get("[ui5-toolbar]")
            .find("[ui5-toolbar-button][accessible-name]")
            .shadow()
            .find("[ui5-button]")
            .should("have.prop", "accessibleName", "Add")
            .should("have.attr", "accessible-name-ref", "btn");
    });

    it("Should render the button with the correct accessibilityAttributes", () => {
        cy.mount(
            <Toolbar>
                <ToolbarButton 
                    accessibleName="Add"
                    accessibilityAttributes={{ expanded: "true", controls: "btn", hasPopup: "dialog" }}
                />
            </Toolbar>
        );
    
        cy.get("[ui5-toolbar]")
            .find("[ui5-toolbar-button][accessible-name]")
            .shadow()
            .find("[ui5-button]")
            .invoke("prop", "accessibilityAttributes")
            .then((accessibilityAttributes) => {
                expect(accessibilityAttributes).to.have.property("expanded", "true");
            });
    });
});