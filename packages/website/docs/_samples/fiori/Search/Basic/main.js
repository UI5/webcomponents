
import "@ui5/webcomponents-fiori/dist/Search.js";
import "@ui5/webcomponents-fiori/dist/SearchItem.js";
import "@ui5/webcomponents-fiori/dist/SearchScope.js";

const scopeData = [
    { name: "Laptop", scope: "products" },
    { name: "Leave Requests", scope: "apps" },
    { name: "Log work", scope: "apps" },
    { name: "Manage Products", scope: "apps" },
    { name: "Mobile Phones", scope: "products" },
    { name: "Tablet", scope: "products" },
];

function createScopeItems(scope) {
    let filterData = [];

    if (!scope) {
        filterData = scopeData;
    } else {
        filterData = scopeData.filter(item => item.scope === scope);
    }

    filterData.forEach(item => {
        const searchItem = document.createElement("ui5-search-item");
        searchItem.text = item.name;
        searchItem.scopeName = item.scope;
        searchScope.appendChild(searchItem);
    });
}

const searchScope = document.getElementById("search-scope");

createScopeItems();

searchScope.addEventListener("ui5-scope-change", (event) => {
    const scope = event.detail.scope.value === "all" ? "" : event.detail.scope.value;
    
    searchScope.items.forEach(item => {
        item.remove();
    });

    createScopeItems(scope);
});
