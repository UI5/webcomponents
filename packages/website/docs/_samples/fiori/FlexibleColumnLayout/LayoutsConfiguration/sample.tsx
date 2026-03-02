import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);

function App() {

  const handleLayoutConfigurationChange = () => {
    displayCustomLayoutConfigurationInfo();
  };

  const handleLayoutChange = (e) => {
    selectLayout.value = e.detail.layout;
  };

  const handleUi5Change = (e) => {
    fcl.layout = e.detail.selectedOption.textContent;
    displayCustomLayoutConfigurationInfo();
  };

  const handleUi5ItemClick = (e) => {
    const category = e.detail.item.dataset.category;
    const categoryName = e.detail.item.textContent;
    
    // Update middle column
    categoryTitle.textContent = categoryName;
    productsList.innerHTML = "";
    
    // Populate products list
    categoryData[category].forEach(product => {
        const li = document.createElement("ui5-li");
        li.textContent = product.name;
        li.dataset.productId = product.id;
        li.dataset.category = category;
        li.setAttribute("icon", "slim-arrow-right");
        li.setAttribute("icon-end", "");
        productsList.appendChild(li);
  };

  const handleUi5ItemClick = (e) => {
    const productId = e.detail.item.dataset.productId;
    const category = e.detail.item.dataset.category;
    
    // Find product data
    const product = categoryData[category].find(p => p.id === productId);
    
    if (product) {
        // Update end column
        productTitle.textContent = product.name;
        
        // Clear existing content and add new content from template
        productDetails.innerHTML = "";
        const productDetailsContent = createProductDetailsFromTemplate(product, category);
        productDetails.appendChild(productDetailsContent);
        
        // Navigate to three column layout
        fcl.layout = "ThreeColumnsMidExpanded";
        selectLayout.value = "ThreeColumnsMidExpanded";
        displayCustomLayoutConfigurationInfo();
  };

  const handleClick = () => {
    // Clear product details
    clearProductDetails();
    productTitle.textContent = "Product Details";
    
    // Navigate back to two column layout
    fcl.layout = "TwoColumnsMidExpanded";
    selectLayout.value = "TwoColumnsMidExpanded";
    displayCustomLayoutConfigurationInfo();
  };

  return (
    <>
      <div className="layout-grid">
            <Label show-colon={true}>Current layout</Label>
            <Select id="selectLayout">
    			<Option>OneColumn</Option>
                <Option>TwoColumnsStartExpanded</Option>
                <Option>TwoColumnsMidExpanded</Option>
                <Option>ThreeColumnsMidExpanded</Option>
                <Option>ThreeColumnsEndExpanded</Option>
                <Option>ThreeColumnsStartExpandedEndHidden</Option>
                <Option>ThreeColumnsMidExpandedEndHidden</Option>
            </Select>
            <Label show-colon={true}>Custom configuration for current layout</Label>
            <Text id="configurationInfo" className="configurationInfo">none</Text>
        </div>
        <ui5-flexible-column-layout id="fcl" className="fcl">
            <div className="col" slot="startColumn">
                <div className="colHeader">
                    <Title>Categories</Title>
                </div>
                <List id="categoriesList">
                    <ListItemStandard data-category="electronics" icon="slim-arrow-right" icon-end={true}>Electronics</ListItemStandard>
                    <ListItemStandard data-category="clothing" icon="slim-arrow-right" icon-end={true}>Clothing</ListItemStandard>
                    <ListItemStandard data-category="books" icon="slim-arrow-right" icon-end={true}>Books</ListItemStandard>
                    <ListItemStandard data-category="home" icon="slim-arrow-right" icon-end={true}>Home & Garden</ListItemStandard>
                    <ListItemStandard data-category="sports" icon="slim-arrow-right" icon-end={true}>Sports</ListItemStandard>
                </List>
            </div>
            <div className="col" slot="midColumn">
                <div className="colHeader">
                    <Title id="categoryTitle">Select a category</Title>
                </div>
                <List style={{ display: "none" }} id="productsList" />
            </div>
            <div className="col" slot="endColumn">
                <div className="colHeader">
                    <Title id="productTitle">Product Details</Title>
                    <div className="colSubHeader">
                        <Button id="closeEndColumn" icon="decline" design="Transparent" />
                    </div>
                </div>
                <div id="productDetails" className="product-details">
                    <Text>Select a product to view details</Text>
                </div>
            </div>
        </ui5-flexible-column-layout>

        <!-- Template for product details -->
        <template id="productDetailsTemplate">
            <div className="product-info">
                <Title level="H3" id="productName" />
                <Text id="productDescription" />
                <br /><br />
                <Label show-colon={true}>Category</Label>
                <Text id="productCategory" />
                <br /><br />
                <Label show-colon={true}>Product ID</Label>
                <Text id="productId" />
            </div>
        </template>
    </>
  );
}

export default App;
