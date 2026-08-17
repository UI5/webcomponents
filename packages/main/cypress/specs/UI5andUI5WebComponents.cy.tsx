import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";
import Button from "../../src/Button.js";
import Dialog from "../../src/Dialog.js";

describe("ui5 and web components integration", () => {
    it("should open sap.m.Dialog, then web components dialog from within", () => {
        cy.mount(
            <div>
                <Button id="webc-button">web components button</Button>
                <Dialog id="webc-dialog" headerText="web components dialog">
                    <Button>button inside web components dialog</Button>
                </Dialog>
                <div id="content"></div>
            </div>
        );

        cy.window().then((win) => {
            (win as any).onOpenUI5Init = function () {
                (win as any).sap.ui.require(["sap/m/Button", "sap/m/Dialog"], (SapButton: any, SapDialog: any) => {
                    new SapButton("ui5-button", {
                        text: "Open sap.m.Dialog",
                        press: function () {
                            const dialog = new SapDialog({
                                title: "sap.m.Dialog",
                                content: [
                                    new SapButton({
                                        id: "ui5-open-webc-button",
                                        text: "open web components dialog from ui5",
                                        press: function () {
                                            const webcDialog = win.document.getElementById('webc-dialog') as any;
                                            if (webcDialog) {
                                                webcDialog.open = true;
                                            }
                                        }
                                    })
                                ],
                                afterClose: function () {
                                    this.destroy();
                                }
                            });

                            dialog.open();
                        }
                    }).placeAt("content");

                    (win as any).ui5InitComplete = true;
                });
            };
        });

        cy.document().then((doc) => {
            const ui5Script = doc.createElement('script');
            ui5Script.src = 'https://openui5.hana.ondemand.com/resources/sap-ui-core.js';
            ui5Script.id = 'sap-ui-bootstrap';
            ui5Script.setAttribute('data-sap-ui-libs', 'sap.m');
            ui5Script.setAttribute('data-sap-ui-oninit', 'onOpenUI5Init');
            doc.head.appendChild(ui5Script);
        });

        cy.window({ timeout: 10000 }).should((win) => {
            expect((win as any).ui5InitComplete).to.be.true;
        });

        cy.get('#ui5-button')
            .should('be.visible')
            .realClick();

        cy.get('.sapMDialog.sapMDialogOpen').should("exist").and('be.visible');

        cy.get('#ui5-open-webc-button')
            .should('be.visible')
            .realClick();

        cy.get<Dialog>("#webc-dialog").should(($dialog) => {
            expect($dialog).to.have.attr("open");
            expect($dialog.is(":popover-open")).to.be.true;
            expect($dialog.width()).to.not.equal(0);
            expect($dialog.height()).to.not.equal(0);
        });
    });
});
