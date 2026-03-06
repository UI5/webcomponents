import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useState } from "react";
import DynamicPageClass from "@ui5/webcomponents-fiori/dist/DynamicPage.js";
import DynamicPageHeaderClass from "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js";
import DynamicPageTitleClass from "@ui5/webcomponents-fiori/dist/DynamicPageTitle.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import BreadcrumbsClass from "@ui5/webcomponents/dist/Breadcrumbs.js";
import BreadcrumbsItemClass from "@ui5/webcomponents/dist/BreadcrumbsItem.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/share.js";
import "@ui5/webcomponents-icons/dist/laptop.js";

const DynamicPage = createComponent(DynamicPageClass);
const DynamicPageHeader = createComponent(DynamicPageHeaderClass);
const DynamicPageTitle = createComponent(DynamicPageTitleClass);
const Avatar = createComponent(AvatarClass);
const Bar = createComponent(BarClass);
const Breadcrumbs = createComponent(BreadcrumbsClass);
const BreadcrumbsItem = createComponent(BreadcrumbsItemClass);
const Button = createComponent(ButtonClass);
const Label = createComponent(LabelClass);
const List = createComponent(ListClass);
const ListItemStandard = createComponent(ListItemStandardClass);
const Tag = createComponent(TagClass);
const Title = createComponent(TitleClass);
const Toolbar = createComponent(ToolbarClass);
const ToolbarButton = createComponent(ToolbarButtonClass);

function App() {
  const [showFooter, setShowFooter] = useState(true);

  const handleEditButtonClick = () => {
    setShowFooter(true);
  };

  const handleFooterButtonClick = () => {
    setShowFooter(false);
  };

  return (
    <>
      <style>{`
        .text {
            display: inline-block;
            font-size: var(--sapFontSize);
            font-family: var(--sapFontFamily);
            color: var(--sapTextColor);
            line-height: normal;
            white-space: pre-line;
            word-wrap: break-word;
            cursor: text;
            margin: 0;
        }

        .text:nth-of-type(2) {
            margin-left: 4rem;
        }

        .product-info {
            display: flex;
            flex-wrap: wrap;
        }

        .product-info [ui5-avatar],
        .product-info .product-info-cell {
            margin-right: 2rem;
            margin-bottom: 1rem;
        }

        .product-info-cell {
            display: flex;
            gap: 5px;
            flex-direction: column;
        }

        .product-description {
            display: inline;
            max-width: 300px;
        }

        .availability {
           font-size: 1.2rem;
           color: var(--sapPositiveTextColor);
        }

        .price {
            font-size: 1.2rem;
            color: var(--sapTextColor);
        }

        .actionsBar {
            padding: 0.8rem 0 0 1rem;
        }

        .navigationBar{
            padding: 0.8rem 0 0 0;
        }

        .snapped-title-heading {
            display: flex;
            align-items: center;
            position: relative;
        }
        .snapped-title-heading [ui5-avatar] {
            position: absolute;
            top: 0;
        }
        .snapped-title-heading [ui5-title] {
            font-family: var(--sapObjectHeader_Title_FontFamily);
            color: var(--sapObjectHeader_Title_TextColor);
            padding: 0.3125rem 0 0 0;
            font-size: var(--sapObjectHeader_Title_SnappedFontSize);
            text-overflow: ellipsis;
            min-width: 0;
            margin-left: 4rem;
        }
      `}</style>
      <DynamicPage id="page" showFooter={showFooter}>
        <DynamicPageTitle slot="titleArea">
          <Breadcrumbs slot="breadcrumbs">
            <BreadcrumbsItem href="#">Man</BreadcrumbsItem>
            <BreadcrumbsItem href="#">Shoes</BreadcrumbsItem>
            <BreadcrumbsItem href="#">Running Shoes</BreadcrumbsItem>
          </Breadcrumbs>

          <Title slot="heading">Special Running Shoe</Title>

          <div slot="snappedHeading" className="snapped-title-heading">
            <Avatar
              shape="square"
              icon="laptop"
              colorScheme="Accent5"
              size="S"
            />
            <Title wrappingType="None">Special Running Shoe</Title>
          </div>

          <p slot="subheading" className="text">
            PO-48865
          </p>
          <p slot="snappedSubheading" className="text">
            PO-48865
          </p>

          <Tag colorScheme="7" wrappingType="None">
            Special 157.4M EUR
          </Tag>

          <Toolbar
            class="actionsBar"
            id="actionsToolbar"
            slot="actionsBar"
            design="Transparent"
          >
            <ToolbarButton text="Create" />
            <ToolbarButton
              id="edit-button"
              design="Transparent"
              text="Edit"
              onClick={handleEditButtonClick}
            />
            <ToolbarButton design="Transparent" text="Paste" />
          </Toolbar>

          <Toolbar
            class="navigationBar"
            slot="navigationBar"
            design="Transparent"
          >
            <ToolbarButton design="Transparent" icon="share" />
            <ToolbarButton design="Transparent" icon="action-settings" />
          </Toolbar>
        </DynamicPageTitle>

        <DynamicPageHeader slot="headerArea">
          <div className="product-info">
            <Avatar
              id="avatar"
              shape="square"
              icon="laptop"
              colorScheme="Accent5"
              size="L"
            />
            <div className="product-info-cell">
              <Label>Availability</Label>
              <p className="text availability">In Stock</p>
            </div>
            <div className="product-info-cell">
              <Label>Price</Label>
              <p className="text price">379.99 USD</p>
            </div>
            <div className="product-info-cell">
              <Label>Product Description</Label>
              <p className="text product-description">
                Super-lightweight cushioning propels you forward from landing to
                toe-off and has a fast, snappy feel.
              </p>
            </div>
          </div>
        </DynamicPageHeader>

        <List headerText="Products (13)" mode="SingleSelect">
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="47.00 EUR"
          >
            10 inch Portable DVD
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="249.00 EUR"
          >
            7 inch WidescreenPortable DVD Player w MP3
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="947.00 EUR"
          >
            Astro Laptop 1516
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.00 EUR"
          >
            Astro Phone 6
          </ListItemStandard>
          <ListItemStandard
            description="HT-1252"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="27.99 EUR"
          >
            Audio/Video Cable Kit - 4m
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="447.90 EUR"
          >
            Beam Breaker B-1
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.50 EUR"
          >
            Beam Breaker B-2
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="847.80 EUR"
          >
            Beam Breaker B-3
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,250.00 EUR"
          >
            Beam Breaker B-4
          </ListItemStandard>
          <ListItemStandard
            description="HT-8001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,288.00 EUR"
          >
            Camcorder View
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="996.00 EUR"
          >
            Benda Laptop 1408
          </ListItemStandard>
          <ListItemStandard
            description="HT-0003"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="147.00 EUR"
          >
            Cepat Tablet 10.5
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="47.00 EUR"
          >
            10 inch Portable DVD
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="249.00 EUR"
          >
            7 inch WidescreenPortable DVD Player w MP3
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="947.00 EUR"
          >
            Astro Laptop 1516
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.00 EUR"
          >
            Astro Phone 6
          </ListItemStandard>
          <ListItemStandard
            description="HT-1252"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="27.99 EUR"
          >
            Audio/Video Cable Kit - 4m
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="447.90 EUR"
          >
            Beam Breaker B-1
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.50 EUR"
          >
            Beam Breaker B-2
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="847.80 EUR"
          >
            Beam Breaker B-3
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,250.00 EUR"
          >
            Beam Breaker B-4
          </ListItemStandard>
          <ListItemStandard
            description="HT-8001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,288.00 EUR"
          >
            Camcorder View
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="996.00 EUR"
          >
            Benda Laptop 1408
          </ListItemStandard>
          <ListItemStandard
            description="HT-0003"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="147.00 EUR"
          >
            Cepat Tablet 10.5
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="47.00 EUR"
          >
            10 inch Portable DVD
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="249.00 EUR"
          >
            7 inch WidescreenPortable DVD Player w MP3
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="947.00 EUR"
          >
            Astro Laptop 1516
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.00 EUR"
          >
            Astro Phone 6
          </ListItemStandard>
          <ListItemStandard
            description="HT-1252"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="27.99 EUR"
          >
            Audio/Video Cable Kit - 4m
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="447.90 EUR"
          >
            Beam Breaker B-1
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.50 EUR"
          >
            Beam Breaker B-2
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="847.80 EUR"
          >
            Beam Breaker B-3
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,250.00 EUR"
          >
            Beam Breaker B-4
          </ListItemStandard>
          <ListItemStandard
            description="HT-8001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,288.00 EUR"
          >
            Camcorder View
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="996.00 EUR"
          >
            Benda Laptop 1408
          </ListItemStandard>
          <ListItemStandard
            description="HT-0003"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="147.00 EUR"
          >
            Cepat Tablet 10.5
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="47.00 EUR"
          >
            10 inch Portable DVD
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="249.00 EUR"
          >
            7 inch WidescreenPortable DVD Player w MP3
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="947.00 EUR"
          >
            Astro Laptop 1516
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.00 EUR"
          >
            Astro Phone 6
          </ListItemStandard>
          <ListItemStandard
            description="HT-1252"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="27.99 EUR"
          >
            Audio/Video Cable Kit - 4m
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="447.90 EUR"
          >
            Beam Breaker B-1
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.50 EUR"
          >
            Beam Breaker B-2
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="847.80 EUR"
          >
            Beam Breaker B-3
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,250.00 EUR"
          >
            Beam Breaker B-4
          </ListItemStandard>
          <ListItemStandard
            description="HT-8001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,288.00 EUR"
          >
            Camcorder View
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="996.00 EUR"
          >
            Benda Laptop 1408
          </ListItemStandard>
          <ListItemStandard
            description="HT-0003"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="147.00 EUR"
          >
            Cepat Tablet 10.5
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="47.00 EUR"
          >
            10 inch Portable DVD
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="249.00 EUR"
          >
            7 inch WidescreenPortable DVD Player w MP3
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="947.00 EUR"
          >
            Astro Laptop 1516
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.00 EUR"
          >
            Astro Phone 6
          </ListItemStandard>
          <ListItemStandard
            description="HT-1252"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="27.99 EUR"
          >
            Audio/Video Cable Kit - 4m
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="447.90 EUR"
          >
            Beam Breaker B-1
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.50 EUR"
          >
            Beam Breaker B-2
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="847.80 EUR"
          >
            Beam Breaker B-3
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,250.00 EUR"
          >
            Beam Breaker B-4
          </ListItemStandard>
          <ListItemStandard
            description="HT-8001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,288.00 EUR"
          >
            Camcorder View
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="996.00 EUR"
          >
            Benda Laptop 1408
          </ListItemStandard>
          <ListItemStandard
            description="HT-0003"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="147.00 EUR"
          >
            Cepat Tablet 10.5
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="47.00 EUR"
          >
            10 inch Portable DVD
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="249.00 EUR"
          >
            7 inch WidescreenPortable DVD Player w MP3
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="947.00 EUR"
          >
            Astro Laptop 1516
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.00 EUR"
          >
            Astro Phone 6
          </ListItemStandard>
          <ListItemStandard
            description="HT-1252"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="27.99 EUR"
          >
            Audio/Video Cable Kit - 4m
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="447.90 EUR"
          >
            Beam Breaker B-1
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.50 EUR"
          >
            Beam Breaker B-2
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="847.80 EUR"
          >
            Beam Breaker B-3
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,250.00 EUR"
          >
            Beam Breaker B-4
          </ListItemStandard>
          <ListItemStandard
            description="HT-8001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,288.00 EUR"
          >
            Camcorder View
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="996.00 EUR"
          >
            Benda Laptop 1408
          </ListItemStandard>
          <ListItemStandard
            description="HT-0003"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="147.00 EUR"
          >
            Cepat Tablet 10.5
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="47.00 EUR"
          >
            10 inch Portable DVD
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="249.00 EUR"
          >
            7 inch WidescreenPortable DVD Player w MP3
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="947.00 EUR"
          >
            Astro Laptop 1516
          </ListItemStandard>
          <ListItemStandard
            description="HT-1251"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.00 EUR"
          >
            Astro Phone 6
          </ListItemStandard>
          <ListItemStandard
            description="HT-1252"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="27.99 EUR"
          >
            Audio/Video Cable Kit - 4m
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="447.90 EUR"
          >
            Beam Breaker B-1
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="647.50 EUR"
          >
            Beam Breaker B-2
          </ListItemStandard>
          <ListItemStandard
            description="HT-6001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="847.80 EUR"
          >
            Beam Breaker B-3
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,250.00 EUR"
          >
            Beam Breaker B-4
          </ListItemStandard>
          <ListItemStandard
            description="HT-8001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="1,288.00 EUR"
          >
            Camcorder View
          </ListItemStandard>
          <ListItemStandard
            description="HT-2001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="996.00 EUR"
          >
            Benda Laptop 1408
          </ListItemStandard>
          <ListItemStandard
            description="HT-0003"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="147.00 EUR"
          >
            Cepat Tablet 10.5
          </ListItemStandard>
          <ListItemStandard
            description="HT-1001"
            icon="slim-arrow-right"
            iconEnd={true}
            additionalText="87.90 EUR"
          >
            Gladiator MX
          </ListItemStandard>
        </List>

        <Bar slot="footerArea" design="FloatingFooter">
          <Button
            id="save-edit"
            slot="endContent"
            design="Emphasized"
            onClick={handleFooterButtonClick}
          >
            Save
          </Button>
          <Button
            id="cancel-edit"
            slot="endContent"
            onClick={handleFooterButtonClick}
          >
            Close
          </Button>
        </Bar>
      </DynamicPage>
    </>
  );
}

export default App;
