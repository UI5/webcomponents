import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <List separators="None">
          <ListItemStandard icon="product">Item #1</ListItemStandard>
          <ListItemStandard icon="product">Item #2</ListItemStandard>
          <ListItemStandard icon="product">Item #3</ListItemStandard>
        </List>

        <br /><br />

        <List separators="Inner">
          <ListItemStandard icon="shipping-status">Devilered</ListItemStandard>
          <ListItemStandard icon="shipping-status">Pending</ListItemStandard>
          <ListItemStandard icon="shipping-status">Declined</ListItemStandard>
        </List>
    </>
  );
}

export default App;
