import { createReactComponent } from "@ui5/webcomponents-base";
import IconClass from "@ui5/webcomponents/dist/Icon.js";

const Icon = createReactComponent(IconClass);

function App() {

  return (
    <>
      <Icon name="tnt/actor" />
        <Icon name="tnt/aggregator" />
        <Icon name="tnt/association" />
        <Icon name="tnt/network" />
        <Icon name="tnt/repeater" />
    </>
  );
}

export default App;
