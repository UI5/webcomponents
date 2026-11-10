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

function App() {
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

          <TabContainer slot="stickySubheaderArea" tabLayout="Standard" collapsed>
            <Tab text="Overview" selected={true} />
            <Tab text="Specifications" />
            <Tab text="Reviews" />
            <Tab text="Related Items" />
          </TabContainer>

          <List headerText="Related Products (6)" selectionMode="Single">
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="47.00 EUR">
              10 inch Portable DVD
            </ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="249.00 EUR">
              7 inch Widescreen Portable DVD Player w MP3
            </ListItemStandard>
            <ListItemStandard description="HT-1251" icon="slim-arrow-right" iconEnd={true} additionalText="947.00 EUR">
              Astro Laptop 1516
            </ListItemStandard>
            <ListItemStandard description="HT-1251" icon="slim-arrow-right" iconEnd={true} additionalText="647.00 EUR">
              Astro Phone 6
            </ListItemStandard>
            <ListItemStandard description="HT-1252" icon="slim-arrow-right" iconEnd={true} additionalText="27.99 EUR">
              Audio/Video Cable Kit - 4m
            </ListItemStandard>
            <ListItemStandard description="HT-6001" icon="slim-arrow-right" iconEnd={true} additionalText="447.90 EUR">
              Beam Breaker B-1
            </ListItemStandard>
            <ListItemStandard description="HT-6001" icon="slim-arrow-right" iconEnd={true} additionalText="647.50 EUR">
              Beam Breaker B-2
            </ListItemStandard>
            <ListItemStandard description="HT-6001" icon="slim-arrow-right" iconEnd={true} additionalText="847.80 EUR">
              Beam Breaker B-3
            </ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="1,250.00 EUR">
              Beam Breaker B-4
            </ListItemStandard>
            <ListItemStandard description="HT-8001" icon="slim-arrow-right" iconEnd={true} additionalText="1,288.00 EUR">
              Camcorder View
            </ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="996.00 EUR">
              Benda Laptop 1408
            </ListItemStandard>
            <ListItemStandard description="HT-0003" icon="slim-arrow-right" iconEnd={true} additionalText="147.00 EUR">
              Cepat Tablet 10.5
            </ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="47.00 EUR">
              10 inch Portable DVD
            </ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="249.00 EUR">
              7 inch Widescreen Portable DVD Player w MP3
            </ListItemStandard>
            <ListItemStandard description="HT-1251" icon="slim-arrow-right" iconEnd={true} additionalText="947.00 EUR">
              Astro Laptop 1516
            </ListItemStandard>
            <ListItemStandard description="HT-1251" icon="slim-arrow-right" iconEnd={true} additionalText="647.00 EUR">
              Astro Phone 6
            </ListItemStandard>
            <ListItemStandard description="HT-1252" icon="slim-arrow-right" iconEnd={true} additionalText="27.99 EUR">
              Audio/Video Cable Kit - 4m
            </ListItemStandard>
            <ListItemStandard description="HT-6001" icon="slim-arrow-right" iconEnd={true} additionalText="447.90 EUR">
              Beam Breaker B-1
            </ListItemStandard>
            <ListItemStandard description="HT-6001" icon="slim-arrow-right" iconEnd={true} additionalText="647.50 EUR">
              Beam Breaker B-2
            </ListItemStandard>
            <ListItemStandard description="HT-6001" icon="slim-arrow-right" iconEnd={true} additionalText="847.80 EUR">
              Beam Breaker B-3
            </ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="1,250.00 EUR">
              Beam Breaker B-4
            </ListItemStandard>
            <ListItemStandard description="HT-8001" icon="slim-arrow-right" iconEnd={true} additionalText="1,288.00 EUR">
              Camcorder View
            </ListItemStandard>
            <ListItemStandard description="HT-2001" icon="slim-arrow-right" iconEnd={true} additionalText="996.00 EUR">
              Benda Laptop 1408
            </ListItemStandard>
            <ListItemStandard description="HT-0003" icon="slim-arrow-right" iconEnd={true} additionalText="147.00 EUR">
              Cepat Tablet 10.5
            </ListItemStandard>
            <ListItemStandard description="HT-1001" icon="slim-arrow-right" iconEnd={true} additionalText="87.90 EUR">
              Gladiator MX
            </ListItemStandard>
          </List>
        </DynamicPage>
      </div>
    </>
  );
}

export default App;
