import "../../src/features/OpenUI5Support.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";

describe("ui5 and web components integration", () => {
    it("should open sap.m.Dialog, then web components dialog from within", () => {
        // mount the components
        cy.mount(
            <div>
                <Button id="webc-button">web components button</Button>
                <Dialog id="webc-dialog" headerText="web components dialog">
                    <Button>button inside web components dialog</Button>
                </Dialog>
                <div id="content"></div>
            </div>
        );
        
        // inject ui5 configuration
        cy.document().then((doc) => {
            const configScript = doc.createElement('script');
            configScript.setAttribute('data-ui5-config', '');
            configScript.type = 'application/json';
            configScript.textContent = JSON.stringify({
                language: 'EN'
            });
            doc.head.appendChild(configScript);
        });
        
        // define initialization function before loading ui5
        cy.window().then((win) => {
            (win as any).onOpenUI5Init = function() {
                (win as any).sap.ui.require(["sap/m/Button", "sap/m/Dialog"], (Button: any, Dialog: any) => {
                    // create sap.m.Button that opens sap.m.Dialog
                    new Button("ui5-button", {
                        text: "Open sap.m.Dialog",
                        press: function () {
                            // create sap.m.Dialog with button to open web components dialog
                            const dialog = new Dialog({
                                title: "sap.m.Dialog",
                                content: [
                                    new Button({
										id: "ui5-open-webc-button",
                                        text: "open web components dialog from ui5",
                                        press: function() {
                                            // open the web components dialog
                                            const webcDialog = win.document.getElementById('webc-dialog') as any;
                                            if (webcDialog) {
                                                webcDialog.open = true;
                                                (win as any).webcDialogOpened = true;
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
        
        // add ui5 bootstrap
        cy.document().then((doc) => {
            const ui5Script = doc.createElement('script');
            ui5Script.src = 'https://openui5.hana.ondemand.com/resources/sap-ui-core.js';
            ui5Script.id = 'sap-ui-bootstrap';
            ui5Script.setAttribute('data-sap-ui-libs', 'sap.m');
            ui5Script.setAttribute('data-sap-ui-oninit', 'onOpenUI5Init');
            doc.head.appendChild(ui5Script);
        });
        
        // act: open sap.m.Dialog
        cy.get('#ui5-button')
			.should('be.visible')
			.realClick();
        
        // assert: sap.m.Dialog is open
        cy.get('.sapMDialog').should('exist');
        cy.get('.sapMDialog.sapMDialogOpen').should('be.visible');
        
        // act: open ui5-dialog
        cy.get('#ui5-open-webc-button')
			.should('be.visible')
			.realClick();
        
        // assert: ui5-dialog is open
        cy.get("#webc-dialog").should(($dialog) => {
            expect($dialog).to.have.attr("open");
			expect($dialog.is(":popover-open")).to.be.true;
			expect($dialog.width()).to.not.equal(0);
			expect($dialog.height()).to.not.equal(0);
        });
    });

});