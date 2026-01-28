import Icon from "../../src/Icon.js";
import Input from "../../src/Input.js";
import Label from "../../src/Label.js";
import "@ui5/webcomponents-icons/dist/add-equipment.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/add-equipment.js";
import testAssets from "../../src/bundle.esm.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

describe("Icon general interaction", () => {
    it("Tests icon rendering", () => {
        cy.mount(
            <>
                <Icon name="add-equipment" mode="Interactive" />
                <Icon name="save" showTooltip />
            </>
        );

        cy.get("[ui5-icon][name='add-equipment'][mode='Interactive']")
            .shadow()
            .find(".ui5-icon-root")
            .should("exist");
    
        cy.get("[ui5-icon][show-tooltip]").then(($icon) => {
            cy.wrap($icon[0])
                .invoke("prop", "_id")
                .then((iconId) => {
                    cy.get("[ui5-icon][show-tooltip]")
                        .shadow()
                        .find(`#${iconId}-tooltip`)
                        .should("contain.text", "Save");
                });
        });
    });

    it("Tests events 'click' and 'ui5-click' events", () => {
        cy.mount(
            <div style={{ padding: "20px" }}>
                <Icon
                    name="add-equipment"
                    mode="Interactive"
                    style={{ display: "inline-block", margin: "10px" }}
                />
                <br />
                <Label>"click"</Label>
                <Input value="0" />
                <Label>"ui5-click"</Label>
                <Input value="0" />
                <br />

                <Icon
                    name="add-equipment"
                    style={{ display: "inline-block", margin: "10px" }}
                />
                <br />
                <Label>"click"</Label>
                <Input value="0" />
                <Label>"ui5-click"</Label>
                <Input value="0" />
            </div>
        );

        cy.get("[ui5-icon][mode='Interactive']")
            .as("interactiveIcon")
            .then($icon => {
                $icon.get(0).addEventListener("click", cy.stub().as("interactiveClickStub"));
                $icon.get(0).addEventListener("ui5-click", cy.stub().as("interactiveUI5ClickStub"));
            });

        cy.get("[ui5-icon]:not([mode='Interactive'])")
            .as("nonInteractiveIcon")
            .then($icon => {
                $icon.get(0).addEventListener("click", cy.stub().as("nonInteractiveClickStub"));
                $icon.get(0).addEventListener("ui5-click", cy.stub().as("nonInteractiveUI5ClickStub"));
            });

        cy.get("@interactiveIcon").then($icon => {
            let clickCount = 0;
            let ui5ClickCount = 0;

            $icon.get(0).addEventListener("click", () => {
                clickCount++;
                const input = document.querySelectorAll("[ui5-input]")[0] as HTMLInputElement;
                input.value = clickCount.toString();
            });

            $icon.get(0).addEventListener("ui5-click", () => {
                ui5ClickCount++;
                const input = document.querySelectorAll("[ui5-input]")[1] as HTMLInputElement;
                input.value = ui5ClickCount.toString();
            });
        });

        cy.get("@nonInteractiveIcon").then($icon => {
            let clickCount = 0;
            let ui5ClickCount = 0;

            $icon.get(0).addEventListener("click", () => {
                clickCount++;
                const input = document.querySelectorAll("[ui5-input]")[2] as HTMLInputElement;
                input.value = clickCount.toString();
            });

            $icon.get(0).addEventListener("ui5-click", () => {
                ui5ClickCount++;
                const input = document.querySelectorAll("[ui5-input]")[3] as HTMLInputElement;
                input.value = ui5ClickCount.toString();
            });
        });

        cy.get("@interactiveIcon").click();
        cy.get("[ui5-input]").eq(0).should("have.prop", "value", "1");
        cy.get("[ui5-input]").eq(1).should("have.prop", "value", "0");

        cy.get("@interactiveIcon").realPress("Enter");
        cy.get("[ui5-input]").eq(0).should("have.prop", "value", "2");
        cy.get("[ui5-input]").eq(1).should("have.prop", "value", "1");

        cy.get("@interactiveIcon").realPress("Space");
        cy.get("[ui5-input]").eq(0).should("have.prop", "value", "3");
        cy.get("[ui5-input]").eq(1).should("have.prop", "value", "2");

        cy.get("@nonInteractiveIcon").click();
        cy.get("[ui5-input]").eq(2).should("have.prop", "value", "1");
        cy.get("[ui5-input]").eq(3).should("have.prop", "value", "0");

        cy.get("@interactiveClickStub").should("have.been.calledThrice");
        cy.get("@interactiveUI5ClickStub").should("have.been.calledTwice");

        cy.get("@nonInteractiveClickStub").should("have.been.calledOnce");
        cy.get("@nonInteractiveUI5ClickStub").should("not.have.been.called");
    });

    it("Tests switch to sap_horizon", () => {
        cy.mount(
            <Icon
                name="add-equipment"
                showTooltip
                accessibleName="Hello SVG Icon"
                style={{ display: "inline-block" }}
            />
        );

        cy.get("[ui5-icon][name='add-equipment']")
            .shadow()
            .find("svg")
            .should("exist")
            .within(() => {
                cy.get("g")
                    .should("not.be.empty")
                    .children()
                    .should("exist");
            });

        let initialContent;
        cy.get("[ui5-icon][name='add-equipment']")
            .shadow()
            .find("svg")
            .invoke("prop", "innerHTML")
            .then((content) => {
                initialContent = content;
                cy.log("Initial SVG content:", content);
                expect(content).to.not.equal('<g role="presentation"></g>');
            });

        cy.wrap({ setTheme })
            .invoke("setTheme", "sap_fiori_3");

        cy.get("[ui5-icon][name='add-equipment']")
            .shadow()
            .find("svg")
            .invoke("prop", "innerHTML")
            .then((newContent) => {
                cy.log("New SVG content:", newContent);
                expect(newContent).to.not.equal(initialContent);
                expect(newContent).to.not.equal('<g role="presentation"></g>');
            });
    });

    it("Tests icon modules' exported values", () => {
        const expectedExportedValues = "accept|SAP-icons-v4/accept|SAP-icons-v5/accept|tnt/actor|tnt-v2/actor|tnt-v3/actor|business-suite/3d|business-suite-v1/3d|business-suite-v2/3d";

        const exportedIconValues = testAssets.getExportedIconsValues();
        const actualExportedValues = exportedIconValues.join("|");

        expect(actualExportedValues).to.equal(expectedExportedValues);
    });

    it("Icon svg aria-label cleaned after name change", () => {
        cy.mount(
            <Icon
                name="error"
                showTooltip
            />
        );

        cy.get("[ui5-icon][name='error']")
            .shadow()
            .find(".ui5-icon-root")
            .should("have.attr", "aria-label", "Error");

        cy.get("[ui5-icon][name='error']")
            .invoke("attr", "name", "add");

        cy.get("[ui5-icon][name='add']")
            .shadow()
            .find(".ui5-icon-root")
            .should("have.attr", "aria-label", "Add");

        cy.get("[ui5-icon][name='add']")
            .invoke("attr", "name", "less");

        cy.get("[ui5-icon][name='less']")
            .shadow()
            .find(".ui5-icon-root")
            .should("not.have.attr", "aria-label");
    });

    it("Tests getIconAccessibleName", () => {
        const expectedAccNames = ["Add", "Back to Top", "Collapse", "Download"];
        const iconNames = ["add", "back-to-top", "collapse", "download"];

        cy.then(async () => {
            const actualAccNames = await Promise.all(
                iconNames.map(iconName =>
                    testAssets.getIconAccessibleName(iconName)
                )
            );

            expect(actualAccNames.join()).to.equal(expectedAccNames.join());
        });
    });

    it("Tests mode property", () => {
        const interactiveMode = "Interactive";
        const imageMode = "Image";
        const decorativeMode = "Decorative";

        cy.mount(
            <Icon
                name="add-equipment"
            />
        );

        cy.get("[ui5-icon][name='add-equipment']")
            .should("have.prop", "mode", decorativeMode);

        cy.get("[ui5-icon][name='add-equipment']")
            .shadow()
            .find(".ui5-icon-root")
            .should("have.attr", "role", "presentation")
            .should("have.attr", "aria-hidden", "true");

        cy.get("[ui5-icon][name='add-equipment']")
            .invoke("prop", "mode", interactiveMode);

        cy.get("[ui5-icon][name='add-equipment']")
            .should("have.prop", "mode", interactiveMode);

        cy.get("[ui5-icon][name='add-equipment']")
            .shadow()
            .find(".ui5-icon-root")
            .should("have.attr", "role", "button");

        cy.get("[ui5-icon][name='add-equipment']")
            .invoke("prop", "mode", imageMode);

        cy.get("[ui5-icon][name='add-equipment']")
            .should("have.prop", "mode", imageMode);

        cy.get("[ui5-icon][name='add-equipment']")
            .shadow()
            .find(".ui5-icon-root")
            .should("have.attr", "role", "img");
    });

    it("Tests accessibilityInfo getter", () => {
        const interactiveMode = "Interactive";
        const imageMode = "Image";
        const decorativeMode = "Decorative";
        const accessibleName = "Test Icon";

        // Test with Interactive mode
        cy.mount(
            <Icon
                name="add-equipment"
                mode={interactiveMode}
                accessibleName={accessibleName}
            />
        );

        cy.get("[ui5-icon][mode='Interactive']").then($icon => {
            const icon = $icon[0] as any;
            const accessibilityInfo = icon.accessibilityInfo;
            
            // For Interactive mode, accessibilityInfo should have role, type and description
            expect(accessibilityInfo).to.not.be.undefined;
            expect(accessibilityInfo.role).to.equal("button");
            expect(accessibilityInfo.type).to.equal("Button");
            expect(accessibilityInfo.description).to.equal(accessibleName);
        });

        // Test with Decorative mode
        cy.mount(
            <Icon
                name="add-equipment"
                mode={decorativeMode}
                accessibleName={accessibleName}
            />
        );

        cy.get("[ui5-icon][mode='Decorative']").then($icon => {
            const icon = $icon[0] as any;
            const accessibilityInfo = icon.accessibilityInfo;
            
            // For Decorative mode, accessibilityInfo should return an empty object
            expect(accessibilityInfo).to.deep.equal({});
        });

        // Test with Image mode
        cy.mount(
            <Icon
                name="add-equipment"
                mode={imageMode}
                accessibleName={accessibleName}
            />
        );

        cy.get("[ui5-icon][mode='Image']").then($icon => {
            const icon = $icon[0] as any;
            const accessibilityInfo = icon.accessibilityInfo;
            
            // For Image mode, accessibilityInfo should have role, type and description
            expect(accessibilityInfo).to.not.be.undefined;
            expect(accessibilityInfo.role).to.equal("img");
            expect(accessibilityInfo.type).to.equal("Image");
            expect(accessibilityInfo.description).to.equal(accessibleName);
        });
    });
});
