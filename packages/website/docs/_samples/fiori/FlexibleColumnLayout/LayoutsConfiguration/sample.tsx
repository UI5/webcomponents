import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState, useRef, useEffect, useCallback } from "react";
import FlexibleColumnLayoutClass from "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import type FCLLayout from "@ui5/webcomponents-fiori/dist/types/FCLLayout.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

const FlexibleColumnLayout = createReactComponent(FlexibleColumnLayoutClass);
const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);

const categoryData = {
  electronics: [
    {
      id: "laptop",
      name: "Laptop",
      description:
        "High-performance laptop with 16GB RAM and SSD storage. Perfect for work and gaming.",
    },
    {
      id: "smartphone",
      name: "Smartphone",
      description:
        "Latest smartphone with advanced camera system and long battery life.",
    },
    {
      id: "tablet",
      name: "Tablet",
      description:
        "Lightweight tablet with high-resolution display, ideal for reading and media consumption.",
    },
  ],
  clothing: [
    {
      id: "jeans",
      name: "Jeans",
      description:
        "Premium denim jeans with comfortable fit and durable construction.",
    },
    {
      id: "shirt",
      name: "Shirt",
      description:
        "Cotton shirt with modern cut and breathable fabric, perfect for any occasion.",
    },
    {
      id: "jacket",
      name: "Jacket",
      description:
        "Stylish jacket with weather-resistant materials and multiple pockets.",
    },
  ],
  books: [
    {
      id: "novel",
      name: "Novel",
      description:
        "Bestselling fiction novel with compelling characters and engaging plot.",
    },
    {
      id: "cookbook",
      name: "Cookbook",
      description:
        "Collection of delicious recipes from around the world with step-by-step instructions.",
    },
    {
      id: "biography",
      name: "Biography",
      description:
        "Inspiring life story of a remarkable person who changed the world.",
    },
  ],
  home: [
    {
      id: "chair",
      name: "Chair",
      description:
        "Ergonomic office chair with lumbar support and adjustable height.",
    },
    {
      id: "lamp",
      name: "Lamp",
      description:
        "Modern LED lamp with adjustable brightness and energy-efficient design.",
    },
    {
      id: "plant",
      name: "Plant",
      description:
        "Low-maintenance indoor plant that purifies air and adds natural beauty.",
    },
  ],
  sports: [
    {
      id: "shoes",
      name: "Running Shoes",
      description:
        "Professional running shoes with advanced cushioning and lightweight design.",
    },
    {
      id: "ball",
      name: "Football",
      description:
        "Official size football with durable leather construction and excellent grip.",
    },
    {
      id: "racket",
      name: "Tennis Racket",
      description:
        "Professional tennis racket with carbon fiber frame and comfortable grip.",
    },
  ],
};

const layoutsConfiguration = {
  desktop: {
    TwoColumnsStartExpanded: { layout: ["80%", "20%", 0] },
    TwoColumnsMidExpanded: { layout: ["20%", "80%", 0] },
    ThreeColumnsMidExpanded: { layout: ["20%", "50%", "30%"] },
    ThreeColumnsEndExpanded: { layout: ["15%", "15%", "70%"] },
    ThreeColumnsStartExpandedEndHidden: { layout: ["70%", "30%", 0] },
    ThreeColumnsMidExpandedEndHidden: { layout: ["20%", "80%", 0] },
  },
  tablet: {
    TwoColumnsStartExpanded: { layout: ["60%", "40%", 0] },
    TwoColumnsMidExpanded: { layout: ["40%", "60%", 0] },
    ThreeColumnsMidExpanded: { layout: [0, "60%", "40%"] },
    ThreeColumnsEndExpanded: { layout: [0, "40%", "60%"] },
    ThreeColumnsStartExpandedEndHidden: { layout: ["60%", "40%", 0] },
    ThreeColumnsMidExpandedEndHidden: { layout: ["40%", "60%", 0] },
  },
};

function App() {
  const fclRef = useRef(null);
  const selectLayoutRef = useRef(null);

  const [currentLayout, setCurrentLayout] = useState<`${FCLLayout}`>("OneColumn");
  const [configInfo, setConfigInfo] = useState("none");
  const [categoryTitle, setCategoryTitle] = useState("Select a category");
  const [products, setProducts] = useState<
    { id: string; name: string; description: string }[]
  >([]);
  const [showProducts, setShowProducts] = useState(false);
  const [productTitle, setProductTitle] = useState("Product Details");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const displayCustomLayoutConfigurationInfo = useCallback(() => {
    const fcl = fclRef.current;
    if (!fcl) return;
    const configurationPerMedia = layoutsConfiguration[fcl.media];
    const layoutConfiguration = configurationPerMedia
      ? configurationPerMedia[fcl.layout]
      : undefined;
    if (layoutConfiguration) {
      setConfigInfo(`[${layoutConfiguration.layout.join(", ")}]`);
    } else {
      setConfigInfo("none");
    }
  }, []);

  useEffect(() => {
    const fcl = fclRef.current;
    if (fcl) {
      fcl.layoutsConfiguration = layoutsConfiguration;
    }
  }, []);

  const handleFclLayoutConfigurationChange = useCallback(() => {
    displayCustomLayoutConfigurationInfo();
  }, [displayCustomLayoutConfigurationInfo]);

  const handleFclLayoutChange = useCallback(
    (e: UI5CustomEvent<FlexibleColumnLayoutClass, "layout-change">) => {
      if (selectLayoutRef.current) {
        selectLayoutRef.current!.value = e.detail.layout;
      }
    },
    [],
  );

  const handleSelectLayoutUi5Change = useCallback(
    (e: UI5CustomEvent<SelectClass, "change">) => {
      const fcl = fclRef.current;
      if (fcl) {
        fcl.layout = e.detail.selectedOption.textContent;
        setCurrentLayout(e.detail.selectedOption.textContent);
        displayCustomLayoutConfigurationInfo();
      }
    },
    [displayCustomLayoutConfigurationInfo],
  );

  const handleCategoriesListUi5ItemClick = useCallback(
    (e: UI5CustomEvent<ListClass, "item-click">) => {
      const category = e.detail.item.dataset.category;
      const categoryName = e.detail.item.textContent;

      setCategoryTitle(categoryName);
      setProducts(categoryData[category] || []);
      setShowProducts(true);
      setSelectedProduct(null);
      setProductTitle("Product Details");

      const fcl = fclRef.current;
      if (fcl) {
        fcl.layout = "TwoColumnsMidExpanded";
        if (selectLayoutRef.current) {
          selectLayoutRef.current!.value = "TwoColumnsMidExpanded";
        }
        displayCustomLayoutConfigurationInfo();
      }
    },
    [displayCustomLayoutConfigurationInfo],
  );

  const handleProductsListUi5ItemClick = useCallback(
    (e: UI5CustomEvent<ListClass, "item-click">) => {
      const productId = e.detail.item.dataset.productId;
      const category = e.detail.item.dataset.category;

      const product = categoryData[category]?.find((p) => p.id === productId);

      if (product) {
        setProductTitle(product.name);
        setSelectedProduct(product);
        setSelectedCategory(category);

        const fcl = fclRef.current;
        if (fcl) {
          fcl.layout = "ThreeColumnsMidExpanded";
          if (selectLayoutRef.current) {
            selectLayoutRef.current!.value = "ThreeColumnsMidExpanded";
          }
          displayCustomLayoutConfigurationInfo();
        }
      }
    },
    [displayCustomLayoutConfigurationInfo],
  );

  const handleCloseEndColumnClick = useCallback(() => {
    setSelectedProduct(null);
    setProductTitle("Product Details");

    const fcl = fclRef.current;
    if (fcl) {
      fcl.layout = "TwoColumnsMidExpanded";
      if (selectLayoutRef.current) {
        selectLayoutRef.current!.value = "TwoColumnsMidExpanded";
      }
      displayCustomLayoutConfigurationInfo();
    }
  }, [displayCustomLayoutConfigurationInfo]);

  return (
    <>
      <style>{`
        .layout-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
            gap: 0.5rem 1rem;
            align-items: center;
            margin-bottom: 1rem;
        }

        .layout-grid ui5-label:first-child,
        .layout-grid ui5-label:nth-child(3) {
            text-align: right;
            justify-self: end;
        }

        .fcl {
            height: 600px;
        }

        .col {
            height: 100%;
        }

        .colHeader {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--sapList_BorderColor);
        }

        .colSubHeader {
            display: flex;
            gap: 0.5rem;
        }

        .configurationInfo {
            color: var(--sapInformativeColor);
        }

        .product-details {
            padding: 1rem;
        }

        .product-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .product-info ui5-label {
            font-weight: bold;
            margin-top: 0.5rem;
        }
      `}</style>
      <div className="layout-grid">
        <Label showColon={true}>Current layout</Label>
        <Select
          ref={selectLayoutRef}
          id="selectLayout"
          onChange={handleSelectLayoutUi5Change}
        >
          <Option>OneColumn</Option>
          <Option>TwoColumnsStartExpanded</Option>
          <Option>TwoColumnsMidExpanded</Option>
          <Option>ThreeColumnsMidExpanded</Option>
          <Option>ThreeColumnsEndExpanded</Option>
          <Option>ThreeColumnsStartExpandedEndHidden</Option>
          <Option>ThreeColumnsMidExpandedEndHidden</Option>
        </Select>
        <Label showColon={true}>Custom configuration for current layout</Label>
        <Text class="configurationInfo">{configInfo}</Text>
      </div>
      <FlexibleColumnLayout
        ref={fclRef}
        class="fcl"
        onLayoutConfigurationChange={handleFclLayoutConfigurationChange}
        onLayoutChange={handleFclLayoutChange}
      >
        <div className="col" slot="startColumn">
          <div className="colHeader">
            <Title>Categories</Title>
          </div>
          <List onItemClick={handleCategoriesListUi5ItemClick}>
            <ListItemStandard
              data-category="electronics"
              icon="slim-arrow-right"
              iconEnd={true}
            >
              Electronics
            </ListItemStandard>
            <ListItemStandard
              data-category="clothing"
              icon="slim-arrow-right"
              iconEnd={true}
            >
              Clothing
            </ListItemStandard>
            <ListItemStandard
              data-category="books"
              icon="slim-arrow-right"
              iconEnd={true}
            >
              Books
            </ListItemStandard>
            <ListItemStandard
              data-category="home"
              icon="slim-arrow-right"
              iconEnd={true}
            >
              Home &amp; Garden
            </ListItemStandard>
            <ListItemStandard
              data-category="sports"
              icon="slim-arrow-right"
              iconEnd={true}
            >
              Sports
            </ListItemStandard>
          </List>
        </div>
        <div className="col" slot="midColumn">
          <div className="colHeader">
            <Title>{categoryTitle}</Title>
          </div>
          <List
            style={{ display: showProducts ? "block" : "none" }}
            onItemClick={handleProductsListUi5ItemClick}
          >
            {products.map((product) => (
              <ListItemStandard
                key={product.id}
                data-product-id={product.id}
                data-category={
                  Object.keys(categoryData).find((cat) =>
                    categoryData[cat].includes(product),
                  ) || ""
                }
                icon="slim-arrow-right"
                iconEnd={true}
              >
                {product.name}
              </ListItemStandard>
            ))}
          </List>
        </div>
        <div className="col" slot="endColumn">
          <div className="colHeader">
            <Title>{productTitle}</Title>
            <div className="colSubHeader">
              <Button
                icon="decline"
                design="Transparent"
                onClick={handleCloseEndColumnClick}
              />
            </div>
          </div>
          <div className="product-details">
            {selectedProduct ? (
              <div className="product-info">
                <Title level="H3">{selectedProduct.name}</Title>
                <Text>{selectedProduct.description}</Text>
                <br />
                <br />
                <Label showColon={true}>Category</Label>
                <Text>
                  {selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)}
                </Text>
                <br />
                <br />
                <Label showColon={true}>Product ID</Label>
                <Text>{selectedProduct.id}</Text>
              </div>
            ) : (
              <Text>Select a product to view details</Text>
            )}
          </div>
        </div>
      </FlexibleColumnLayout>
    </>
  );
}

export default App;
