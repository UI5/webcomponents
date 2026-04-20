import "@ui5/webcomponents/dist/Breadcrumbs.js";
import "@ui5/webcomponents/dist/BreadcrumbsItem.js";

document.querySelectorAll("ui5-breadcrumbs-item").forEach((item) => {
    item.addEventListener("ui5-click", () => {
        document.getElementById("result").textContent = item.innerText.trim();
    });
});
