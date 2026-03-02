import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import DynamicPageClass from "@ui5/webcomponents-fiori/dist/DynamicPage.js";
import DynamicPageHeaderClass from "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js";
import DynamicPageTitleClass from "@ui5/webcomponents-fiori/dist/DynamicPageTitle.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
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

const Bar = createReactComponent(BarClass);
const DynamicPage = createReactComponent(DynamicPageClass);
const DynamicPageHeader = createReactComponent(DynamicPageHeaderClass);
const DynamicPageTitle = createReactComponent(DynamicPageTitleClass);
const Avatar = createReactComponent(AvatarClass);
const Breadcrumbs = createReactComponent(BreadcrumbsClass);
const BreadcrumbsItem = createReactComponent(BreadcrumbsItemClass);
const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const Tag = createReactComponent(TagClass);
const Title = createReactComponent(TitleClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

function App() {

  const handleClick = () => {
    dynamicPage.setAttribute("show-footer", true);
  };

  const handleClick = () => {
    dynamicPage.removeAttribute("show-footer");
  };

  return (
    <>
      <DynamicPage id="page" show-footer={true}>

            <DynamicPageTitle slot="titleArea">
                <Breadcrumbs slot="breadcrumbs">
                    <BreadcrumbsItem href="#">Man</BreadcrumbsItem>
                    <BreadcrumbsItem href="#">Shoes</BreadcrumbsItem>
                    <BreadcrumbsItem href="#">Running Shoes</BreadcrumbsItem>
                </Breadcrumbs>

                <Title slot="heading">Special Running Shoe</Title>

                <div slot="snappedHeading" className="snapped-title-heading">
                    <Avatar shape="square" icon="laptop" color-scheme="Accent5" size="S" />
                    <Title wrapping-type="None">Special Running Shoe</Title>
                </div>

                <p slot="subheading" className="text">PO-48865</p>
                <p slot="snappedSubheading" className="text">PO-48865</p>

                <Tag color-scheme={7} wrapping-type="None">Special 157.4M EUR</Tag>

                <Toolbar className="actionsBar" id="actionsToolbar" slot="actionsBar" design="Transparent">
                    <ToolbarButton text="Create" />
                    <ToolbarButton id="edit-button" design="Transparent" text="Edit" />
                    <ToolbarButton design="Transparent" text="Paste" />
                </Toolbar>

                <Toolbar className="navigationBar" slot="navigationBar" design="Transparent">
                    <ToolbarButton design="Transparent" icon="share" />
                    <ToolbarButton design="Transparent" icon="action-settings" />
                </Toolbar>
            </DynamicPageTitle>

            <DynamicPageHeader slot="headerArea">
                <div className="product-info">
                    <Avatar id="avatar" shape="square" icon="laptop" color-scheme="Accent5" size="L" />
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
                        <p className="text product-description">Super-lightweight cushioning propels you forward from landing to toe-off and has a fast, snappy feel.</p>
                    </div>
                </div>
            </DynamicPageHeader>

            <List header-text="Products (13)" mode="SingleSelect">
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="47.00 EUR">10 inch Portable DVD</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="249.00 EUR">7 inch WidescreenPortable DVD Player w MP3</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="947.00 EUR">Astro Laptop 1516</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="647.00 EUR">Astro Phone 6</ListItemStandard>
                <ListItemStandard description="HT-1252" icon="slim-arrow-right" icon-end={true} additional-text="27.99 EUR">Audio/Video Cable Kit - 4m</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="447.90 EUR">Beam Breaker B-1</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="647.50 EUR">Beam Breaker B-2</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="847.80 EUR">Beam Breaker B-3</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="1,250.00 EUR">Beam Breaker B-4</ListItemStandard>
                <ListItemStandard description="HT-8001" icon="slim-arrow-right" icon-end={true} additional-text="1,288.00 EUR">Camcorder View</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="996.00 EUR">Benda Laptop 1408</ListItemStandard>
                <ListItemStandard description="HT-0003" icon="slim-arrow-right" icon-end={true} additional-text="147.00 EUR">Cepat Tablet 10.5</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="47.00 EUR">10 inch Portable DVD</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="249.00 EUR">7 inch WidescreenPortable DVD Player w MP3</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="947.00 EUR">Astro Laptop 1516</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="647.00 EUR">Astro Phone 6</ListItemStandard>
                <ListItemStandard description="HT-1252" icon="slim-arrow-right" icon-end={true} additional-text="27.99 EUR">Audio/Video Cable Kit - 4m</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="447.90 EUR">Beam Breaker B-1</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="647.50 EUR">Beam Breaker B-2</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="847.80 EUR">Beam Breaker B-3</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="1,250.00 EUR">Beam Breaker B-4</ListItemStandard>
                <ListItemStandard description="HT-8001" icon="slim-arrow-right" icon-end={true} additional-text="1,288.00 EUR">Camcorder View</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="996.00 EUR">Benda Laptop 1408</ListItemStandard>
                <ListItemStandard description="HT-0003" icon="slim-arrow-right" icon-end={true} additional-text="147.00 EUR">Cepat Tablet 10.5</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="47.00 EUR">10 inch Portable DVD</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="249.00 EUR">7 inch WidescreenPortable DVD Player w MP3</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="947.00 EUR">Astro Laptop 1516</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="647.00 EUR">Astro Phone 6</ListItemStandard>
                <ListItemStandard description="HT-1252" icon="slim-arrow-right" icon-end={true} additional-text="27.99 EUR">Audio/Video Cable Kit - 4m</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="447.90 EUR">Beam Breaker B-1</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="647.50 EUR">Beam Breaker B-2</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="847.80 EUR">Beam Breaker B-3</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="1,250.00 EUR">Beam Breaker B-4</ListItemStandard>
                <ListItemStandard description="HT-8001" icon="slim-arrow-right" icon-end={true} additional-text="1,288.00 EUR">Camcorder View</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="996.00 EUR">Benda Laptop 1408</ListItemStandard>
                <ListItemStandard description="HT-0003" icon="slim-arrow-right" icon-end={true} additional-text="147.00 EUR">Cepat Tablet 10.5</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="47.00 EUR">10 inch Portable DVD</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="249.00 EUR">7 inch WidescreenPortable DVD Player w MP3</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="947.00 EUR">Astro Laptop 1516</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="647.00 EUR">Astro Phone 6</ListItemStandard>
                <ListItemStandard description="HT-1252" icon="slim-arrow-right" icon-end={true} additional-text="27.99 EUR">Audio/Video Cable Kit - 4m</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="447.90 EUR">Beam Breaker B-1</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="647.50 EUR">Beam Breaker B-2</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="847.80 EUR">Beam Breaker B-3</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="1,250.00 EUR">Beam Breaker B-4</ListItemStandard>
                <ListItemStandard description="HT-8001" icon="slim-arrow-right" icon-end={true} additional-text="1,288.00 EUR">Camcorder View</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="996.00 EUR">Benda Laptop 1408</ListItemStandard>
                <ListItemStandard description="HT-0003" icon="slim-arrow-right" icon-end={true} additional-text="147.00 EUR">Cepat Tablet 10.5</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="47.00 EUR">10 inch Portable DVD</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="249.00 EUR">7 inch WidescreenPortable DVD Player w MP3</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="947.00 EUR">Astro Laptop 1516</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="647.00 EUR">Astro Phone 6</ListItemStandard>
                <ListItemStandard description="HT-1252" icon="slim-arrow-right" icon-end={true} additional-text="27.99 EUR">Audio/Video Cable Kit - 4m</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="447.90 EUR">Beam Breaker B-1</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="647.50 EUR">Beam Breaker B-2</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="847.80 EUR">Beam Breaker B-3</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="1,250.00 EUR">Beam Breaker B-4</ListItemStandard>
                <ListItemStandard description="HT-8001" icon="slim-arrow-right" icon-end={true} additional-text="1,288.00 EUR">Camcorder View</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="996.00 EUR">Benda Laptop 1408</ListItemStandard>
                <ListItemStandard description="HT-0003" icon="slim-arrow-right" icon-end={true} additional-text="147.00 EUR">Cepat Tablet 10.5</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="47.00 EUR">10 inch Portable DVD</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="249.00 EUR">7 inch WidescreenPortable DVD Player w MP3</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="947.00 EUR">Astro Laptop 1516</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="647.00 EUR">Astro Phone 6</ListItemStandard>
                <ListItemStandard description="HT-1252" icon="slim-arrow-right" icon-end={true} additional-text="27.99 EUR">Audio/Video Cable Kit - 4m</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="447.90 EUR">Beam Breaker B-1</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="647.50 EUR">Beam Breaker B-2</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="847.80 EUR">Beam Breaker B-3</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="1,250.00 EUR">Beam Breaker B-4</ListItemStandard>
                <ListItemStandard description="HT-8001" icon="slim-arrow-right" icon-end={true} additional-text="1,288.00 EUR">Camcorder View</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="996.00 EUR">Benda Laptop 1408</ListItemStandard>
                <ListItemStandard description="HT-0003" icon="slim-arrow-right" icon-end={true} additional-text="147.00 EUR">Cepat Tablet 10.5</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="47.00 EUR">10 inch Portable DVD</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="249.00 EUR">7 inch WidescreenPortable DVD Player w MP3</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="947.00 EUR">Astro Laptop 1516</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="647.00 EUR">Astro Phone 6</ListItemStandard>
                <ListItemStandard description="HT-1252" icon="slim-arrow-right" icon-end={true} additional-text="27.99 EUR">Audio/Video Cable Kit - 4m</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="447.90 EUR">Beam Breaker B-1</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="647.50 EUR">Beam Breaker B-2</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="847.80 EUR">Beam Breaker B-3</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="1,250.00 EUR">Beam Breaker B-4</ListItemStandard>
                <ListItemStandard description="HT-8001" icon="slim-arrow-right" icon-end={true} additional-text="1,288.00 EUR">Camcorder View</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="996.00 EUR">Benda Laptop 1408</ListItemStandard>
                <ListItemStandard description="HT-0003" icon="slim-arrow-right" icon-end={true} additional-text="147.00 EUR">Cepat Tablet 10.5</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="47.00 EUR">10 inch Portable DVD</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="249.00 EUR">7 inch WidescreenPortable DVD Player w MP3</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="947.00 EUR">Astro Laptop 1516</ListItemStandard>
                <ListItemStandard description="HT-1251" icon="slim-arrow-right" icon-end={true} additional-text="647.00 EUR">Astro Phone 6</ListItemStandard>
                <ListItemStandard description="HT-1252" icon="slim-arrow-right" icon-end={true} additional-text="27.99 EUR">Audio/Video Cable Kit - 4m</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="447.90 EUR">Beam Breaker B-1</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="647.50 EUR">Beam Breaker B-2</ListItemStandard>
                <ListItemStandard description="HT-6001" icon="slim-arrow-right" icon-end={true} additional-text="847.80 EUR">Beam Breaker B-3</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="1,250.00 EUR">Beam Breaker B-4</ListItemStandard>
                <ListItemStandard description="HT-8001" icon="slim-arrow-right" icon-end={true} additional-text="1,288.00 EUR">Camcorder View</ListItemStandard>
                <ListItemStandard description="HT-2001" icon="slim-arrow-right" icon-end={true} additional-text="996.00 EUR">Benda Laptop 1408</ListItemStandard>
                <ListItemStandard description="HT-0003" icon="slim-arrow-right" icon-end={true} additional-text="147.00 EUR">Cepat Tablet 10.5</ListItemStandard>
                <ListItemStandard description="HT-1001" icon="slim-arrow-right" icon-end={true} additional-text="87.90 EUR">Gladiator MX</ListItemStandard>
            </List>

            <Bar slot="footerArea" design="FloatingFooter">
                <Button id="save-edit" slot="endContent" design="Emphasized">Save</Button>
                <Button id="cancel-edit" slot="endContent">Close</Button>
            </Bar>
        </DynamicPage>
    </>
  );
}

export default App;
