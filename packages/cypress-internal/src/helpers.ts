declare global {
    function ui5AccDescribe(title: string, fn: (this: Mocha.Suite) => void, page: string): Mocha.Suite | void;
}

globalThis.ui5AccDescribe = (title: string, fn: (this: Mocha.Suite) => void, page: string): Mocha.Suite | void => {
    if (Cypress.env('UI5_ACC') === "axe") {
         return describe.only(`${title}`, function (this: Mocha.Suite) {
             before(() => {
                cy.visit(page);
                cy.injectAxe({ axeCorePath: "../../node_modules/axe-core/axe.min.js" });
             });
             fn.call(this);
         });
     } else if (Cypress.env('UI5_ACC') === "continuum") {
         return describe.only(`${title}`, function (this: Mocha.Suite) {
             before(() => {
                 cy.setUpContinuum("../../packages/cypress-internal/src/continuum/continuum.conf.js");
                cy.visit(page);

             });
             fn.call(this);
         });
     };
};

export { }