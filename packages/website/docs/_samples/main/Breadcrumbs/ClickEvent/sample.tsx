import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import BreadcrumbsClass from "@ui5/webcomponents/dist/Breadcrumbs.js";
import BreadcrumbsItemClass from "@ui5/webcomponents/dist/BreadcrumbsItem.js";

const Breadcrumbs = createReactComponent(BreadcrumbsClass);
const BreadcrumbsItem = createReactComponent(BreadcrumbsItemClass);

function App() {
  const [lastClicked, setLastClicked] = React.useState("-");

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbsItem href="#" onClick={() => setLastClicked("Products")}>
          Products
        </BreadcrumbsItem>
        <BreadcrumbsItem href="#" onClick={() => setLastClicked("Laptops")}>
          Laptops
        </BreadcrumbsItem>
        <BreadcrumbsItem onClick={() => setLastClicked("ThinkPad X1")}>
          ThinkPad X1
        </BreadcrumbsItem>
      </Breadcrumbs>
      <p>
        Last clicked item: <strong>{lastClicked}</strong>
      </p>
    </>
  );
}

export default App;
