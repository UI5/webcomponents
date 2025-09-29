import 'cypress-axe'
import type { AxeResults, ImpactValue } from "axe-core";
import { Options } from "cypress-axe";

type Vialotation = {
    id: string,
    impact: ImpactValue | undefined,
    description: string
    nodes: number,
}

type TestVialotation = {
    testTitlePath: string[],
    violations: Vialotation[]
}

type TestReport = {
    testFile: string,
    errors: TestVialotation[]
}
declare global {
    namespace Cypress {
        interface Chainable {
            ui5CheckA11y(context?: string | Node | undefined, options?: Options | undefined): Cypress.Chainable<void>;
        }
    }
}

Cypress.Commands.add("ui5CheckA11y", (context?: string | Node | undefined, options?: Options | undefined) => {
    if (Cypress.env('UI5_ACC') === "axe") {
        return cy.checkA11y(context, options)
    } else if (Cypress.env('UI5_ACC') === "continuum") {
        // @ts-ignore
        return context ? cy.runAllTestsForAssertionsForNode(context) : cy.runAllTestsForAssertions()
    }
})

export type {
    TestReport,
}