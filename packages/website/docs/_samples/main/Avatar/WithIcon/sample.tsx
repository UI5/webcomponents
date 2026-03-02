import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createReactComponent(AvatarClass);

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
