import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import BreadcrumbsClass from "@ui5/webcomponents/dist/Breadcrumbs.js";
import BreadcrumbsItemClass from "@ui5/webcomponents/dist/BreadcrumbsItem.js";

const Breadcrumbs = createComponent(BreadcrumbsClass);
const BreadcrumbsItem = createComponent(BreadcrumbsItemClass);

function App() {

  return (
    <>
      <Breadcrumbs>
            <BreadcrumbsItem href="https://www.sap.com" target="_blank">Root Page </BreadcrumbsItem>
            <BreadcrumbsItem href="https://www.sap.com" target="_blank">Parent Page</BreadcrumbsItem>
            <BreadcrumbsItem>Current Page</BreadcrumbsItem>
        </Breadcrumbs>
    </>
  );
}

export default App;
