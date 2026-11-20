import { useState } from "react";
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
  const [selectedTab, setSelectedTab] = useState(0);

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

        .tab-content {
            padding: 1rem 0;
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
        <DynamicPage>
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

          <TabContainer
            slot="stickySubheaderArea"
            tabLayout="Standard"
            collapsed
            onTabSelect={e => setSelectedTab(e.detail.tabIndex)}
          >
            <Tab text="Overview" selected={selectedTab === 0} />
            <Tab text="Specifications" selected={selectedTab === 1} />
            <Tab text="Related Items" selected={selectedTab === 2} />
          </TabContainer>

          {selectedTab === 0 && (
            <div className="tab-content">
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
            </div>
          )}

          {selectedTab === 1 && (
            <div className="tab-content">
              <table className="spec-table">
                <tbody>
                  <tr><td>Processor</td><td>Intel Core i7-1355U, 10 cores, up to 5.0 GHz</td></tr>
                  <tr><td>Memory</td><td>16 GB DDR5 RAM (upgradeable to 64 GB)</td></tr>
                  <tr><td>Storage</td><td>512 GB NVMe SSD (PCIe Gen 4)</td></tr>
                  <tr><td>Display</td><td>15.6" FHD IPS, 1920×1080, 300 nits, anti-glare</td></tr>
                  <tr><td>Battery</td><td>72 Wh, up to 10 hours</td></tr>
                  <tr><td>Operating System</td><td>Windows 11 Home</td></tr>
                  <tr><td>Weight</td><td>1.85 kg</td></tr>
                  <tr><td>Model Number</td><td>HT-1251</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === 2 && (
            <div className="tab-content">
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
            </div>
          )}
        </DynamicPage>
      </div>
    </>
  );
}

export default App;
