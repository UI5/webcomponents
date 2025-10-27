import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

fcl.layoutsConfiguration = {
    desktop: {
        "TwoColumnsStartExpanded": {
            layout: ["80%", "20%", 0],
        },
        "TwoColumnsMidExpanded": {
            layout: ["20%", "80%", 0],
        },
        "ThreeColumnsMidExpanded": {
            layout: ["20%", "50%", "30%"],
        },
        "ThreeColumnsEndExpanded": {
            layout: ["15%", "15%", "70%"],
        },
        "ThreeColumnsStartExpandedEndHidden": {
            layout: ["70%", "30%", 0],
        },
        "ThreeColumnsMidExpandedEndHidden": {
            layout: ["20%", "80%", 0],
        },
    },
    tablet: {
        "TwoColumnsStartExpanded": {
            layout: ["60%", "40%", 0],
        },
        "TwoColumnsMidExpanded": {
            layout: ["40%", "60%", 0],
        },
        "ThreeColumnsMidExpanded": {
            layout: [0, "60%", "40%"],
        },
        "ThreeColumnsEndExpanded": {
            layout: [0, "40%", "60%"],
        },
        "ThreeColumnsStartExpandedEndHidden": {
            layout: ["60%", "40%", 0],
        },
        "ThreeColumnsMidExpandedEndHidden": {
            layout: ["40%", "60%", 0],
        },
    },
};

fcl.addEventListener("layout-configuration-change", (e) => {
    displayCustomLayoutConfigurationInfo();
});

fcl.addEventListener("layout-change", (e) => {
    selectLayout.value = e.detail.layout;
});

selectLayout.addEventListener("ui5-change", (e) => {
    fcl.layout = e.detail.selectedOption.textContent;
    displayCustomLayoutConfigurationInfo();
});

function displayCustomLayoutConfigurationInfo() {
    const configurationPerMedia = fcl.layoutsConfiguration[fcl.media];
    const layoutConfiguration = configurationPerMedia ? configurationPerMedia[fcl.layout] : undefined;
    if (layoutConfiguration) {
        configurationInfo.innerText = `[${layoutConfiguration.layout.join(", ")}]`;
    } else {
        configurationInfo.innerText = `none`;
    }
}

// Sample data for navigation
const categoryData = {
    electronics: [
        { id: "laptop", name: "Laptop", description: "High-performance laptop with 16GB RAM and SSD storage. Perfect for work and gaming." },
        { id: "smartphone", name: "Smartphone", description: "Latest smartphone with advanced camera system and long battery life." },
        { id: "tablet", name: "Tablet", description: "Lightweight tablet with high-resolution display, ideal for reading and media consumption." }
    ],
    clothing: [
        { id: "jeans", name: "Jeans", description: "Premium denim jeans with comfortable fit and durable construction." },
        { id: "shirt", name: "Shirt", description: "Cotton shirt with modern cut and breathable fabric, perfect for any occasion." },
        { id: "jacket", name: "Jacket", description: "Stylish jacket with weather-resistant materials and multiple pockets." }
    ],
    books: [
        { id: "novel", name: "Novel", description: "Bestselling fiction novel with compelling characters and engaging plot." },
        { id: "cookbook", name: "Cookbook", description: "Collection of delicious recipes from around the world with step-by-step instructions." },
        { id: "biography", name: "Biography", description: "Inspiring life story of a remarkable person who changed the world." }
    ],
    home: [
        { id: "chair", name: "Chair", description: "Ergonomic office chair with lumbar support and adjustable height." },
        { id: "lamp", name: "Lamp", description: "Modern LED lamp with adjustable brightness and energy-efficient design." },
        { id: "plant", name: "Plant", description: "Low-maintenance indoor plant that purifies air and adds natural beauty." }
    ],
    sports: [
        { id: "shoes", name: "Running Shoes", description: "Professional running shoes with advanced cushioning and lightweight design." },
        { id: "ball", name: "Football", description: "Official size football with durable leather construction and excellent grip." },
        { id: "racket", name: "Tennis Racket", description: "Professional tennis racket with carbon fiber frame and comfortable grip." }
    ]
};

// Navigation functionality
const categoriesList = document.getElementById("categoriesList");
const productsList = document.getElementById("productsList");
const categoryTitle = document.getElementById("categoryTitle");
const productTitle = document.getElementById("productTitle");
const productDetails = document.getElementById("productDetails");
const closeEndColumn = document.getElementById("closeEndColumn");
const productDetailsTemplate = document.getElementById("productDetailsTemplate");

// Helper function to create product details from template
function createProductDetailsFromTemplate(product, category) {
    // Clone the template content
    const templateContent = productDetailsTemplate.content.cloneNode(true);
    
    // Populate the template with product data
    templateContent.getElementById("productName").textContent = product.name;
    templateContent.getElementById("productDescription").textContent = product.description;
    templateContent.getElementById("productCategory").textContent = category.charAt(0).toUpperCase() + category.slice(1);
    templateContent.getElementById("productId").textContent = product.id;
    
    return templateContent;
}

// Helper function to clear product details to initial state
function clearProductDetails() {
    productDetails.innerHTML = "";
    const textElement = document.createElement("ui5-text");
    textElement.textContent = "Select a product to view details";
    productDetails.appendChild(textElement);
}

// Handle category selection
categoriesList.addEventListener("ui5-item-click", (e) => {
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
    });
    
    productsList.style.display = "block";
    
    // Clear product details
    clearProductDetails();
    productTitle.textContent = "Product Details";
    
    // Navigate to two column layout
    fcl.layout = "TwoColumnsMidExpanded";
    selectLayout.value = "TwoColumnsMidExpanded";
    displayCustomLayoutConfigurationInfo();
});

// Handle product selection
productsList.addEventListener("ui5-item-click", (e) => {
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
    }
});

// Handle close button in end column
closeEndColumn.addEventListener("click", () => {
    // Clear product details
    clearProductDetails();
    productTitle.textContent = "Product Details";
    
    // Navigate back to two column layout
    fcl.layout = "TwoColumnsMidExpanded";
    selectLayout.value = "TwoColumnsMidExpanded";
    displayCustomLayoutConfigurationInfo();
});
