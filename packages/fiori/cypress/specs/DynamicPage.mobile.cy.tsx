import DynamicPage from "../../src/DynamicPage.js";
import DynamicPageTitle from "../../src/DynamicPageTitle.js";
import DynamicPageHeader from "../../src/DynamicPageHeader.js";

describe("DynamicPage Mobile Behaviour", () => {
  beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});
  it("should display snapped title on mobile when snappedTitleOnMobile slot has content and header is snapped", () => {    
    cy.mount(
      <DynamicPage style={{ height: "600px" }}>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
          <div slot="snappedTitleOnMobile">Mobile Snapped Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
      </DynamicPage>
    );

    cy.get("[ui5-dynamic-page]")
      .invoke("prop", "headerSnapped", true);

    cy.contains("Mobile Snapped Title").should("be.visible");
  });

  it("the header content should not be rendered when snappedTitleOnMobile content is present", () => {    
    cy.mount(
      <DynamicPage style={{ height: "600px" }}>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
          <div slot="snappedTitleOnMobile">Mobile Snapped Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
      </DynamicPage>
    );

    cy.get("[ui5-dynamic-page]")
      .shadow()
      .find(".ui5-dynamic-page-scroll-container")
      .scrollTo(0, 340);
  
    cy.get("[ui5-dynamic-page]")
      .should("have.prop", "headerSnapped", true);
  
    cy.get("[ui5-dynamic-page]")
      .shadow()
      .find("slot[name=headerArea]")
      .should("not.exist");
  });

  it("should not display snapped title on mobile when snappedTitleOnMobile slot is empty", () => {    
    cy.mount(
      <DynamicPage style={{ height: "600px" }}>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
          <div slot="snappedTitleOnMobile">Mobile Snapped Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
      </DynamicPage>
    );

    cy.get("[ui5-dynamic-page-title]")
      .find("[slot='snappedTitleOnMobile']")
      .then(($el) => {
        if ($el.length > 0) {
          $el.remove();
        }
      });
  
    cy.get("[ui5-dynamic-page]")
      .invoke("prop", "headerSnapped", true);
  
    cy.contains("Mobile Snapped Title").should("not.exist");
  
    cy.get("[ui5-dynamic-page-title]")
      .find("[slot='snappedTitleOnMobile']")
      .should("not.exist");
  });

  it("should expand the header when clicked on the snapped title on mobile", () => {    
    cy.mount(
      <DynamicPage style={{ height: "600px" }}>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
          <div slot="snappedTitleOnMobile">Mobile Snapped Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
      </DynamicPage>
    );

    cy.get("[ui5-dynamic-page]")
      .invoke("prop", "headerSnapped", true);
  
    cy.get("[ui5-dynamic-page-title]")
      .shadow()
      .find(".ui5-dynamic-page-title-focus-area")
      .click();
  
    cy.get("[ui5-dynamic-page]")
      .should("have.prop", "headerSnapped", false);
  });

  it("should not display snapped title on mobile when header is not snapped", () => {    
    cy.mount(
      <DynamicPage style={{ height: "600px" }}>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
          <div slot="snappedTitleOnMobile">Mobile Snapped Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
      </DynamicPage>
    );

    cy.get("[ui5-dynamic-page]")
      .invoke("prop", "headerSnapped", false);
  
    cy.contains("Mobile Snapped Title").should("not.be.visible");
  });

  it("should focus the title focus area when header action is clicked to snap the header", () => {    
    cy.mount(
      <DynamicPage style={{ height: "600px" }}>
        <DynamicPageTitle slot="titleArea">
          <div slot="heading">Page Title</div>
          <div slot="snappedTitleOnMobile">Mobile Snapped Title</div>
        </DynamicPageTitle>
        <DynamicPageHeader slot="headerArea">
          <div>Header Content</div>
        </DynamicPageHeader>
        <div style={{ height: "1000px" }}>
          Page content with enough height to enable scrolling
        </div>
      </DynamicPage>
    );

    cy.get("[ui5-dynamic-page]")
      .invoke("prop", "headerSnapped", false);
  
    cy.get("[ui5-dynamic-page]")
      .shadow()
      .find("ui5-dynamic-page-header-actions")
      .shadow()
      .find(".ui5-dynamic-page-header-action")
      .first()
      .click();
  
    cy.get("[ui5-dynamic-page]")
      .should("have.prop", "headerSnapped", true);
  
    cy.get("[ui5-dynamic-page-title]")
      .shadow()
      .find(".ui5-dynamic-page-title-focus-area")
      .should("be.focused");
  });
});