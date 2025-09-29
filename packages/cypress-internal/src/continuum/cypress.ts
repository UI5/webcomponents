// @ts-nocheck
export function setupContinuumCommands() {
    if (Cypress.env('UI5_ACC') !== "continuum")  {
        return;
    }

    let continuum;
    try {
        continuum = require("@continuum/continuum-javascript-professional");
    } catch (error) {
        console.warn("@continuum/continuum-javascript-professional is not installed.");
        return;
    }

    // Use continuum only if available
    if (continuum) {
        const Continuum = continuum.Continuum;
        const accessEngineFilePath = `../../node_modules/@continuum/continuum-javascript-professional/AccessEngine.professional.js`.replace(/^\//, ''); 

        const _checkConcerns = (accessibilityConcerns: any[]) => {
            if (accessibilityConcerns?.length > 0) {
                accessibilityConcerns.forEach((concern) => {
                    cy.log(`Accessibility Concern: **${concern._bestPracticeDescription}**. \n **${concern.attribute}**. \n ${concern.element}`);
                });
            } else {
                cy.log("No accessibility concerns found");
            }
            cy.wrap(accessibilityConcerns)
            .should((concerns) => expect(concerns).to.have.length(0));

        };

        const _prepareAccessEngine = () => {
            return cy.window().then(windowUnderTest => {
                // @ts-ignore
                if (!windowUnderTest.LevelAccess_Continuum_AccessEngine) {
                    return cy.readFile(accessEngineFilePath)
                        .then(accessEngineFileContents => windowUnderTest.eval(Continuum.createInjectableAccessEngineCode(accessEngineFileContents)));
                }
            });
        }
        const setUpContinuum = (configFilePath: string) => (
            // Using the Continuum JavaScript SDK requires to load the following files before invoking `Continuum.setUp`:
            // * the Continuum configuration file (continuum.conf.js) specified by `configFilePath`
            // * Access Engine (AccessEngine.professional.js), the underlying accessibility testing engine Continuum uses

            cy.readFile(configFilePath)
                .then(configFileContents => window.eval(configFileContents))
                .window()
                .then(windowUnderTest => (
                    cy.readFile(accessEngineFilePath)
                        .then(accessEngineFileContents => {
                            Continuum.accessEngineCode = Continuum.createInjectableAccessEngineCode(accessEngineFileContents);
                            windowUnderTest.eval(Continuum.accessEngineCode);
                        })
                        .then(() => Continuum.setUp(null, configFilePath, windowUnderTest))
                ))
        );
        const runAllTestsForAssertions = (includeiframe = false) => (
            _prepareAccessEngine()
                .then(() => Continuum.runAllTests().then(function (accessibilityConcerns: any) {
                    _checkConcerns(accessibilityConcerns);
                })
            )
        );
        const runAllTestsForAssertionsForNode = (node: string | Node) => (
            _prepareAccessEngine()
                .then(() => Continuum.runAllTestsOnNode(node).then(function (accessibilityConcerns: any) {
                    _checkConcerns(accessibilityConcerns);
                })
            )
        );

        Cypress.Commands.add("setUpContinuum", setUpContinuum);
        // @ts-ignore
        Cypress.Commands.add('runAllTestsForAssertions', runAllTestsForAssertions);
        // @ts-ignore
        Cypress.Commands.add('runAllTestsForAssertionsForNode', runAllTestsForAssertionsForNode);

        declare global {
            namespace Cypress {
                interface Chainable {
                    setUpContinuum(configFilePath: string): Chainable<void>;
                    runAllTestsForAssertions(includeiframe?: boolean): Chainable<void>;
                    runAllTestsForAssertionsForNode(node: string | Node): Chainable<void>;
                }
            }
        }; 
    }
}
