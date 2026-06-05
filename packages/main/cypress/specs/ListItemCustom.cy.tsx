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

            // After focus, shadow span should have the full announcement text
            // Has description but no tabbable controls, so no control state announcement
            cy.get("#li-custom-html")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "List Item Test Content Additional Text");

            // Check that aria-labelledby is non-empty and points to the shadow span
            cy.get("#li-custom-html")
                .shadow()
                .find("li[part='native-li']")
                .should("have.attr", "aria-labelledby");

            // Remove focus
            cy.focused().blur();

            // After blur, shadow span still has text (aria-labelledby remains populated)
            cy.get("#li-custom-html")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("not.have.text", "");
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

            // Verify text content is processed and included in the shadow span
            // Has description but no tabbable controls, so no control state announcement
            cy.get("#li-custom-html-content")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "List Item Primary Content Secondary Information Paragraph text");

            // Check that aria-labelledby is non-empty
            cy.get("#li-custom-html-content")
                .shadow()
                .find("li[part='native-li']")
                .should("have.attr", "aria-labelledby");
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

            // After focus, shadow span should have the full announcement text
            // 2 tabbable controls (Button, CheckBox), so we expect ". Includes elements"
            cy.get("#li-custom-ui5")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "List Item Button Click me Checkbox Check option Not checked Required . Includes elements");

            // Check that aria-labelledby is non-empty
            cy.get("#li-custom-ui5")
                .shadow()
                .find("li[part='native-li']")
                .should("have.attr", "aria-labelledby");

            // Remove focus
            cy.focused().blur();

            // After blur, shadow span still has text
            cy.get("#li-custom-ui5")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("not.have.text", "");
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

            // Verify shadow span is populated
            // 2 tabbable controls, so we expect ". Includes elements"
            cy.get("#li-custom-ui5-focus")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "List Item Button Click Me Checkbox Check Option Not checked . Includes elements");

            // Check that aria-labelledby is non-empty
            cy.get("#li-custom-ui5-focus")
                .shadow()
                .find("li[part='native-li']")
                .should("have.attr", "aria-labelledby");

            // Now click the button - this shouldn't trigger focusout on the list item
            // as it's a child element
            cy.get("#test-focus-button").click();

            // Verify shadow span is still populated (list item should maintain focus state)
            cy.get("#li-custom-ui5-focus")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "List Item Button Click Me Checkbox Check Option Not checked . Includes elements");

            // Click outside the list to truly remove focus
            cy.get("body").click({ force: true });

            // After blur, shadow span still has text
            cy.get("#li-custom-ui5-focus")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("not.have.text", "");
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

            // Verify text content is processed
            // 1 tabbable control (Button), so we expect ". Includes element"
            cy.get("#li-custom-nested")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "List Item Container Text Button Nested Button Paragraph outside container . Includes element");

            // Check that aria-labelledby is non-empty
            cy.get("#li-custom-nested")
                .shadow()
                .find("li[part='native-li']")
                .should("have.attr", "aria-labelledby");
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
            cy.get("#li-custom-deep-nested")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "List Item Button Deeply Nested Button Level 2 Text Checkbox Nested Not checked . Includes elements");

            // Check that aria-labelledby is non-empty
            cy.get("#li-custom-deep-nested")
                .shadow()
                .find("li[part='native-li']")
                .should("have.attr", "aria-labelledby");

            // Remove focus
            cy.focused().blur();

            // After blur, shadow span still has text
            cy.get("#li-custom-deep-nested")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("not.have.text", "");
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

            // Verify text content is processed
            // The delete button is tabbable, so we expect ". Includes element"
            cy.get("#li-custom-delete")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "List Item Delete Mode Item Button Remove . Includes element");

            // Check that aria-labelledby is non-empty
            cy.get("#li-custom-delete")
                .shadow()
                .find("li[part='native-li']")
                .should("have.attr", "aria-labelledby");

            // Remove focus
            cy.focused().blur();

            // After blur, shadow span still has text
            cy.get("#li-custom-delete")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("not.have.text", "");
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
            cy.get("#li-custom-empty")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "List Item");

            // Check that aria-labelledby is non-empty
            cy.get("#li-custom-empty")
                .shadow()
                .find("li[part='native-li']")
                .should("have.attr", "aria-labelledby");
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

            // When accessibleName is set, shadow span should show that name
            cy.get("#li-custom-accessible-name")
                .shadow()
                .find(".ui5-hidden-text")
                .first()
                .should("have.text", "Accessible Name Test");

            // aria-labelledby should still be non-empty
            cy.get("#li-custom-accessible-name")
                .shadow()
                .find("li[part='native-li']")
                .should("have.attr", "aria-labelledby");
        });
    });
});

describe("ListItemCustom - aria-labelledby regression tests", () => {
    it("should have non-empty aria-labelledby on non-focused items", () => {
        cy.mount(
            <List>
                <ListItemCustom>
                    <div>First Item</div>
                </ListItemCustom>
                <ListItemCustom>
                    <div>Second Item</div>
                </ListItemCustom>
            </List>
        );

        cy.get("[ui5-list]").as("list");

        // Neither item is focused — both must have a populated shadow span
        cy.get("@list")
            .find("[ui5-li-custom]")
            .first()
            .shadow()
            .find("li[part='native-li']")
            .then($li => {
                const spanId = $li.attr("aria-labelledby")!;
                const span = ($li[0].getRootNode() as ShadowRoot).getElementById(spanId);
                expect(span?.textContent?.trim()).to.not.be.empty;
            });

        cy.get("@list")
            .find("[ui5-li-custom]")
            .last()
            .shadow()
            .find("li[part='native-li']")
            .then($li => {
                const spanId = $li.attr("aria-labelledby")!;
                const span = ($li[0].getRootNode() as ShadowRoot).getElementById(spanId);
                expect(span?.textContent?.trim()).to.not.be.empty;
            });
    });

    it("should preserve accessible name when focus moves to a child interactive element", () => {
        cy.mount(
            <List>
                <ListItemCustom id="li-child-focus">
                    <div>Item with button</div>
                    <Button id="child-button">Action</Button>
                </ListItemCustom>
            </List>
        );

        // Focus the list item
        cy.get("#li-child-focus").click();

        // Shadow span populated on focus
        cy.get("#li-child-focus")
            .shadow()
            .find(".ui5-hidden-text")
            .first()
            .should("have.text", "List Item Item with button Button Action . Includes element");

        // Move focus to the inner button inside the child ui5-button
        cy.get("#child-button")
            .shadow()
            .find("button")
            .focus();

        // Shadow span must NOT be cleared when focus moves to a child
        cy.get("#li-child-focus")
            .shadow()
            .find(".ui5-hidden-text")
            .first()
            .should("have.text", "List Item Item with button Button Action . Includes element");
    });

    it("should preserve accessible name after full focus/blur cycle", () => {
        cy.mount(
            <List>
                <ListItemCustom>
                    <div>Item Content</div>
                </ListItemCustom>
            </List>
        );

        cy.get("[ui5-list]").as("list");

        // Focus then blur to trigger the full cycle
        cy.get("@list")
            .find("[ui5-li-custom]")
            .click();

        cy.get("body").click({ force: true });

        // The shadow span must still contain accessible text after blur — core regression from #13478
        cy.get("@list")
            .find("[ui5-li-custom]")
            .shadow()
            .find("[class='ui5-hidden-text']")
            .first()
            .should("not.have.text", "");
    });
});
