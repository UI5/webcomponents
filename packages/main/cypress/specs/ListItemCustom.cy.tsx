import ListItemCustom from "../../src/ListItemCustom.js";
import List from "../../src/List.js";
import Button from "../../src/Button.js";
import CheckBox from "../../src/CheckBox.js";

describe("ListItemCustom - _onfocusin and _onfocusout Tests", () => {
    describe("With pure HTML elements", () => {
        it("should update invisible text content on focusin and clear on focusout", () => {
            // Mount ListItemCustom with pure HTML elements
            cy.mount(
                <List>
                    <ListItemCustom id="li-custom-html">
                        <div>Test Content</div>
                        <span>Additional Text</span>
                    </ListItemCustom>
                </List>
            );

            // Focus the list item
            cy.get("#li-custom-html").click();

            // After focus, global invisible text content should be populated
            // Has description (from text content) but no tabbable controls, so no control state announcement
            cy.get("#ui5-invisible-text")
                .should("exist")
                .should("have.text", "List Item Test Content Additional Text");
            
            // Check that ariaLabelledByElements on the internal li element includes the global invisible text
            cy.get("#li-custom-html")
                .shadow()
                .find("li[part='native-li']")
                .then($li => {
                    const ariaLabelledByElements = ($li[0] as any).ariaLabelledByElements;
                    expect(ariaLabelledByElements).to.exist;
                    const hasInvisibleText = ariaLabelledByElements.some((el: HTMLElement) => el.id === "ui5-invisible-text");
                    expect(hasInvisibleText).to.be.true;
                });

            // Remove focus
            cy.focused().blur();

            // After blur, global invisible text content should be cleared
            cy.get("#ui5-invisible-text")
                .should("have.text", "");
        });

        it("should process text content from HTML elements for accessibility", () => {
            // Mount ListItemCustom with specific text content we can test for
            cy.mount(
                <List>
                    <ListItemCustom id="li-custom-html-content">
                        <div>Primary Content</div>
                        <span>Secondary Information</span>
                        <p>Paragraph text</p>
                    </ListItemCustom>
                </List>
            );

            // Focus the list item
            cy.get("#li-custom-html-content").click();

            // Verify text content is processed and included in the invisible text
            // Has description but no tabbable controls, so no control state announcement
            cy.get("#ui5-invisible-text")
                .should("exist")
                .should("have.text", "List Item Primary Content Secondary Information Paragraph text");
            
            // Check that ariaLabelledByElements on the internal li element includes the global invisible text
            cy.get("#li-custom-html-content")
                .shadow()
                .find("li[part='native-li']")
                .then($li => {
                    const ariaLabelledByElements = ($li[0] as any).ariaLabelledByElements;
                    expect(ariaLabelledByElements).to.exist;
                    const hasInvisibleText = ariaLabelledByElements.some((el: HTMLElement) => el.id === "ui5-invisible-text");
                    expect(hasInvisibleText).to.be.true;
                });
        });
    });

    describe("With UI5 components", () => {
        it("should update invisible text content on focusin and clear on focusout with UI5 components", () => {
            // Mount ListItemCustom with UI5 components
            cy.mount(
                <List>
                    <ListItemCustom id="li-custom-ui5">
                        <Button id="test-button">Click me</Button>
                        <CheckBox id="test-checkbox" text="Check option" required/>
                    </ListItemCustom>
                </List>
            );

            // Focus the list item
            cy.get("#li-custom-ui5").click();

            // After focus, global invisible text content should be populated
            // 2 tabbable controls (Button, CheckBox), so we expect ". Includes elements"
            cy.get("#ui5-invisible-text")
                .should("exist")
                .should("have.text", "List Item Button Click me Checkbox Check option Not checked Required . Includes elements");
            
            // Check that ariaLabelledByElements on the internal li element includes the global invisible text
            cy.get("#li-custom-ui5")
                .shadow()
                .find("li[part='native-li']")
                .then($li => {
                    const ariaLabelledByElements = ($li[0] as any).ariaLabelledByElements;
                    expect(ariaLabelledByElements).to.exist;
                    const hasInvisibleText = ariaLabelledByElements.some((el: HTMLElement) => el.id === "ui5-invisible-text");
                    expect(hasInvisibleText).to.be.true;
                });

            // Remove focus
            cy.focused().blur();

            // After blur, global invisible text content should be cleared
            cy.get("#ui5-invisible-text")
                .should("have.text", "");
        });

        it("should handle focus changes between list item and UI5 components", () => {
            // Mount ListItemCustom with UI5 components
            cy.mount(
                <List>
                    <ListItemCustom id="li-custom-ui5-focus">
                        <Button id="test-focus-button">Click Me</Button>
                        <CheckBox id="test-focus-checkbox" text="Check Option" />
                    </ListItemCustom>
                </List>
            );

            // Click the list item first to get focus
            cy.get("#li-custom-ui5-focus").click();
            
            // Verify invisible text is populated
            // 2 tabbable controls, so we expect ". Includes elements"
            cy.get("#ui5-invisible-text")
                .should("exist")
                .should("have.text", "List Item Button Click Me Checkbox Check Option Not checked . Includes elements");
            
            // Check that ariaLabelledByElements on the internal li element includes the global invisible text
            cy.get("#li-custom-ui5-focus")
                .shadow()
                .find("li[part='native-li']")
                .then($li => {
                    const ariaLabelledByElements = ($li[0] as any).ariaLabelledByElements;
                    expect(ariaLabelledByElements).to.exist;
                    const hasInvisibleText = ariaLabelledByElements.some((el: HTMLElement) => el.id === "ui5-invisible-text");
                    expect(hasInvisibleText).to.be.true;
                });

            // Now click the button - this shouldn't trigger focusout on the list item
            // as it's a child element
            cy.get("#test-focus-button").click();
            
            // Verify invisible text is still populated (list item should maintain focus state)
            cy.get("#ui5-invisible-text")
                .should("have.text", "List Item Button Click Me Checkbox Check Option Not checked . Includes elements");

            // Click outside the list to truly remove focus
            cy.get("body").click({ force: true });
            
            // Now invisible text should be cleared
            cy.get("#ui5-invisible-text")
                .should("have.text", "");
        });
    });

    describe("With mixed elements and nesting", () => {
        it("should process nested elements for accessibility", () => {
            // Mount ListItemCustom with nested elements
            cy.mount(
                <List>
                    <ListItemCustom id="li-custom-nested">
                        <div className="container">
                            <span>Container Text</span>
                            <div className="nested-container">
                                <Button id="nested-button">Nested Button</Button>
                            </div>
                        </div>
                        <p>Paragraph outside container</p>
                    </ListItemCustom>
                </List>
            );

            // Focus the list item
            cy.get("#li-custom-nested").click();

            // Verify text content is processed and included in the invisible text
            // 1 tabbable control (Button), so we expect ". Includes element"
            cy.get("#ui5-invisible-text")
                .should("exist")
                .should("have.text", "List Item Container Text Button Nested Button Paragraph outside container . Includes element");
            
            // Check that ariaLabelledByElements on the internal li element includes the global invisible text
            cy.get("#li-custom-nested")
                .shadow()
                .find("li[part='native-li']")
                .then($li => {
                    const ariaLabelledByElements = ($li[0] as any).ariaLabelledByElements;
                    expect(ariaLabelledByElements).to.exist;
                    const hasInvisibleText = ariaLabelledByElements.some((el: HTMLElement) => el.id === "ui5-invisible-text");
                    expect(hasInvisibleText).to.be.true;
                });
        });

        it("should handle deep nesting of elements", () => {
            // Mount ListItemCustom with deeply nested elements
            cy.mount(
                <List>
                    <ListItemCustom id="li-custom-deep-nested">
                        <div className="level1">
                            <div className="level2">
                                <div className="level3">
                                    <Button id="deep-nested-button">Deeply Nested Button</Button>
                                </div>
                                <span className="level2-span">Level 2 Text</span>
                            </div>
                            <CheckBox id="nested-checkbox" text="Nested" />
                        </div>
                    </ListItemCustom>
                </List>
            );

            // Focus the list item
            cy.get("#li-custom-deep-nested").click();

            // Verify all nested content is processed
            // 2 tabbable controls (Button, CheckBox), so we expect ". Includes elements"
            cy.get("#ui5-invisible-text")
                .should("exist")
                .should("have.text", "List Item Button Deeply Nested Button Level 2 Text Checkbox Nested Not checked . Includes elements");
            
            // Check that ariaLabelledByElements on the internal li element includes the global invisible text
            cy.get("#li-custom-deep-nested")
                .shadow()
                .find("li[part='native-li']")
                .then($li => {
                    const ariaLabelledByElements = ($li[0] as any).ariaLabelledByElements;
                    expect(ariaLabelledByElements).to.exist;
                    const hasInvisibleText = ariaLabelledByElements.some((el: HTMLElement) => el.id === "ui5-invisible-text");
                    expect(hasInvisibleText).to.be.true;
                });

            // Remove focus
            cy.focused().blur();

            // After blur, invisible text content should be cleared
            cy.get("#ui5-invisible-text")
                .should("have.text", "");
        });
    });
    
    describe("With delete mode and custom delete button", () => {
        it("should handle ListItemCustom with delete mode and custom delete button", () => {
            // Mount ListItemCustom with delete mode and custom delete button
            cy.mount(
                <List selectionMode="Delete">
                    <ListItemCustom id="li-custom-delete">
                        <div>Delete Mode Item</div>
                        <Button slot="deleteButton" id="custom-delete-button">
                            Remove
                        </Button>
                    </ListItemCustom>
                </List>
            );

            // Focus the list item
            cy.get("#li-custom-delete").click();

            // Verify text content is processed and included in the invisible text
            // The delete button is tabbable, so we expect ". Includes element"
            cy.get("#ui5-invisible-text")
                .should("exist")
                .should("have.text", "List Item Delete Mode Item Button Remove . Includes element");
            
            // Check that ariaLabelledByElements on the internal li element includes the global invisible text
            cy.get("#li-custom-delete")
                .shadow()
                .find("li[part='native-li']")
                .then($li => {
                    const ariaLabelledByElements = ($li[0] as any).ariaLabelledByElements;
                    expect(ariaLabelledByElements).to.exist;
                    const hasInvisibleText = ariaLabelledByElements.some((el: HTMLElement) => el.id === "ui5-invisible-text");
                    expect(hasInvisibleText).to.be.true;
                });

            // Remove focus
            cy.focused().blur();

            // After blur, invisible text content should be cleared
            cy.get("#ui5-invisible-text")
                .should("have.text", "");
        });
    });

    describe("Edge cases", () => {
        it("should handle empty list item content", () => {
            cy.mount(
                <List>
                    <ListItemCustom id="li-custom-empty"></ListItemCustom>
                </List>
            );

            // Focus the list item
            cy.get("#li-custom-empty").click();

            // Should still have basic announcement text
            cy.get("#ui5-invisible-text")
                .should("exist")
                .should("have.text", "List Item");
            
            // Check that ariaLabelledByElements on the internal li element includes the global invisible text
            cy.get("#li-custom-empty")
                .shadow()
                .find("li[part='native-li']")
                .then($li => {
                    const ariaLabelledByElements = ($li[0] as any).ariaLabelledByElements;
                    expect(ariaLabelledByElements).to.exist;
                    const hasInvisibleText = ariaLabelledByElements.some((el: HTMLElement) => el.id === "ui5-invisible-text");
                    expect(hasInvisibleText).to.be.true;
                });
        });
        
        it("should handle list item with accessibleName", () => {
            cy.mount(
                <List>
                    <ListItemCustom 
                        id="li-custom-accessible-name" 
                        accessibleName="Accessible Name Test"
                    >
                        <div>This content should not be announced</div>
                    </ListItemCustom>
                </List>
            );

            // Focus the list item
            cy.get("#li-custom-accessible-name").click();

            // Check that ariaLabelledByElements on the internal li element doesn't include the global invisible text
            // when accessibleName is set
            cy.get("#li-custom-accessible-name")
                .shadow()
                .find("li[part='native-li']")
                .then($li => {
                    const ariaLabelledByElements = ($li[0] as any).ariaLabelledByElements;
                    if (ariaLabelledByElements) {
                        const hasInvisibleText = ariaLabelledByElements.some((el: HTMLElement) => el.id === "ui5-invisible-text");
                        expect(hasInvisibleText).to.be.false;
                    }
                });
        });
    });
});