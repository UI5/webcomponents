import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import BreadcrumbsClass from "@ui5/webcomponents/dist/Breadcrumbs.js";
import BreadcrumbsItemClass from "@ui5/webcomponents/dist/BreadcrumbsItem.js";

const Breadcrumbs = createComponent(BreadcrumbsClass);
const BreadcrumbsItem = createComponent(BreadcrumbsItemClass);

function App() {

  return (
    <>
      <div>
            <Breadcrumbs separators="BackSlash">
                <BreadcrumbsItem href="https://www.sap.com">Root Page
                </BreadcrumbsItem>
                <BreadcrumbsItem href="https://www.sap.com">Parent Page</BreadcrumbsItem>
                <BreadcrumbsItem>Current Page</BreadcrumbsItem>
            </Breadcrumbs>
        </div>
        <div>
            <Breadcrumbs separators="DoubleBackSlash">
                <BreadcrumbsItem href="https://www.sap.com">Root Page
                </BreadcrumbsItem>
                <BreadcrumbsItem href="https://www.sap.com">Parent Page</BreadcrumbsItem>
                <BreadcrumbsItem>Current Page</BreadcrumbsItem>
            </Breadcrumbs>
        </div>
        <div>
            <Breadcrumbs separators="DoubleGreaterThan">
                <BreadcrumbsItem href="https://www.sap.com">Root Page
                </BreadcrumbsItem>
                <BreadcrumbsItem href="https://www.sap.com">Parent Page</BreadcrumbsItem>
                <BreadcrumbsItem>Current Page</BreadcrumbsItem>
            </Breadcrumbs>
        </div>
        <div>
            <Breadcrumbs separators="DoubleSlash">
                <BreadcrumbsItem href="https://www.sap.com">Root Page
                </BreadcrumbsItem>
                <BreadcrumbsItem href="https://www.sap.com">Parent Page</BreadcrumbsItem>
                <BreadcrumbsItem>Current Page</BreadcrumbsItem>
            </Breadcrumbs>
        </div>
        <div>
            <Breadcrumbs separators="GreaterThan">
                <BreadcrumbsItem href="https://www.sap.com">Root Page
                </BreadcrumbsItem>
                <BreadcrumbsItem href="https://www.sap.com">Parent Page</BreadcrumbsItem>
                <BreadcrumbsItem>Current Page</BreadcrumbsItem>
            </Breadcrumbs>
        </div>
    </>
  );
}

export default App;
