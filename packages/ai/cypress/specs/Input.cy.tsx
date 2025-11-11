import Input from "../../src/Input.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import { INPUT_VERSIONING_NEXT_BUTTON_TOOLTIP, INPUT_VERSIONING_PREVIOUS_BUTTON_TOOLTIP, INPUT_WRITING_ASSISTANT_BUTTON_TOOLTIP } from "../../src/generated/i18n/i18n-defaults.js";

describe("Basic", () => {
    describe("Initialization", () => {
        it("should render with default properties", () => {
            cy.mount(<Input />);

            cy.get("[ui5-ai-input]")
                .as("input")
                .should("exist")
                .should("have.prop", "loading", false)
                .should("have.prop", "currentVersion", 0)
                .should("have.prop", "totalVersions", 0);
        });

        it("should set initial value as a property", () => {
            cy.mount(<Input value="AI initial value" />);

            cy.get("[ui5-ai-input]")
                .should("have.prop", "value", "AI initial value");
        });
    });

    describe("Loading States", () => {
        it("should display non-loading state correctly", () => {
            cy.mount(<Input loading={false} />);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-busy-indicator]")
                .should("not.have.attr", "active");
        });

        it("should display loading state correctly", () => {
            cy.mount(
                <Input
                    loading={true}
                    value="Generating content..."
                />
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-busy-indicator]")
                .should("have.attr", "active");
        });

        it("should display single result correctly", () => {
            cy.mount(
                <Input
                    loading={false}
                    value="Generated text"
                    currentVersion={1}
                    totalVersions={1}
                />
            );

            cy.get("[ui5-ai-input]")
                .should("have.prop", "loading", false)
                .should("have.prop", "value", "Generated text")
                .should("have.prop", "currentVersion", 1)
                .should("have.prop", "totalVersions", 1);
        });

        it("should display multiple results correctly", () => {
            cy.mount(
                <Input
                    loading={false}
                    value="Generated text"
                    currentVersion={2}
                    totalVersions={3}
                />
            );

            cy.get("[ui5-ai-input]")
                .should("have.prop", "loading", false)
                .should("have.prop", "value", "Generated text")
                .should("have.prop", "currentVersion", 2)
                .should("have.prop", "totalVersions", 3);
        });
    });

    describe("Version Navigation", () => {
        it("should fire version-change event with backwards=true for previous version", () => {
            const onVersionChange = cy.spy().as("onVersionChange");

            cy.mount(
                <Input
                    loading={false}
                    currentVersion={2}
                    totalVersions={3}
                    onVersionChange={onVersionChange}>
                </Input>
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("input")
                .realClick();

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[ui5-menu]')
                .as("menu");

            cy.get("@menu")
                .ui5MenuOpen();

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="previous"]')
                .realClick();

            cy.get("@onVersionChange")
                .should("have.been.calledOnce")
                .its("firstCall.args.0.detail")
                .should("deep.equal", {
                    backwards: true
                });
        });

        it("should fire version-change event with backwards=false for next version", () => {
            const onVersionChange = cy.spy().as("onVersionChange");

            cy.mount(
                <Input
                    loading={false}
                    currentVersion={2}
                    totalVersions={3}
                    onVersionChange={onVersionChange}>
                </Input>
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("input")
                .realClick();

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[ui5-menu]')
                .as("menu");

            cy.get("@menu")
                .ui5MenuOpen();

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .realClick();

            cy.get("@onVersionChange")
                .should("have.been.calledOnce")
                .its("firstCall.args.0.detail")
                .should("deep.equal", {
                    backwards: false,
                });
        });

        it("should disable previous button when at first version", () => {
            cy.mount(
                <Input
                    loading={false}
                    currentVersion={1}
                    totalVersions={3}
                />
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="previous"]')
                .should("have.attr", "disabled");
        });

        it("should disable next button when at last version", () => {
            cy.mount(
                <Input
                    loading={false}
                    currentVersion={3}
                    totalVersions={3}
                />
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .should("have.attr", "disabled");
        });

        it("should sync input content after version navigation", () => {
            const initialValue = "Version 1 content";
            const newValue = "Version 2 content";
            const onVersionChange = cy.spy().as("onVersionChange");

            cy.mount(
                <Input
                    value={initialValue}
                    loading={false}
                    currentVersion={1}
                    totalVersions={2}
                    onVersionChange={onVersionChange}
                />
            );

            cy.get("[ui5-ai-input]")
                .as("input")
                .then($input => {
                    $input[0].addEventListener("version-change", () => {
                        const input = $input[0] as Input;
                        input.value = newValue;
                    });
                });

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[ui5-menu]')
                .as("menu");

            cy.get("@menu")
                .ui5MenuOpen();

            cy.get("@input")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .realClick();

            cy.get("@onVersionChange")
                .should("have.been.calledOnce");

            cy.get("@input")
                .shadow()
                .find("input")
                .should("have.value", newValue);
        });
    });

    describe("Menu Integration", () => {
        it("should open menu when AI Icon is clicked", () => {
            cy.mount(
                <Input>
                    <MenuItem slot="actions" text="Generate text" />
                </Input>
            );

            cy.get("[ui5-ai-input]")
                .realClick();

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-button]")
                .eq(0)
                .realClick();

            cy.get("[ui5-ai-input")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpened();
        });
    });

    describe("Stop Generation", () => {
        it("should fire stop-generation event", () => {
            const onStopGeneration = cy.spy().as("onStopGeneration");

            cy.mount(
                <Input
                    loading={true}
                    onStopGeneration={onStopGeneration}
                >
                    <MenuItem slot="actions" text="Generate text" />
                </Input>
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("input")
                .realClick();

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-button]")
                .eq(0)
                .realClick();

            cy.get("@onStopGeneration").should("have.been.calledOnce");
        });
    });

    describe("Keyboard Shortcuts", () => {
        it("should handle Shift+F4 to open menu", () => {
            cy.mount(
                <Input>
                    <MenuItem slot="actions" text="Generate"></MenuItem>
                </Input>
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("input")
                .focus()
                .realPress(['Shift', 'F4']);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpened();
        });

        it("should handle Ctrl+Shift+Z for previous version when multiple versions exist", () => {
            const onVersionChange = cy.spy().as("onVersionChange");

            cy.mount(
                <Input
                    loading={false}
                    currentVersion={2}
                    totalVersions={3}
                    onVersionChange={onVersionChange}
                />
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("input")
                .focus()
                .realPress(['Control', 'Shift', 'Z']);

            cy.get("@onVersionChange")
                .should("have.been.calledOnce")
                .its("firstCall.args.0.detail")
                .should("deep.equal", {
                    backwards: true
                });
        });

        it("should handle Ctrl+Shift+Y for next version when multiple versions exist", () => {
            const onVersionChange = cy.spy().as("onVersionChange");

            cy.mount(
                <Input
                    loading={false}
                    currentVersion={2}
                    totalVersions={3}
                    onVersionChange={onVersionChange}
                />
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("input")
                .focus()
                .realPress(['Control', 'Shift', 'Y']);

            cy.get("@onVersionChange")
                .should("have.been.calledOnce")
                .its("firstCall.args.0.detail")
                .should("deep.equal", {
                    backwards: false
                });
        });
    });

    describe("Busy State", () => {
        it("should show busy indicator when loading", () => {
            cy.mount(<Input loading={true} />);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-busy-indicator]")
                .should("have.attr", "active");
        });

        it("should hide busy indicator when not loading", () => {
            cy.mount(<Input loading={false} />);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("ui5-busy-indicator")
                .should("not.have.attr", "active");
        });
    });
});

describe("Versioning Menu Item", () => {
    describe("Initialization", () => {
        it("should render with current step and total steps as text", () => {
            cy.mount(
                <Input
                    currentVersion={2}
                    totalVersions={3} />
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            cy.get("[ui5-ai-input")
                .shadow()
                .find("[ui5-menu-item]")
                .as("menuItemVersioning");
            cy.get("@menuItemVersioning")
                .should("exist")
                .should("have.attr", "text", "2 / 3");
        });
    });

    describe("Navigation Buttons", () => {
        it("should enable both buttons when in middle steps", () => {
            cy.mount(<Input currentVersion={2} totalVersions={4} />);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            cy.get("[ui5-ai-input")
                .shadow()
                .find("[ui5-menu-item]")
                .as("menuItemVersioning");

            cy.get("@menuItemVersioning")
                .find('[data-ui5-versioning-button="previous"]')
                .should("not.have.attr", "disabled");

            cy.get("@menuItemVersioning")
                .find('[data-ui5-versioning-button="next"]')
                .should("not.have.attr", "disabled");
        });

        it("should have proper icons", () => {
            cy.mount(<Input currentVersion={2} totalVersions={4} />);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            cy.get("[ui5-ai-input")
                .shadow()
                .find("[ui5-menu-item]")
                .as("menuItemVersioning");

            cy.get("@menuItemVersioning")
                .find('[data-ui5-versioning-button="previous"]')
                .should("have.attr", "icon", "navigation-left-arrow");

            cy.get("@menuItemVersioning")
                .find('[data-ui5-versioning-button="next"]')
                .should("have.attr", "icon", "navigation-right-arrow");
        });

        it("should not fire events when buttons are disabled", () => {
            const onVersionChange = cy.spy().as("onVersionChange");

            cy.mount(
                <Input
                    currentVersion={1}
                    totalVersions={2}
                    onVersionChange={onVersionChange}
                />
            );


            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="previous"]')
                .as("previousButton")
                .should("have.attr", "disabled");

            cy.get("@previousButton")
                .realClick();

            cy.get("@onVersionChange").should("not.have.been.called");
        });

        it("should handle multiple rapid clicks gracefully", () => {
            const onVersionChange = cy.spy().as("onVersionChange");

            cy.mount(
                <Input
                    currentVersion={2}
                    totalVersions={5}
                    onVersionChange={onVersionChange}
                />
            );

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .realClick()
                .realClick()
                .realClick();

            cy.get("@onVersionChange").should("have.callCount", 3);

            // Verify all calls were for next (backwards: false)
            cy.get("@onVersionChange").should((spy) => {
                expect(spy).to.have.been.calledWith(Cypress.sinon.match.has("detail", { backwards: false }));
            });
        });
    })

    describe("Focus Management", () => {
        it("should manage focus when reaching boundaries", () => {
            const onVersionChange = cy.spy().as("onVersionChange");

            cy.mount(
                <Input
                    currentVersion={2}
                    totalVersions={3}
                    onVersionChange={onVersionChange}
                />
            );

            cy.get("[ui5-ai-input]")
                .as("input");

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            // Test that buttons respond correctly when reaching boundaries
            cy.get("@input")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .as("nextButton")
                .should("not.have.attr", "disabled");

            cy.get("@nextButton").realClick();

            cy.get("@onVersionChange").should("have.been.calledOnce");

            // Simulate reaching the last step - next button should be disabled
            cy.get("@input").invoke("prop", "currentVersion", 3);

            cy.get("@input")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .should("have.attr", "disabled");

            cy.get("@input")
                .shadow()
                .find('[data-ui5-versioning-button="previous"]')
                .as("previousButton")
                .should("not.have.attr", "disabled");

            cy.get("@previousButton").realClick();

            cy.get("@onVersionChange").should("have.been.calledTwice");

            // Simulate reaching the first step - previous button should be disabled
            cy.get("@input").invoke("prop", "currentVersion", 1);

            cy.get("@input")
                .shadow()
                .find('[data-ui5-versioning-button="previous"]')
                .should("have.attr", "disabled");

            cy.get("@input")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .should("not.have.attr", "disabled");
        });

        it("should not change focus when buttons remain enabled", () => {
            cy.mount(<Input currentVersion={3} totalVersions={5} />);

            cy.get("[ui5-ai-input]")
                .as("input");

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            cy.get("@input")
                .shadow()
                .find('[data-ui5-versioning-button="previous"]')
                .realClick();

            // Simulate property change without reaching boundary
            cy.get("@input").invoke("prop", "currentVersion", 4);

            // The button should still exist and be enabled
            cy.get("@input")
                .shadow()
                .find('[data-ui5-versioning-button="previous"]')
                .should("not.have.attr", "disabled");
        });
    });

    describe("Step Display", () => {
        it("should update display when properties change", () => {
            cy.mount(<Input currentVersion={1} totalVersions={2} />);

            cy.get("[ui5-ai-input]")
                .as("input")
                .invoke("prop", "currentVersion", 2)
                .invoke("prop", "totalVersions", 4);

            cy.get("@input")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            cy.get("@input")
                .shadow()
                .find("[ui5-menu-item]")
                .should("have.attr", "text", "2 / 4");
        });

        it("should handle large numbers correctly", () => {
            cy.mount(<Input currentVersion={999} totalVersions={1000} />);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            cy.get("[ui5-ai-input]")
                .shadow()
                .find("[ui5-menu-item]")
                .should("have.attr", "text", "999 / 1000");
        });
    });

    describe("Button State Transitions", () => {
        it("should handle rapid property changes", () => {
            cy.mount(<Input currentVersion={1} totalVersions={5} />);

            cy.get("[ui5-ai-input]")
                .as("input");

            // Rapidly change properties
            for (let i = 1; i <= 5; i++) {
                cy.get("@input").invoke("prop", "currentVersion", i);
            }

            cy.get("@input")
                .shadow()
                .find("[ui5-menu]")
                .ui5MenuOpen();

            cy.get("@input")
                .shadow()
                .find("[ui5-menu-item]")
                .should("have.attr", "text", "5 / 5");

            cy.get("@input")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .should("have.attr", "disabled");
        });
    });

    describe("Accessibility", () => {
        it("should have proper ARIA attributes", () => {
            cy.mount(<Input currentVersion={2} totalVersions={4} />);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="previous"]')
                .should("have.attr", "design", "Transparent");

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .should("have.attr", "design", "Transparent");
        });


        it("should have translatable previous button tooltip", () => {
            cy.mount(<Input currentVersion={2} totalVersions={3} />);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="previous"]')
                .should("have.attr", "tooltip", INPUT_VERSIONING_PREVIOUS_BUTTON_TOOLTIP.defaultText);
        });

        it("should have translatable next button tooltip", () => {
            cy.mount(<Input currentVersion={2} totalVersions={3} />);

            cy.get("[ui5-ai-input]")
                .shadow()
                .find('[data-ui5-versioning-button="next"]')
                .should("have.attr", "tooltip", INPUT_VERSIONING_NEXT_BUTTON_TOOLTIP.defaultText);
        });
    });
});

describe("Writing Assistant Input Icon", () => {
    it("should not be visible when input is not focused", () => {
        cy.mount(<Input />);

        cy.get("[ui5-ai-input]")
            .shadow()
            .find("[ui5-button]")
            .eq(0)
            .should("not.be.visible");
    })
    it("should render AI Icon on focus", () => {
        cy.mount(
            <Input>
                <MenuItem slot="actions" text="Generate text" />
            </Input>
        );

        cy.get("[ui5-ai-input]")
            .shadow()
            .find("input")
            .focus();

        cy.get("[ui5-ai-input]")
            .shadow()
            .find("[ui5-button]")
            .eq(0)
            .should("be.visible")
            .and("have.prop", "icon", "ai");
    });
    it("should show generating state when loading", () => {
        cy.mount(<Input loading={true} />);

        cy.get("[ui5-ai-input]")
            .shadow()
            .find("[ui5-button]")
            .eq(0)
            .should("have.prop", "icon", "stop");
    });
    it("should fire icon-click event when clicked in non-loading state", () => {
        cy.mount(
            <Input
                loading={false}
                onButtonClick={cy.stub().as("onButtonClick")}
            >
                <MenuItem slot="actions" text="Generate text" />
            </Input>
        );


        cy.get("[ui5-ai-input]")
            .shadow()
            .find("input")
            .focus();

        cy.get("[ui5-ai-input]")
            .shadow()
            .find("[ui5-button]")
            .eq(0)
            .realClick();

        cy.get("@onButtonClick")
            .should("have.been.calledOnce");
    });

    it("should fire stop-generation event when clicked in loading state", () => {
        cy.mount(
            <Input
                loading={true}
                onStopGeneration={cy.spy().as("onStopGeneration")}
            >
                <MenuItem slot="actions" text="Generate text" />
            </Input>
        );

        cy.get("[ui5-ai-input]")
            .shadow()
            .find("input")
            .realClick();

        cy.get("[ui5-ai-input]")
            .shadow()
            .find("[ui5-button]")
            .eq(0)
            .realClick();

        cy.get("@onStopGeneration").should("have.been.calledOnce");
    });

    it("should have proper ariaKeyShortcuts accessibility attribute", () => {
        cy.mount(<Input />);

        cy.get("[ui5-ai-input]")
            .shadow()
            .find(".ui5-input-ai-button")
            .should("have.attr", "aria-keyshortcuts", "Shift + F4");
    });

    it("should have correct aria-label attribute", () => {
        cy.mount(<Input />);

        cy.get("[ui5-ai-input]")
            .shadow()
            .find("input")
            .should("have.attr", "aria-label", INPUT_WRITING_ASSISTANT_BUTTON_TOOLTIP.defaultText);
    });
})

