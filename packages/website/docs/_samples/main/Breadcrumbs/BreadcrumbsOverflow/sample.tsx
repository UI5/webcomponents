import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import BreadcrumbsClass from "@ui5/webcomponents/dist/Breadcrumbs.js";
import BreadcrumbsItemClass from "@ui5/webcomponents/dist/BreadcrumbsItem.js";

const Breadcrumbs = createReactComponent(BreadcrumbsClass);
const BreadcrumbsItem = createReactComponent(BreadcrumbsItemClass);

function App() {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Root Page{" "}
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page1
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page2
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page3
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page4
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page5
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page6
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page7
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page8
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page9
        </BreadcrumbsItem>
        <BreadcrumbsItem href="https://www.sap.com" target="_blank">
          Parent Page10
        </BreadcrumbsItem>
        <BreadcrumbsItem>Current Page</BreadcrumbsItem>
      </Breadcrumbs>
    </>
  );
}

export default App;
