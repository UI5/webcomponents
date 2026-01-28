import {{INIT_PACKAGE_VAR_CLASS_NAME}} from "../../src/{{INIT_PACKAGE_VAR_CLASS_NAME}}.js";

describe('{{INIT_PACKAGE_VAR_CLASS_NAME}}.cy.tsx', () => {
  it('playground', () => {
    cy.mount(<{{INIT_PACKAGE_VAR_CLASS_NAME}} />)

    cy.get("[{{INIT_PACKAGE_VAR_TAG}}]")
      .click();

    cy.get("[{{INIT_PACKAGE_VAR_TAG}}]")
      .should("have.prop", "count", 1)
  })
})