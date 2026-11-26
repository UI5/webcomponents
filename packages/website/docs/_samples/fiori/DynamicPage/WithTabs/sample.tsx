import { useEffect, useRef, useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DynamicPageClass from "@ui5/webcomponents-fiori/dist/DynamicPage.js";
import DynamicPageHeaderClass from "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js";
import DynamicPageTitleClass from "@ui5/webcomponents-fiori/dist/DynamicPageTitle.js";
import BreadcrumbsClass from "@ui5/webcomponents/dist/Breadcrumbs.js";
import BreadcrumbsItemClass from "@ui5/webcomponents/dist/BreadcrumbsItem.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const DynamicPage = createReactComponent(DynamicPageClass);
const DynamicPageHeader = createReactComponent(DynamicPageHeaderClass);
const DynamicPageTitle = createReactComponent(DynamicPageTitleClass);
const Breadcrumbs = createReactComponent(BreadcrumbsClass);
const BreadcrumbsItem = createReactComponent(BreadcrumbsItemClass);
const Label = createReactComponent(LabelClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const Tab = createReactComponent(TabClass);
const TabContainer = createReactComponent(TabContainerClass);
const Title = createReactComponent(TitleClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

// The sections rendered in the page, in document order. "Specifications" is split into two
// subsections reached via sub-tabs; the parent "specifications" id itself has no section.
const sectionIds = ["overview", "spec-hardware", "spec-connectivity", "related"];

const relatedProducts = [
  { description: "HT-2001", text: "10 inch Portable DVD", price: "47.00 EUR" },
  { description: "HT-2001", text: "7 inch Widescreen Portable DVD Player w MP3", price: "249.00 EUR" },
  { description: "HT-1251", text: "Astro Laptop 1516", price: "947.00 EUR" },
  { description: "HT-1251", text: "Astro Phone 6", price: "647.00 EUR" },
  { description: "HT-1252", text: "Audio/Video Cable Kit - 4m", price: "27.99 EUR" },
  { description: "HT-6001", text: "Beam Breaker B-1", price: "447.90 EUR" },
  { description: "HT-6001", text: "Beam Breaker B-2", price: "647.50 EUR" },
  { description: "HT-6001", text: "Beam Breaker B-3", price: "847.80 EUR" },
  { description: "HT-2001", text: "Beam Breaker B-4", price: "1,250.00 EUR" },
  { description: "HT-8001", text: "Camcorder View", price: "1,288.00 EUR" },
  { description: "HT-2001", text: "Benda Laptop 1408", price: "996.00 EUR" },
  { description: "HT-0003", text: "Cepat Tablet 10.5", price: "147.00 EUR" },
];

function App() {
  const pageRef = useRef(null);
  // The section currently anchored under the sticky band. Drives tab/sub-tab selection.
  const [activeSection, setActiveSection] = useState("overview");
  // While a tab-triggered scroll is animating, the scroll handler must not re-select
  // a tab from an intermediate position (prevents flicker).
  const isProgrammaticScroll = useRef(false);

  // Distance of a section's top from the top of the scrollable area, in scroll units.
  const sectionOffset = section => {
    const container = pageRef.current.scrollContainer;
    return section.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
  };

  const scrollToSection = id => {
    const page = pageRef.current;
    const section = page.querySelector(`#${id}`);
    if (!section) {
      return;
    }
    // DynamicPage exposes the sticky extent via `scrollPaddingTop`; reuse it instead of
    // hard-coding offsets so the target never ends up hidden behind the sticky band.
    const top = sectionOffset(section) - page.scrollPaddingTop;

    isProgrammaticScroll.current = true;
    page.scrollContainer.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 400);
  };

  // Scroll-spy: mark the section (incl. subsection) currently under the sticky band.
  // The DynamicPage scrolls its internal container, so listen there (the scroll event
  // does not cross the shadow boundary to the host element). `scrollContainer` lives in
  // the shadow DOM and only exists once the component has rendered, so wait for it.
  useEffect(() => {
    const page = pageRef.current;
    let container;
    let frame;

    const onScroll = () => {
      if (isProgrammaticScroll.current) {
        return;
      }
      const line = container.scrollTop + page.scrollPaddingTop + 1;
      let active = sectionIds[0];
      sectionIds.forEach(id => {
        if (sectionOffset(page.querySelector(`#${id}`)) <= line) {
          active = id;
        }
      });
      setActiveSection(active);
    };

    const attach = () => {
      if (!page.scrollContainer) {
        frame = requestAnimationFrame(attach);
        return;
      }
      container = page.scrollContainer;
      container.addEventListener("scroll", onScroll);
    };
    attach();

    return () => {
      cancelAnimationFrame(frame);
      container?.removeEventListener("scroll", onScroll);
    };
  }, []);

  // A sub-tab is active when it matches; the parent "Specifications" is active when either
  // of its subsections is the current one, so the parent stays highlighted in the strip.
  const specActive = activeSection === "spec-hardware" || activeSection === "spec-connectivity";

  return (
    <>
      <style>{`
        .text {
            display: inline-block;
            font-size: var(--sapFontSize);
            font-family: var(--sapFontFamily);
            color: var(--sapTextColor);
            line-height: normal;
            margin: 0;
        }

        .product-info {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
        }

        .product-info-cell {
            display: flex;
            gap: 5px;
            flex-direction: column;
        }

        .availability {
            font-size: 1.2rem;
            color: var(--sapPositiveTextColor);
        }

        .snapped-title-heading {
            display: flex;
            align-items: center;
        }

        .snapped-title-heading [ui5-title] {
            font-family: var(--sapObjectHeader_Title_FontFamily);
            color: var(--sapObjectHeader_Title_TextColor);
            font-size: var(--sapObjectHeader_Title_SnappedFontSize);
        }

        .page-section {
            padding: 1rem 0 2rem 0;
        }

        .page-section [ui5-title] {
            display: block;
            margin-bottom: 1rem;
        }

        /* Give the last section room to scroll fully up under the sticky tab band. */
        .page-section:last-of-type {
            min-height: 100%;
        }

        .overview-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .overview-card {
            flex: 1 1 180px;
            background: var(--sapBaseColor);
            border: 1px solid var(--sapGroup_TitleBorderColor);
            border-radius: 0.5rem;
            padding: 1rem;
        }

        .overview-card ui5-label {
            display: block;
            margin-bottom: 0.25rem;
        }

        .overview-card .value {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--sapTextColor);
            font-family: var(--sapFontFamily);
        }

        .overview-card .value.positive {
            color: var(--sapPositiveTextColor);
        }

        .spec-table {
            width: 100%;
            border-collapse: collapse;
            font-family: var(--sapFontFamily);
            font-size: var(--sapFontSize);
        }

        .spec-table tr {
            border-bottom: 1px solid var(--sapGroup_TitleBorderColor);
        }

        .spec-table td {
            padding: 0.75rem 0.5rem;
            vertical-align: top;
        }

        .spec-table td:first-child {
            color: var(--sapContent_LabelColor);
            width: 40%;
            font-weight: 600;
        }

        .spec-table td:last-child {
            color: var(--sapTextColor);
        }
      `}</style>
      <div style={{ height: "580px" }}>
        <DynamicPage ref={pageRef}>
          <DynamicPageTitle slot="titleArea">
            <Breadcrumbs slot="breadcrumbs">
              <BreadcrumbsItem href="#">Products</BreadcrumbsItem>
              <BreadcrumbsItem href="#">Laptops</BreadcrumbsItem>
            </Breadcrumbs>

            <Title slot="heading">Astro Laptop 1516</Title>

            <div slot="snappedHeading" className="snapped-title-heading">
              <Title wrappingType="None">Astro Laptop 1516</Title>
            </div>

            <p slot="subheading" className="text">
              HT-1251
            </p>
            <p slot="snappedSubheading" className="text">
              HT-1251
            </p>

            <Toolbar slot="actionsBar" design="Transparent">
              <ToolbarButton text="Edit" />
              <ToolbarButton design="Transparent" text="Share" />
            </Toolbar>
          </DynamicPageTitle>

          <DynamicPageHeader slot="headerArea">
            <div className="product-info">
              <div className="product-info-cell">
                <Label>Availability</Label>
                <p className="text availability">In Stock</p>
              </div>
              <div className="product-info-cell">
                <Label>Price</Label>
                <p className="text">947.00 EUR</p>
              </div>
              <div className="product-info-cell">
                <Label>Category</Label>
                <p className="text">Laptops</p>
              </div>
            </div>
          </DynamicPageHeader>

          {/* "Specifications" is a parent tab with sub-tabs that scroll to its subsections. */}
          <TabContainer
            slot="stickySubheaderArea"
            tabLayout="Standard"
            collapsed
            onTabSelect={e => scrollToSection(e.detail.tab.dataset.section)}
          >
            <Tab text="Overview" data-section="overview" selected={activeSection === "overview"} />
            <Tab text="Specifications" data-section="specifications" selected={specActive}>
              <Tab slot="items" text="Hardware" data-section="spec-hardware" selected={activeSection === "spec-hardware"} />
              <Tab slot="items" text="Connectivity" data-section="spec-connectivity" selected={activeSection === "spec-connectivity"} />
            </Tab>
            <Tab text="Related Items" data-section="related" selected={activeSection === "related"} />
          </TabContainer>

          <section id="overview" className="page-section">
            <Title level="H3" size="H5">Overview</Title>
            <div className="overview-grid">
              <div className="overview-card">
                <Label>Stock</Label>
                <div className="value positive">In Stock</div>
              </div>
              <div className="overview-card">
                <Label>Price</Label>
                <div className="value">947.00 EUR</div>
              </div>
              <div className="overview-card">
                <Label>Units Sold</Label>
                <div className="value">12,430</div>
              </div>
              <div className="overview-card">
                <Label>Rating</Label>
                <div className="value">4.3 / 5</div>
              </div>
            </div>
          </section>

          <section id="spec-hardware" className="page-section">
            <Title level="H3" size="H5">Specifications — Hardware</Title>
            <table className="spec-table">
              <tbody>
                <tr><td>Processor</td><td>Intel Core i7-1355U, 10 cores, up to 5.0 GHz</td></tr>
                <tr><td>Memory</td><td>16 GB DDR5 RAM (upgradeable to 64 GB)</td></tr>
                <tr><td>Storage</td><td>512 GB NVMe SSD (PCIe Gen 4)</td></tr>
                <tr><td>Display</td><td>15.6" FHD IPS, 1920×1080, 300 nits, anti-glare</td></tr>
                <tr><td>Battery</td><td>72 Wh, up to 10 hours</td></tr>
                <tr><td>Weight</td><td>1.85 kg</td></tr>
              </tbody>
            </table>
          </section>

          <section id="spec-connectivity" className="page-section">
            <Title level="H3" size="H5">Specifications — Connectivity</Title>
            <table className="spec-table">
              <tbody>
                <tr><td>Wireless</td><td>Wi-Fi 6E, Bluetooth 5.3</td></tr>
                <tr><td>USB</td><td>2× USB-C (Thunderbolt 4), 2× USB-A</td></tr>
                <tr><td>Video</td><td>HDMI 2.0</td></tr>
                <tr><td>Operating System</td><td>Windows 11 Home</td></tr>
                <tr><td>Model Number</td><td>HT-1251</td></tr>
              </tbody>
            </table>
          </section>

          <section id="related" className="page-section">
            <Title level="H3" size="H5">Related Items</Title>
            <List headerText="Related Products (12)" selectionMode="Single">
              {relatedProducts.map((product, index) => (
                <ListItemStandard
                  key={index}
                  description={product.description}
                  icon="slim-arrow-right"
                  iconEnd={true}
                  additionalText={product.price}
                >
                  {product.text}
                </ListItemStandard>
              ))}
            </List>
          </section>
        </DynamicPage>
      </div>
    </>
  );
}

export default App;
