import { createReactComponent } from "@ui5/webcomponents-base";
import IconClass from "@ui5/webcomponents/dist/Icon.js";

const Icon = createReactComponent(IconClass);

function App() {

  return (
    <>
      <Icon name="home" />
        <Icon name="ai" />
        <Icon name="da-2" />
        <Icon name="heart" />
        <Icon name="activities" />
    </>
  );
}

export default App;
