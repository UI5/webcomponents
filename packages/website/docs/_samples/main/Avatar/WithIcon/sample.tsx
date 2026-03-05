import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/supplier.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";

const Avatar = createComponent(AvatarClass);

function App() {
  return (
    <>
      <Avatar icon="filter" size="XS" />
      <Avatar icon="employee" size="S" />
      <Avatar icon="product" size="M" />
      <Avatar icon="supplier" size="L" />
      <Avatar icon="shipping-status" size="XL" />
    </>
  );
}

export default App;
